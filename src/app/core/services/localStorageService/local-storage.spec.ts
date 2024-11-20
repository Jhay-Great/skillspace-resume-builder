import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  
  // Test data
  const testKey = 'testKey';
  const testString = 'test value';
  const testObject = { name: 'John', age: 30 };
  const testArray = [1, 2, 3];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up after each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setItem', () => {
    it('should store string value in localStorage', () => {
      service.setItem(testKey, testString);
      expect(localStorage.getItem(testKey)).toBe(JSON.stringify(testString));
    });

    it('should store object value in localStorage', () => {
      service.setItem(testKey, testObject);
      expect(localStorage.getItem(testKey)).toBe(JSON.stringify(testObject));
    });

    it('should store array value in localStorage', () => {
      service.setItem(testKey, testArray);
      expect(localStorage.getItem(testKey)).toBe(JSON.stringify(testArray));
    });

    it('should override existing value when using same key', () => {
      service.setItem(testKey, testString);
      service.setItem(testKey, testObject);
      expect(localStorage.getItem(testKey)).toBe(JSON.stringify(testObject));
    });
  });

  describe('getItem', () => {
    it('should retrieve string value from localStorage', () => {
      localStorage.setItem(testKey, JSON.stringify(testString));
      const result = service.getItem(testKey);
      expect(result).toBe(testString);
    });

    it('should retrieve object value from localStorage', () => {
      localStorage.setItem(testKey, JSON.stringify(testObject));
      const result = service.getItem(testKey);
      expect(result).toEqual(testObject);
    });

    it('should retrieve array value from localStorage', () => {
      localStorage.setItem(testKey, JSON.stringify(testArray));
      const result = service.getItem(testKey);
      expect(result).toEqual(testArray);
    });

    it('should return null for non-existent key', () => {
      const result = service.getItem('nonExistentKey');
      expect(result).toBeNull();
    });

    it('should handle invalid JSON', () => {
      localStorage.setItem(testKey, 'invalid json');
      expect(() => service.getItem(testKey)).toThrow();
    });
  });

  describe('removeItem', () => {
    it('should remove item from localStorage', () => {
      service.setItem(testKey, testString);
      service.removeItem(testKey);
      expect(localStorage.getItem(testKey)).toBeNull();
    });

    it('should not throw error when removing non-existent key', () => {
      expect(() => service.removeItem('nonExistentKey')).not.toThrow();
    });
  });

  // Integration tests
  describe('integration tests', () => {
    it('should perform full CRUD operation', () => {
      // Create
      service.setItem(testKey, testObject);
      expect(localStorage.getItem(testKey)).toBe(JSON.stringify(testObject));

      // Read
      const retrieved = service.getItem(testKey);
      expect(retrieved).toEqual(testObject);

      // Update
      const updatedObject = { ...testObject, age: 31 };
      service.setItem(testKey, updatedObject);
      const updated = service.getItem(testKey);
      expect(updated).toEqual(updatedObject);

      // Delete
      service.removeItem(testKey);
      expect(service.getItem(testKey)).toBeNull();
    });
  });
});
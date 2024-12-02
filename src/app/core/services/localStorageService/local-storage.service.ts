import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  
  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key);
      return data ? (JSON.parse(data) as T) : null;
    } catch (error) {
      return null;
    }
  }

  getUserId(key: string): string{
    const userId = localStorage.getItem(key);
    return userId ? userId : '';
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}

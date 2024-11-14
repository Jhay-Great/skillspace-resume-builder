import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { ToastService } from './toast.service';
import { ToastPositionType } from 'primeng/toast';

describe('ToastService', () => {
  let service: ToastService;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MessageService', ['add']);
    TestBed.configureTestingModule({
      providers: [
        ToastService,
        { provide: MessageService, useValue: spy }
      ]
    });
    service = TestBed.inject(ToastService);
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('showToast', () => {
    it('should call messageService.add with correct parameters', () => {
      const severity = 'success';
      const summary = 'Test Summary';
      const detail = 'Test Detail';
      const life = 5000;

      service.showToast(severity, summary, detail, life);

      expect(messageService.add).toHaveBeenCalledWith({
        key: 'confirm',
        severity,
        summary,
        detail,
        life,
      });
    });

    it('should use default life value when not provided', () => {
      const severity = 'success';
      const summary = 'Test Summary';
      const detail = 'Test Detail';

      service.showToast(severity, summary, detail);

      expect(messageService.add).toHaveBeenCalledWith({
        key: 'confirm',
        severity,
        summary,
        detail,
        life: 3000,
      });
    });
  });

  describe('showSuccess', () => {
    it('should call showToast with success-toast severity', () => {
      const summary = 'Success Summary';
      const detail = 'Success Detail';
      const position: ToastPositionType = 'bottom-right';

      service.showSuccess(summary, detail, position);

      expect(messageService.add).toHaveBeenCalledWith({
        key: 'confirm',
        severity: 'success-toast',
        summary,
        detail,
        life: 3000,
      });
      expect(service.toastPosition()).toBe(position);
    });

    it('should use default position when not provided', () => {
      const summary = 'Success Summary';
      const detail = 'Success Detail';

      service.showSuccess(summary, detail);

      expect(service.toastPosition()).toBe('top-center');
    });
  });

  describe('showWarning', () => {
    it('should call showToast with warning-toast severity', () => {
      const summary = 'Warning Summary';
      const detail = 'Warning Detail';
      const position: ToastPositionType = 'bottom-left';

      service.showWarning(summary, detail, position);

      expect(messageService.add).toHaveBeenCalledWith({
        key: 'confirm',
        severity: 'warning-toast',
        summary,
        detail,
        life: 3000,
      });
      expect(service.toastPosition()).toBe(position);
    });

    it('should use default position when not provided', () => {
      const summary = 'Warning Summary';
      const detail = 'Warning Detail';

      service.showWarning(summary, detail);

      expect(service.toastPosition()).toBe('top-center');
    });
  });

  describe('showError', () => {
    it('should call showToast with error-toast severity', () => {
      const summary = 'Error Summary';
      const detail = 'Error Detail';
      const position: ToastPositionType = 'top-right';

      service.showError(summary, detail, position);

      expect(messageService.add).toHaveBeenCalledWith({
        key: 'confirm',
        severity: 'error-toast',
        summary,
        detail,
        life: 3000,
      });
      expect(service.toastPosition()).toBe(position);
    });

    it('should use default position when not provided', () => {
      const summary = 'Error Summary';
      const detail = 'Error Detail';

      service.showError(summary, detail);

      expect(service.toastPosition()).toBe('top-center');
    });
  });
});
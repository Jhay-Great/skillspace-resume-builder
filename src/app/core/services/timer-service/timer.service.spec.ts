import { TestBed } from '@angular/core/testing';
import { TimerService } from './timer.service';
import { signal } from '@angular/core';

describe('TimerService', () => {
  let service: TimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimerService],
    });
    service = TestBed.inject(TimerService);
  });

  it('should start timer and count down', (done) => {
    service.startTimer();

    // Check initial timer value is 60 seconds
    expect(service.remainingTime).toBe(60);

    // After 1 second, it should be 59 seconds
    setTimeout(() => {
      expect(service.remainingTime).toBe(59);

      // Continue testing for a few more seconds
      setTimeout(() => {
        expect(service.remainingTime).toBe(58);
        done();
      }, 1000);
    }, 1000);
  });

  it('should stop timer when time reaches 0', (done) => {
    service.startTimer();

    // Let the timer countdown to 0
    setTimeout(() => {
      expect(service.remainingTime).toBe(0);
      done();
    }, 60000); // 60 seconds
  });

  it('should reset the timer when stopped', () => {
    service.startTimer();
    service.stopTimer();
    expect(service.remainingTime).toBe(0);
  });
});

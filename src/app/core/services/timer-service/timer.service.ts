import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  expirationTime = 600; // 10 minute in seconds
  private timerSignal = signal(this.expirationTime);
  private expiredSignal = signal(false);

  get remainingTime() {
    return this.timerSignal();
  }

  get isTimerExpired() {
    return this.expiredSignal();
  }

  startTimer() {
    this.timerSignal.set(this.expirationTime); // Reset timer to expiration time before starting the timer

    const intervalId = setInterval(() => {
      let currentTime = this.timerSignal();
      if (currentTime > 0) {
        this.timerSignal.set(currentTime - 1);
      } else {
        this.expiredSignal.set(true);
        clearInterval(intervalId);
      }
    }, 1000);
  }
  resetTimer() {
    this.timerSignal.set(this.expirationTime);
    this.expiredSignal.set(false);
  }

  restartTimer() {
    this.resetTimer();
    this.startTimer();
  }
}

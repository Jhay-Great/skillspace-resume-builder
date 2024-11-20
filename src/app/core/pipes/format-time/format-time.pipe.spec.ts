import { TestBed } from '@angular/core/testing';
import { FormatTimePipe } from './format-time.pipe';

describe('FormatTimePipe', () => {
  let pipe: FormatTimePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormatTimePipe],
    });
    pipe = TestBed.inject(FormatTimePipe);
  });

  it('should format time correctly for seconds', () => {
    expect(pipe.transform(60)).toBe('01:00'); // 60 seconds should be 01:00
    expect(pipe.transform(90)).toBe('01:30'); // 90 seconds should be 01:30
    expect(pipe.transform(120)).toBe('02:00'); // 120 seconds should be 02:00
    expect(pipe.transform(150)).toBe('02:30'); // 150 seconds should be 02:30
  });

  it('should return "00:00" for 0 seconds', () => {
    expect(pipe.transform(0)).toBe('00:00');
  });

  it('should format correctly when seconds are less than 10', () => {
    expect(pipe.transform(9)).toBe('00:09'); // 9 seconds should be 00:09
  });
});

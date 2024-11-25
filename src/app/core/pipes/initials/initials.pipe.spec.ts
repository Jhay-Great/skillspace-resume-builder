import { InitialsPipe } from './initials.pipe';

describe('InitialsPipe', () => {
  let pipe: InitialsPipe;
  it('create an instance', () => {
    pipe = new InitialsPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the first two letters in uppercase', () => {
    expect(pipe.transform('Angular')).toEqual('AN');
  });

  it('should return an empty string for null input', () => {
    expect(pipe.transform(null)).toEqual('');
  });

  it('should return an empty string for an empty string input', () => {
    expect(pipe.transform('')).toEqual('');
  });

  it('should return the string itself if less than two characters', () => {
    expect(pipe.transform('A')).toEqual('A');
  });

  it('should handle strings with two characters correctly', () => {
    expect(pipe.transform('Ng')).toEqual('NG');
  });
});

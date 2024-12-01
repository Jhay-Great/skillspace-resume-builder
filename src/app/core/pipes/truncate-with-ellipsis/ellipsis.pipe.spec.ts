import { EllipsisPipe } from './ellipsis.pipe';

describe('EllipsisPipe', () => {
  let pipe: EllipsisPipe;
  
  it('create an instance', () => {
    const pipe = new EllipsisPipe();
    expect(pipe).toBeTruthy();
  });

  it('should truncate a string longer than maxLength and append ellipsis', () => {
    expect(pipe.transform('This is a very long string', 10)).toEqual('This is a ...');
  });

  it('should return the string itself if shorter than or equal to maxLength', () => {
    expect(pipe.transform('Short string', 20)).toEqual('Short string');
  });

  it('should return an empty string for null input', () => {
    expect(pipe.transform(null, 20)).toEqual('');
  });

  it('should return an empty string for an empty string input', () => {
    expect(pipe.transform('', 20)).toEqual('');
  });

  it('should use the default maxLength of 20 if no maxLength is provided', () => {
    expect(pipe.transform('This string exceeds the default maxLength')).toEqual(
      'This string exceed...'
    );
  });
});

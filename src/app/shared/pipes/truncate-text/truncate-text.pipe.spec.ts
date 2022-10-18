import { TruncateTextPipe } from '..';

describe('TruncateTextPipe', () => {
  it('create an instance', () => {
    const pipe = new TruncateTextPipe();
    expect(pipe).toBeTruthy();
  });

  it('change first letter to uppercase', () => {
    const pipe = new TruncateTextPipe();

    const result = pipe.transform('12345678910');
    const value = result === '1234567891...' ? true : false;
    expect(value).toBe(true);
  });
});

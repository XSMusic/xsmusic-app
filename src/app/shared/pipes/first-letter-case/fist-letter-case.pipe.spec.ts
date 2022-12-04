import { FirstLetterPipe } from './fist-letter-case.pipe';

describe('FirstLetterPipe', () => {
  it('create an instance', () => {
    const pipe = new FirstLetterPipe();
    expect(pipe).toBeTruthy();
  });

  it('change first letter to uppercase', () => {
    const pipe = new FirstLetterPipe();
    const result = pipe.transform('perro');
    const value = result === 'Perro' ? true : false;
    expect(value).toBe(true);
  });
});

import { FilterArrayPipe } from '..';

describe('FilterArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterArrayPipe();
    expect(pipe).toBeTruthy();
  });

  it('change first letter to uppercase', () => {
    const pipe = new FilterArrayPipe();
    const result = pipe.transform(
      [
        { name: 'e', value: '1' },
        { name: 'a', value: '1' },
      ],
      'value',
      '1'
    );
    const value = result.length === 2 ? true : false;
    expect(value).toBe(true);
  });
});

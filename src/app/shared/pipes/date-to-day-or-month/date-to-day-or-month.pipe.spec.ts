import { DateToDayOrMonthPipe } from '@pipes';

describe('DateToDayOrMonthPipe', () => {
  it('create an instance', () => {
    const pipe = new DateToDayOrMonthPipe();
    expect(pipe).toBeTruthy();
  });

  it('Pipe', () => {
    const pipe = new DateToDayOrMonthPipe();
    const result = pipe.transform('2020-01-01', 'day');
    expect(result).toEqual('01');
  });

  it('Pipe B', () => {
    const pipe = new DateToDayOrMonthPipe();
    const result = pipe.transform('2020-10-01', 'month');
    expect(result).toEqual('oct');
  });
});

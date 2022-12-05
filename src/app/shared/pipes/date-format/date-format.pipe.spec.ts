import { DateFormatAgoPipe } from './date-format.pipe';

describe('DateFormatAgoPipe', () => {
  it('create an instance', () => {
    const pipe = new DateFormatAgoPipe();
    expect(pipe).toBeTruthy();
  });

  it('Pipe', () => {
    const pipe = new DateFormatAgoPipe();

    const result = pipe.transform('2020-01-01', 'DD-MM-YYYY');
    expect(result).toBeDefined();
  });

  it('Pipe B', () => {
    const pipe = new DateFormatAgoPipe();
    const result = pipe.transform('2020-01-01', 'DD-MM-YYYY');
    expect(result).toBeDefined();
  });
});

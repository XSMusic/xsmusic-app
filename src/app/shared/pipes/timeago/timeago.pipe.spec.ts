import { DateToTimeAgoPipe } from '..';

describe('DateToTimeAgoPipe', () => {
  it('create an instance', () => {
    const pipe = new DateToTimeAgoPipe();
    expect(pipe).toBeTruthy();
  });

  it('Pipe', () => {
    const pipe = new DateToTimeAgoPipe();

    const result = pipe.transform('2020-01-01');
    expect(result).toBeDefined();
  });

  it('Pipe B', () => {
    const pipe = new DateToTimeAgoPipe();
    const result = pipe.transform('2020-01-01', false);
    expect(result).toBeDefined();
  });
});

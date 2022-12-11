import { TimeAgoPipe } from '..';

describe('TimeAgoPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeAgoPipe();
    expect(pipe).toBeTruthy();
  });

  it('Pipe', () => {
    const pipe = new TimeAgoPipe();

    const result = pipe.transform('2020-01-01');
    expect(result).toBeDefined();
  });

  it('Pipe B', () => {
    const pipe = new TimeAgoPipe();
    const result = pipe.transform('2020-01-01', false);
    expect(result).toBeDefined();
  });
});

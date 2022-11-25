import { MomentFormatAgoPipe } from './moment-format.pipe';

describe('MomentFormatAgoPipe', () => {
  it('create an instance', () => {
    const pipe = new MomentFormatAgoPipe();
    expect(pipe).toBeTruthy();
  });

  it('Pipe', () => {
    const pipe = new MomentFormatAgoPipe();

    const result = pipe.transform('2020-01-01', 'DD-MM-YYYY');
    expect(result).toBeDefined();
  });

  it('Pipe B', () => {
    const pipe = new MomentFormatAgoPipe();
    const result = pipe.transform('2020-01-01', 'DD-MM-YYYY');
    expect(result).toBeDefined();
  });
});

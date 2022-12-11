import { CountryNamePipe } from '@pipes';

describe('CountryNamePipe', () => {
  it('create an instance', () => {
    const pipe = new CountryNamePipe();
    expect(pipe).toBeTruthy();
  });

  it('Pipe', () => {
    const pipe = new CountryNamePipe();
    const result = pipe.transform('es');
    expect(result).toEqual('España');
  });
});

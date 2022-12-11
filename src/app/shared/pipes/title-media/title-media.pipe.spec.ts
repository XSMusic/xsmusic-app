import { Media } from '@models';
import { TitleMediaPipe } from '..';

describe('TitleMediaPipe', () => {
  it('create an instance', () => {
    const pipe = new TitleMediaPipe();
    expect(pipe).toBeTruthy();
  });

  it('change first letter to uppercase', () => {
    const pipe = new TitleMediaPipe();
    const media: Media = {
      name: 'pepe',
      artists: [{ name: 'pepin' }],
      site: { name: 'fabrik' },
      year: 2022,
      type: 'set',
    };
    const result = pipe.transform(media);
    expect(result).toEqual('pepin @ fabrik 2022');
  });
});

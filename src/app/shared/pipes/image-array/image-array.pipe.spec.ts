import { Image, Media } from '@models';
import { ImageArrayPipe } from '..';

describe('ImageArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new ImageArrayPipe();
    expect(pipe).toBeTruthy();
  });

  it('change first letter to uppercase', () => {
    const pipe = new ImageArrayPipe();
    const media: Media = {
      name: 'pepe',
      artists: [{ name: 'pepin' }],
      site: { name: 'fabrik' },
      year: 2022,
      type: 'set',
    };
    const image = new Image();
    image.url = '33';
    const result = pipe.transform([], 'small');
    expect(result).toBeDefined();
  });
});

import { environment } from '../../../../environments/environment';
import { ImagePipe } from '@pipes';
import { Image } from '@models';

describe('ImagePipe', () => {
  it('create an instance', () => {
    const pipe = new ImagePipe();
    expect(pipe).toBeTruthy();
  });

  it('show image', () => {
    const pipe = new ImagePipe();
    const result = pipe.transform(
      new Image({ url: 'pepe', type: 'artist' }),
      'small'
    );
    expect(result).toBe(`${environment.urls.images}/artists/small/pepe`);
  });
});

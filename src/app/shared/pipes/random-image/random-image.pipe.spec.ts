import { environment } from '@env/environment';
import { Image } from '@models';
import { RandomImagePipe } from '..';

describe('RandomImagePipe', () => {
  it('create an instance', () => {
    const pipe = new RandomImagePipe();
    expect(pipe).toBeTruthy();
  });

  it('images === 0', () => {
    const pipe = new RandomImagePipe();
    const images: Image[] = [];
    const result = pipe.transform(images);
    expect(result).toEqual('assets/no-image.png');
  });

  it('images === undefined', () => {
    const pipe = new RandomImagePipe();
    const images: any = undefined;
    const result = pipe.transform(images);
    expect(result).toEqual('assets/no-image.png');
  });

  it('images > 0', () => {
    const pipe = new RandomImagePipe();
    const image = new Image();
    image.url = 'perro.jpg';
    const images: Image[] = [image];
    const result = pipe.transform(images);
    expect(result).toEqual(`${environment.urls.images}/perro.jpg`);
  });
});

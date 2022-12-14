import { TypePipe } from '..';

describe('TypePipe', () => {
  it('create an instance', () => {
    const pipe = new TypePipe();
    expect(pipe).toBeTruthy();
  });

  it('artist -> Artista', () => {
    const pipe = new TypePipe();
    const result = pipe.transform('artist');
    expect(result).toBe('Artista');
  });

  it('club -> Club', () => {
    const pipe = new TypePipe();
    const result = pipe.transform('club');
    expect(result).toBe('Club');
  });

    it('event -> Evento', () => {
    const pipe = new TypePipe();
    const result = pipe.transform('event');
    expect(result).toBe('Evento');
  });

    it('festival -> Festival', () => {
    const pipe = new TypePipe();
    const result = pipe.transform('festival');
    expect(result).toBe('Festival');
  });

    it('media -> Set/Track', () => {
      const pipe = new TypePipe();
      const result = pipe.transform('media');
      expect(result).toBe('Set/Track');
    });

    it('site -> Club/Festival', () => {
      const pipe = new TypePipe();
      const result = pipe.transform('site');
      expect(result).toBe('Club/Festival');
    });

    it('set -> Set', () => {
      const pipe = new TypePipe();
      const result = pipe.transform('set');
      expect(result).toBe('Set');
    });

    it('track -> Track', () => {
      const pipe = new TypePipe();
      const result = pipe.transform('track');
      expect(result).toBe('Track');
    });

    it('user -> Usuario', () => {
      const pipe = new TypePipe();
      const result = pipe.transform('user');
      expect(result).toBe('Usuario');
    });

    it('loquesea -> ""', () => {
      const pipe = new TypePipe();
      const result = pipe.transform('loquesea');
      expect(result).toBe('');
    });
});

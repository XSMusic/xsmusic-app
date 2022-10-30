export class Youtube {
  name = '';
  channel = {
    id: '',
    name: '',
  };
  videoId = '';
  info = '';
  image = '';

  constructor(data?: Youtube) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

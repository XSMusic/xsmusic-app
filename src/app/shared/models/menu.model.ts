export class Menu {
  _id?: string;
  route? = '';
  name = '';
  position? = 0;
  action?: string;

  constructor(data?: Menu) {
    this._id = data?._id;
    this.route = data?.route || this.route;
    this.name = data?.name || this.name;
    this.position = data?.position || this.position;
  }
}

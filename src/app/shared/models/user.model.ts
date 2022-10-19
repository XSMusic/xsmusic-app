export class User {
  _id?: string;
  name!: string;
  email!: string;
  image!: string;
  role!: string;

  constructor(data?: User) {
    if (data) {
      this._id = data._id ? data._id : '';
      this.name = data.name ? data.name : '';
      this.image = data.email ? data.email : '';
      this.role = data.role ? data.role : '';
    }
  }
}

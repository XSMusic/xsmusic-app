export class Style {
  _id?: string;
  name? = '';
  created? = '';
  updated? = '';

  constructor(data?: Style) {
    if (data) {
      this._id = data._id ?? this.name;
      this.name = data.name ?? this.name;
      this.created = data.created ?? this.created;
      this.updated = data.updated ?? this.updated;
    }
  }
}

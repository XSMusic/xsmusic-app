export class Artist {
  _id? = '';
  name = '';
  image = '';
  styles?: string[] = [];
  country? = 'es';
  slug = '';
  created? = '';
  updated?= '';
  constructor(data?: Artist) {
    if (data) {
      this._id = data._id ?? this.name;
      this.name = data.name ?? this.name;
      this.image = data.image ?? this.image;
      this.styles = data.styles ?? this.styles;
      this.country = data.country ?? this.country;
      this.slug = data.slug ?? this.slug;
      this.created = data.created ?? this.created;
      this.updated = data.updated ?? this.updated;
    }
  }
}

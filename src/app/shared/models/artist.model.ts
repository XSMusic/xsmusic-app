export class Artist {
  _id? = '';
  name = '';
  image = '';
  styles?: string[] = [];
  country? = 'es';
  gender? = '';
  info? =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga placeat, incidunt nostrum alias eligendi quia ad quo perferendis consequuntur, tempora explicabo, vero aliquam necessitatibus facere nisi ipsa eos esse repellat.';
  slug = '';
  created? = '';
  updated? = '';
  constructor(data?: Artist) {
    if (data) {
      this._id = data._id ?? this.name;
      this.name = data.name ?? this.name;
      this.image = data.image ?? this.image;
      this.styles = data.styles ?? this.styles;
      this.country = data.country ?? this.country;
      this.gender = data.gender ?? this.gender;
      this.info = data.info ?? this.info;
      this.slug = data.slug ?? this.slug;
      this.created = data.created ?? this.created;
      this.updated = data.updated ?? this.updated;
    }
  }
}

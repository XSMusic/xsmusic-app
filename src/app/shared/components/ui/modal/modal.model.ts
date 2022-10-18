export class Modal {
  id = '';
  title = '';
  text = '';
  show = false;

  constructor(id?: string, title?: string, text?: string) {
    this.id = id ?? this.id;
    this.title = title ?? this.title;
    this.text = text ?? this.text;
  }
}

export class ModalAlert {
  id = '';
  title = '';
  text = '';
  buttonText = '';
  show = false;

  constructor(data?: ModalAlert) {
    if (data) {
      this.id = data.id ?? this.id;
      this.title = data.title ?? this.title;
      this.text = data.text ?? this.text;
      this.buttonText = data.buttonText ?? this.buttonText;
    }
  }
}

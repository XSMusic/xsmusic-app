export class ToastModel {
  text = '';
  type: 'info' | 'success' | 'error' = 'success';
  hidden? = true;

  constructor(data?: ToastModel) {
    if (data) {
      this.text = data.text ?? this.text;
      this.type = data.type ?? this.type;
    }
  }
}

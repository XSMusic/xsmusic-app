import { Component } from '@angular/core';
import { Artist, Style } from '@models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtistService, ToastService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageI } from '@interfaces';
import { StyleService } from '@shared/services/api/style/style.service';
import { countries } from 'assets/data/countries';

@Component({
  selector: 'page-admin-artist',
  templateUrl: 'admin-artist.page.html',
})
export class AdminArtistPage {
  id!: string;
  artist = new Artist();
  styles: Style[] = [];
  title!: string;
  form!: FormGroup;
  countries = countries;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artistService: ArtistService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private styleService: StyleService
  ) {}

  ngOnInit() {
    this.getStyles();
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.getOne();
      this.title = 'Editar Artista';
    } else {
      this.title = 'Nuevo Artista';
      this.initForm();
    }
  }

  getStyles() {
    this.styleService
      .getAll({ page: 1, pageSize: 100, order: ['name', 'asc'] })
      .subscribe({
        next: (response) => (this.styles = response.items),
        error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
      });
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [this.artist.name, [Validators.minLength(3), Validators.required]],
      country: [
        this.artist.country,
        [Validators.minLength(2), Validators.required],
      ],
      image: [
        this.artist.image,
        [Validators.minLength(3), Validators.required],
      ],
      birthdate: [
        this.artist.birthdate,
      ],
      gender: [
        this.artist.gender,
        [Validators.minLength(3), Validators.required],
      ],
      info: [this.artist.info, [Validators.minLength(3), Validators.required]],
    });
  }

  getOne() {
    this.artistService.getOne({ id: this.id }).subscribe({
      next: (response) => {
        this.artist = response;
        this.initForm();
      },
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  onSubmit() {
    this.artist.name = this.form.value['name'];
    this.artist.country = this.form.value['country'];
    this.artist.birthdate = this.form.value['birthdate'];
    this.artist.gender = this.form.value['gender'];
    this.artist.image = this.form.value['image'];
    this.artist.info = this.form.value['info'];
    const observable = this.id
      ? this.artistService.update(this.artist)
      : this.artistService.create(this.artist);
    observable.subscribe({
      next: (response) => this.onSuccess(response),
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  onDelete() {
    // TODO: Añadir confirmacion por modal
    this.artistService.deleteOne(this.id).subscribe({
      next: (response) => this.onSuccess(response),
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  onSuccess(response: MessageI) {
    this.toastService.showToast(TOAST_STATE.success, response.message);
    this.router.navigate(['admin/artists']);
  }

  onChangeStyleSelect(e: any) {
    if (this.artist.styles!.length < 5) {
      const newStyle = this.styles.find(
        (style) => style._id!.toString() === e.target.value.toString()
      );
      console.log(newStyle);
      this.artist.styles?.push(newStyle);
    } else {
      this.toastService.showToast(TOAST_STATE.warning, 'No puedes añadir mas de 5 estilos')
    }
  }

  onClickStyleItem(item: { name: string; _id: string }) {
    console.log(item);
    this.artist.styles = this.artist.styles?.filter(
      (style) => style.name !== item.name
    );
  }
}

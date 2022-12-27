import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { MessageI } from '@interfaces';
import {
  ApiService,
  ImageService,
  TOAST_STATE,
  UIService,
  ValidationsFormService,
} from '@services';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import {
  ImageUploadByUrlDto,
  ImageUploadDto,
} from '@shared/services/api/image/image.dto';
import {
  ApiTypes,
  GenericItemType,
  GenericSubItemType,
  GoToType,
} from '@shared/utils';

@Injectable({ providedIn: 'root' })
export class BaseHelper {
  tempImagesByUrl: string[] = [];
  tempImagesByFile: File[] = [];
  constructor(
    private apiService: ApiService,
    private ui: UIService,
    private validationsFormService: ValidationsFormService,
    private imageService: ImageService,
    private router: Router
  ) {}

  onSubmit(
    apiType: ApiTypes,
    type: GenericItemType,
    subType: GenericSubItemType,
    item: any,
    scraping: any
  ): void {
    const validation = this.validationsFormService.validation(
      type,
      item,
      this.tempImagesByUrl,
      this.tempImagesByFile
    );
    if (validation.state) {
      if (item._id) {
        this.apiService.update(apiType, item).subscribe({
          next: () =>
            this.onSuccessUpdate(type, subType, {
              message: 'Item actualizado',
            }),
          error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
        });
      } else {
        this.apiService.create(apiType, item).subscribe({
          next: (response) =>
            this.onSuccessCreate(item, type, subType, scraping, response),
          error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
        });
      }
    } else {
      this.ui.toast.showToast(TOAST_STATE.error, validation.message);
    }
  }

  onSuccessUpdate(
    type: GenericItemType,
    subType: GenericSubItemType,
    response: MessageI
  ) {
    this.ui.toast.showToast(TOAST_STATE.success, response.message);
    let typeOK!: GoToType;
    if (type === 'media' || type === 'site') {
      typeOK = subType;
    } else {
      typeOK = type;
    }
    this.goToPage({
      type: typeOK,
      typeRoute: 'all',
      admin: true,
    });
  }

  async onSuccessCreate(
    item: any,
    type: GenericItemType,
    subType: GenericSubItemType,
    scraping: any,
    response: any
  ) {
    item._id = response._id;
    for (const imageUrl of this.tempImagesByUrl) {
      this.uploadImageByUrl(item, type, scraping, imageUrl);
    }
    for (const imageFile of this.tempImagesByFile) {
      this.uploadImageByFile(item, type, imageFile);
    }
    this.ui.toast.showToast(TOAST_STATE.success, 'Sitio creado');
    this.router.navigate([routesConfig.admin]);
    setTimeout(() => {
      const data: GoToPageI = {
        type: type !== 'media' && type !== 'site' ? type : subType,
        admin: true,
        typeRoute: 'all',
      };
      this.goToPage(data);
    }, 100);
  }

  uploadImageByFile(item: any, type: GenericItemType, image: File) {
    const temp = item._id ? false : true;
    const data: ImageUploadDto = {
      type: type,
      id: item._id!,
    };
    if (!temp) {
      this.uploadImageByFileNormal(item, type, data, image);
    } else {
      this.uploadImageByFileTemp(image);
    }
  }

  private uploadImageByFileNormal(
    item: any,
    type: GenericItemType,
    data: ImageUploadDto,
    image: File
  ) {
    this.ui.spinner.show();
    this.imageService.upload(data, image).subscribe({
      next: (response) => {
        setTimeout(() => {
          if (type !== 'style') {
            item.images?.push(response);
          }
          this.ui.spinner.hide();
        }, 1000);
      },
      error: (error) => {
        this.ui.spinner.hide();
        this.ui.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  private uploadImageByFileTemp(image: File) {
    this.tempImagesByFile.push(image);
  }

  uploadImageByUrl(
    item: any,
    type: GenericItemType,
    scraping: any,
    image: string
  ) {
    const temp = item._id ? false : true;
    const data: ImageUploadByUrlDto = {
      id: item._id!,
      type: type,
      url: image,
    };
    if (!temp) {
      this.uploadImageByUrlNormal(item, type, data);
    } else {
      this.uploadImageByUrlTemp(scraping, image);
    }
  }

  private uploadImageByUrlNormal(
    item: any,
    type: GenericItemType,
    data: ImageUploadByUrlDto
  ) {
    this.ui.spinner.show();
    this.imageService.uploadByUrl(data).subscribe({
      next: (response) => {
        setTimeout(() => {
          if (type !== 'style') {
            item.images?.push(response);
          }
          this.ui.spinner.hide();
        }, 1000);
      },
      error: (error) => {
        this.ui.spinner.hide();
        this.ui.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  private uploadImageByUrlTemp(scraping: any, image: string) {
    this.tempImagesByUrl.push(image);
    if (scraping && scraping.images && scraping.images.length > 0) {
      scraping.images = scraping.images.filter((img: string) => img !== image);
    }
  }

  goToPage(data: GoToPageI) {
    data.admin = true;
    this.ui.navigation.goToPage(data);
  }
}

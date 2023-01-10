import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { MessageI } from '@interfaces';
import { Like } from '@models';
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
import { GA } from '@shared/services/ui/google-analytics/ga.model';
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
    this.ui.toast.showToast(TOAST_STATE.success, 'Item creado');
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
    this.imageService.uploadByFile(data, image).subscribe({
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

  likeOrDislike(
    event: { type: ApiTypes; like: Like },
    data: {
      item?: any;
      items?: any;
      type: GenericItemType;
      subType?: GenericSubItemType;
    }
  ) {
    this.apiService.create(event.type, event.like).subscribe({
      next: () => {
        if (data.items && data.items.length > 0) {
          this.likeOrDislikeSuccessForAll(
            event,
            data.items,
            data.type,
            data.subType
          );
        } else {
          this.likeOrDislikeSuccessForOne(data.item, data.type, data.subType);
        }
      },
      error: () =>
        this.ui.toast.showToast(TOAST_STATE.error, 'Error al dar Like'),
    });
  }
  private likeOrDislikeSuccessForOne(
    item: any,
    type?: GenericItemType,
    subType?: GenericSubItemType
  ) {
    item.userLike = !item.userLike;
    item.name = 'tururu';
    const gaEvent = new GA({
      event: item.userLike === true ? 'like' : 'dislike',
      one: false,
      type: type !== 'media' && type !== 'site' ? type : subType,
    });
    this.ui.ga2.event(gaEvent);
  }

  private likeOrDislikeSuccessForAll(
    event: { type: ApiTypes; like: Like },
    items?: any[],
    type?: GenericItemType,
    subType?: GenericSubItemType
  ) {
    if (items) {
      items.forEach((i) => {
        if (i._id === event.like[event.like.type]) {
          i.userLike = !i.userLike;
          const gaEvent = new GA({
            event: i.userLike === true ? 'like' : 'dislike',
            one: false,
            type: type !== 'media' && type !== 'site' ? type : subType,
          });
          this.ui.ga2.event(gaEvent);
        }
        return i;
      });
    }
  }
  goToPage(data: GoToPageI) {
    data.admin = true;
    this.ui.navigation.goToPage(data);
  }
}

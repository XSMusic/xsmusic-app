import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IconImageFile, CustomIconData } from '@interfaces';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AngularSvgIconPreloaderService {
  private configUrl = './assets/data/icons.json';
  private iconsFileData!: {
    iconImageFiles: IconImageFile[];
    customIcons: CustomIconData[];
  };
  public configSubject: Subject<any> = new Subject<any>();

  constructor(
    private _http: HttpClient,
    private _iconRegistry: SvgIconRegistryService
  ) {}

  load(): Promise<void> {
    return new Promise((resolve) => {
      return this._http
        .get<{
          iconImageFiles: IconImageFile[];
          customIcons: CustomIconData[];
        }>(this.configUrl)
        .subscribe({
          next: (configData) => {
            this.iconsFileData = configData;
            this.loadIcons();
            resolve();
          },
          error: (err) => {
            console.error(
              'An error occurred loading the icons:\n',
              err,
              '\nNo icons will be loaded.'
            );
            this.iconsFileData = { customIcons: [], iconImageFiles: [] };
            this.loadIcons();
            resolve();
          },
        });
    });
  }

  loadIcons() {
    this.iconsFileData.iconImageFiles.forEach((i: IconImageFile) => {
      this._iconRegistry
        .loadSvg(i.iconPath!, i.iconName)!
        .pipe(take(1))
        .subscribe();
    });
    this.iconsFileData.customIcons.forEach((i: CustomIconData) => {
      this._iconRegistry.addSvg(i.iconName, i.iconData);
    });
  }
}

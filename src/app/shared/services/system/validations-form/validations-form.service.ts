import { Injectable } from '@angular/core';
import { ValidationsFormI } from './validations-form.interface';

@Injectable({ providedIn: 'root' })
export class ValidationsFormService {
  validation(
    type: 'artist' |  'event' | 'media' | 'site' | 'style' |'user',
    item: any,
    tempImages?: any[]
  ): {
    state: boolean;
    message: string;
  } {
    let val: ValidationsFormI = {
      state: true,
      message: '',
    };

    const valTypes = validations
      .filter((v) => v.name === type)
      .map((v) => v.items)[0];

    val = this.name(val, valTypes, item, tempImages!);
    return val;
  }

  name(
    val: ValidationsFormI,
    valTypes: string[],
    item: any,
    tempImages: any[]
  ): ValidationsFormI {
    for (const valName of valTypes) {
      if (valName === 'name' && item.name === '') {
        return {
          state: false,
          message: 'El nombre es obligatorio',
        };
      } else if (valName === 'date' && item.date === '') {
        return {
          state: false,
          message: 'La fecha es obligatoria',
        };
      } else if (valName === 'source' && item.source === '') {
        return {
          state: false,
          message: 'El medio es obligatorio',
        };
      } else if (valName === 'styles' && item.styles!.length === 0) {
        return {
          state: false,
          message: 'Minimo un estilo',
        };
      } else if (valName === 'artists' && item.artists!.length === 0) {
        return {
          state: false,
          message: 'Minimo un artista',
        };
      } else if (valName === 'site' && item.site === '') {
        return {
          state: false,
          message: 'El club/festival es obligatorio',
        };
      } else if (valName === 'sourceId' && item.sourceId === '') {
        return {
          state: false,
          message: 'El id es obligatorio',
        };
      } else if (valName === 'address.street' && item.address.street === '') {
        return {
          state: false,
          message: 'La calle es obligatoria',
        };
      } else if (!item._id && tempImages && tempImages.length === 0) {
        return {
          state: false,
          message: 'La imagen es obligatoria',
        };
      }
    }
    return val;
  }
}

export const validations = [
  {
    name: 'artist',
    items: ['name', 'styles'],
  },
  {
    name: 'event',
    items: ['name', 'date', 'styles', 'site'],
  },
  {
    name: 'media',
    items: ['name', 'source', 'artists', 'site', 'styles', 'sourceId'],
  },
  {
    name: 'site',
    items: ['name', 'address.street', 'styles'],
  },
  {
    name: 'style',
    items: ['name'],
  },
  {
    name: 'user',
    items: ['name'],
  },
];

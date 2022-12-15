import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { DynamicFormBase, DynamicFormTextbox } from '.';

@Injectable({ providedIn: 'root' })
export class DynamicFormService {
  // TODO: get from a remote source of question metadata
  getQuestions() {
    const questions: DynamicFormBase<string>[] = [
      // new DropdownQuestion({
      //   key: 'brave',
      //   label: 'Bravery Rating',
      //   options: [
      //     { key: 'solid', value: 'Solid' },
      //     { key: 'great', value: 'Great' },
      //     { key: 'good', value: 'Good' },
      //     { key: 'unproven', value: 'Unproven' },
      //   ],
      //   order: 3,
      // }),

      new DynamicFormTextbox({
        key: 'email',
        label: 'Email',
        type: 'text',
        required: true,
        order: 1,
      }),
      new DynamicFormTextbox({
        key: 'password',
        label: 'Contraseña',
        type: 'password',
        required: true,
        order: 2,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}

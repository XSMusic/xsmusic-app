import { GoToType } from '@shared/utils';

export interface GoToPageI {
  type?: GoToType;
  typeRoute: 'all' | 'one';
  admin?: boolean;
  item?: any;
  queryParams?: {
    tab?: string;
    source?: string;
    value?: string;
  };
}

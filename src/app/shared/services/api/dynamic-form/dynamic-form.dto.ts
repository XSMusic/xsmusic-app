export interface DynamicFormGetOneDto {
  type: 'form' | 'item';
  subType: 'add' | 'one';
  id: string;
}

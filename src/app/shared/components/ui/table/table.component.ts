import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterI, ShowImageI } from '@interfaces';
import { DeleteI } from '@shared/interfaces/delete.interface';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { GenericItemType, GenericSubItemType } from '@shared/utils';
import { itemsWithHeaders } from './table.helper';
import { TableHeaderI } from './table.interface';

@Component({
  selector: 'custom-table',
  templateUrl: 'table.component.html',
})
export class TableComponent implements OnInit {
  @Input() type!: GenericItemType;
  @Input() subType!: GenericSubItemType;
  @Input() items!: any[];
  headers!: TableHeaderI[];
  @Output() onGoToPage = new EventEmitter<GoToPageI>();
  @Output() onFilter = new EventEmitter<FilterI>();
  @Output() onScroll = new EventEmitter<void>();
  @Output() onShowImage = new EventEmitter<ShowImageI>();
  @Output() onDelete = new EventEmitter<DeleteI>();

  ngOnInit() {
    this.getHeadersWithType();
  }

  getHeadersWithType() {
    const itemsWithType = itemsWithHeaders.find((item) =>
      this.subType ? item.name === this.subType : item.name === this.type
    );
    if (itemsWithType) {
      this.headers = itemsWithType.headers;
    }
  }
}

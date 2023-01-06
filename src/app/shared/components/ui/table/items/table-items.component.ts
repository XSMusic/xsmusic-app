import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterI, ShowImageI } from '@interfaces';
import { DeleteI } from '@shared/interfaces/delete.interface';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import {
  GenericItemType,
  GenericSubItemType,
  getYearsOld,
  GoToType,
} from '@shared/utils';
import { TableHeaderI } from '../table.interface';

@Component({
  selector: 'table-items',
  templateUrl: './table-items.component.html',
})
export class TableItemsComponent implements OnInit {
  @Input() type!: GenericItemType;
  @Input() subType!: GenericSubItemType;
  @Input() header!: TableHeaderI;
  @Input() item: any;
  typeGoTo!: GoToType;
  getYearsOld = getYearsOld;
  @Output() onGoToPage = new EventEmitter<GoToPageI>();
  @Output() onFilter = new EventEmitter<FilterI>();
  @Output() onShowImage = new EventEmitter<ShowImageI>();
  @Output() onDelete = new EventEmitter<DeleteI>();

  ngOnInit() {
    if (this.type === 'media' || this.type === 'site') {
      this.typeGoTo = this.subType;
    } else {
      this.typeGoTo = this.type;
    }
  }
}

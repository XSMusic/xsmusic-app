import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Style } from '@models';
import { ApiService } from '@services';
import { TabsType } from '@shared/utils';
import { DateFunctions } from '@shared/utils/dates';
import { countries } from 'assets/data/countries';
import { filters } from './filter-bar.helper';

@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  animations: [inOutAnimation],
})
export class FilterBarComponent implements OnInit {
  @Input() type: TabsType = 'generic';
  itemsA: { name: string; value: any }[] = [];
  itemsB: { name: string; value: any }[] = [];
  itemFilter = '';
  itemValue = '';
  @Output() onFilter = new EventEmitter<{ name: string; value: any }>();

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getFilterItems();
  }

  getFilterItems() {
    this.itemsA = filters
      .find((item) => this.type.indexOf(item.name) !== -1)!
      .items.map((item) => item);
  }

  onFilterNameSelected() {
    if (this.itemFilter === 'country') {
      this.itemsB = countries.map((item) => {
        return {
          name: item.name,
          value: item.id,
        };
      });
    } else if (this.itemFilter === 'styles') {
      this.apiService
        .getAll<Style>('styles', {
          page: 1,
          pageSize: 100,
          order: ['name', 'asc'],
        })
        .subscribe({
          next: (response) => {
            this.itemsB = response.map((item) => {
              return { name: item.name!, value: item.name! };
            });
          },
        });
    } else if (this.itemFilter === 'year') {
      this.itemsB = [];
      for (let i = 2000; i <= Number(DateFunctions.new().format('YYYY')); i++) {
        this.itemsB.push({ name: i.toString(), value: i });
      }
    }
  }

  filter() {
    this.onFilter.emit({ name: this.itemFilter, value: this.itemValue });
  }
}

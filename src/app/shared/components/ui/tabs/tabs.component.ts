import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { getTabByParam } from '@shared/utils';
import { tabsByType } from './tabs.helper';
import { TabsItem } from './tabs.model';

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.component.html',
  animations: [
    trigger('searchTrigger', [
      state('close', style({ transform: 'translateY(0%)', width: '' })),
      state('open', style({ transform: 'translateY(-50%)', width: '200px' })),
      transition('open <=> close', [animate('300ms ease-in-out')]),
    ]),
    inOutAnimation,
  ],
})
export class TabsComponent implements OnInit {
  @Input() type!: any;
  @Input() view = 'viewGallery';
  tabs: TabsItem[] = [];
  searchState = false;
  filterState = false;
  @Output() changeView = new EventEmitter<string>();
  @Output() search = new EventEmitter<{ text: string; type: string }>();
  @Output() onFilter = new EventEmitter<{ name: string; value: string }>();
  @Output() onClickTab = new EventEmitter<TabsItem>();
  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.setTabs();
    setTimeout(() => {
      const tabByParam = getTabByParam(this.route, this.tabs);
      if (tabByParam) {
        this.onClickViewsButtons(tabByParam);
      } else if (this.tabs[0].action.includes('view')) {
        this.onClickViewsButtons(this.tabs[0]);
      }
    });
  }

  setTabs() {
    const category = tabsByType.filter((item) => item.name === this.type)[0];
    this.tabs = category.buttons;
  }

  clickTab(tab: TabsItem) {
    if (tab.action.includes('view')) {
      this.searchState = false;
      this.onClickViewsButtons(tab);
    } else if (tab.action === 'search') {
      this.filterState = false;
      this.searchState = !this.searchState;
    } else if (tab.action === 'filter') {
      this.searchState = false;
      this.filterState = !this.filterState;
    } else {
      this.searchState = false;
      this.filterState = false;
      this.onClickViewsButtons(tab);
    }
  }

  onClickViewsButtons(tab: TabsItem) {
    if (!tab.isActive) {
      this.setViewButtonsInactive();
      tab.isActive = true;
      this.view = tab.action;
    }
    this.onClickTab.emit(tab);
  }

  private setViewButtonsInactive(): void {
    for (const tab of this.tabs) {
      if (tab.isActivatable) {
        tab.isActive = false;
      }
    }
  }
}

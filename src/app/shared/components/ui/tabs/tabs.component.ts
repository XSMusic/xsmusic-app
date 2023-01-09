import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  Input,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { getTabByParam, TabsType } from '@shared/utils';
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
  @ViewChild('searchInput') searchElement!: ElementRef;
  @Input() type: TabsType = 'generic';
  @Input() view = 'viewGallery';
  tabs: TabsItem[] = [];
  searchState = false;
  filterState = false;
  key: any;
  @Output() changeView = new EventEmitter<string>();
  @Output() search = new EventEmitter<{ text: string; type: string }>();
  @Output() onFilter = new EventEmitter<{ name: string; value: string }>();
  @Output() onClickTab = new EventEmitter<{tab: TabsItem, first: boolean}>();
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '-') {
      this.showSearch();
    } else if (event.key === '.') {
      this.filterState = !this.filterState;
    }
  }
  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.setTabs();
    setTimeout(() => {
      const tabByParam = getTabByParam(this.route, this.tabs);
      if (tabByParam) {
        this.onClickViewsButtons(tabByParam, true);
      } else if (
        this.tabs &&
        this.tabs.length > 0 &&
        this.tabs[0].action.includes('view')
      ) {
        this.onClickViewsButtons(this.tabs[0], true);
      }
    });
  }

  setTabs() {
    const category = tabsByType.filter((item) => item.name === this.type)[0];
    if (category) {
      this.tabs = category.buttons;
    }
  }

  clickTab(tab: TabsItem) {
    if (tab.action.includes('view')) {
      this.searchState = false;
      this.onClickViewsButtons(tab, false);
    } else if (tab.action === 'search') {
      this.showSearch();
    } else if (tab.action === 'filter') {
      this.searchState = false;
      this.filterState = !this.filterState;
    } else {
      this.searchState = false;
      this.filterState = false;
      this.onClickViewsButtons(tab, false);
    }
  }

  showSearch() {
    this.filterState = false;
    this.searchState = !this.searchState;
    if (this.searchState) {
      setTimeout(() => {
        document.getElementById('searchInput')!.focus();
      });
    }
  }

  onClickViewsButtons(tab: TabsItem, first: boolean) {
    if (!tab.isActive) {
      this.setViewButtonsInactive();
      tab.isActive = true;
      this.view = tab.action;
    }
    this.onClickTab.emit({tab, first});
  }

  private setViewButtonsInactive(): void {
    for (const tab of this.tabs) {
      if (tab.isActivatable) {
        tab.isActive = false;
      }
    }
  }
}

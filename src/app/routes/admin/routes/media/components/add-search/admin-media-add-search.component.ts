import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ScrapingService } from '@services';
import { ScrapingSourceI } from '@shared/services/api/scraping/scraping-source.interface';

@Component({
  selector: 'admin-media-add-search',
  templateUrl: './admin-media-add-search.component.html',
})
export class AdminMediaAddSearchComponent {
  @Input() searchText!: string;
  @Output() search = new EventEmitter<string>();
  @Input() source!: string;
  menu = false;
  sources: ScrapingSourceI[] = [];
  constructor(private scrapingService: ScrapingService) {
    this.sources = this.scrapingService.getSources('media');
  }
}

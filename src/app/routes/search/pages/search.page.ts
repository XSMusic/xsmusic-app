import { Component, OnInit } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-search',
  templateUrl: 'search.page.html',
  animations: [inOutAnimation],
})
export class SearchPage implements OnInit {
  text!: string;
  type!: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.setParams();
    this.search();
  }

  setParams() {
    this.text = this.route.snapshot.paramMap.get('text')!;
    this.type = this.route.snapshot.paramMap.get('type')!;
  }

  getSearchBody(e: { text: string; type: string }) {
    this.text = e.text;
    this.type = e.type;
    this.search();
  }

  search() {
    return '';
  }
}

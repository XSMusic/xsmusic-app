import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-sets',
  templateUrl: 'sets.page.html',
})
export class SetsPage implements OnInit {
  constructor() {
    console.log('SetsPage constructor');
  }

  ngOnInit() {
    console.log('SetsPage ngOnInit');
  }
}

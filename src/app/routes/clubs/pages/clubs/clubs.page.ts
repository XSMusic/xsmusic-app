import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-clubs',
  templateUrl: 'clubs.page.html',
})
export class ClubPage implements OnInit {
  constructor() {
    console.log('ClubPage constructor');
  }

  ngOnInit() {
    console.log('ClubPage ngOnInit');
  }
}

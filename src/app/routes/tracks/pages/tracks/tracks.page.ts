import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-tracks',
  templateUrl: 'tracks.page.html',
})
export class TracksPage implements OnInit {
  constructor() {
    console.log('TracksPage constructor');
  }

  ngOnInit() {
    console.log('TracksPage ngOnInit');
  }
}

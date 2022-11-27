import { Component, Input } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { GithubIssueListItemI, GithubActionI } from '@services';

@Component({
  selector: 'github-view-list',
  templateUrl: 'github-view-list.component.html',
  animations: [inOutAnimation],
})
export class GithubViewListComponent {
  @Input() issues: GithubIssueListItemI[] = [];
  @Input() actions: GithubActionI[] = [];
  @Input() type!: 'issues' | 'actions';
  @Input() loading = true;

  goTo(url: string) {
    window.open(url, '_blank');
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import {
  GithubIssue,
  GithubService,
  ToastService,
  TOAST_STATE,
} from '@services';

@Component({
  selector: 'github-issue-add',
  templateUrl: 'github-issue-add.component.html',
  animations: [inOutAnimation],
})
export class GithubIssueAddComponent implements OnInit {
  item = new GithubIssue();
  repos = ['admin', 'app', 'backend'];
  labels = '';
  @Output() onCreated = new EventEmitter();

  constructor(
    private githubService: GithubService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.item.owner = 'XSMusic';
    this.item.assignees = ['josexs'];
  }

  onSubmit() {
    this.item.labels = [];
    if (this.labels.indexOf(', ') !== -1) {
      this.item.labels = this.labels.split(', ');
    } else {
      this.item.labels = [this.labels];
    }
    this.githubService.create(this.item).subscribe({
      next: (response) => {
        this.toast.showToast(TOAST_STATE.success, response.message);
        this.item = new GithubIssue();
        this.onCreated.emit();
      },
      error: (error) => this.toast.showToast(TOAST_STATE.error, error),
    });
  }
}

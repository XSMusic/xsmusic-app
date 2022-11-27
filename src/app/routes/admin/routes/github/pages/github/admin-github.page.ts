import { Component, OnInit } from '@angular/core';
import {
  GithubActionI,
  GithubIssueListItemI,
  GithubService,
  ToastService,
  TOAST_STATE,
} from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';

@Component({
  selector: 'admin-github',
  templateUrl: 'admin-github.page.html',
})
export class AdminGithubPage implements OnInit {
  view = 'viewIssues';
  issues: GithubIssueListItemI[] = [];
  actions: GithubActionI[] = [];
  loadingIssues = true;
  loadingActions = true;
  constructor(
    private githubService: GithubService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.getIssues();
    this.getActions();
  }

  getIssues() {
    this.githubService.getAllIssues().subscribe({
      next: (response) => {
        this.issues = response;
        this.loadingIssues = false;
      },
      error: (error) => {
        this.loadingIssues = false;
        this.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  getActions() {
    this.githubService.getAllActions().subscribe({
      next: (response) => {
        this.actions = response;
        this.loadingActions = false;
      },
      error: (error) => {
        this.loadingActions = false;
        this.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  onClickButton(button: ButtonBlockItem) {
    if (button.action.includes('view')) {
      this.view = button.action;
    }
  }

  onCreatedIssue() {
    this.getIssues();
    this.view = 'viewIssues';
  }
}

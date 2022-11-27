import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { GithubIssueAddComponent } from './components/add-issue/github-issue-add.component';
import { AdminGithubPage } from './pages/github/admin-github.page';
import { GithubViewListComponent } from './components/view-list/github-view-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminGithubPage,
        data: {
          breadcrumb: 'Github',
          title: 'Github',
        },
      },
      { path: '**', redirectTo: 'issues' },
    ]),
  ],
  declarations: [
    AdminGithubPage,
    GithubViewListComponent,
    GithubIssueAddComponent,
  ],
  providers: [],
})
export class AdminGithubModule {}

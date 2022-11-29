export class GithubIssue {
  owner?: string;
  repo = '';
  title?: string;
  body?: string;
  assignees?: string[];
  labels?: string[];

  constructor(data?: GithubIssue) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

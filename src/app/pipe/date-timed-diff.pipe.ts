import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimedDiff'
})
export class DateTimedDiffPipe implements PipeTransform {

  transform(date: any): any {
    // find time diifrence in milliseconds.
    var now = new Date().toISOString();
    let diffInMs = Date.parse(now) - Date.parse(date);

    if (diffInMs < 0)
      return null;

    let diffInHrs = diffInMs / 1000 / 60 / 60;
    var hrs = Math.floor((diffInHrs % 86400000) / 3600000);

    if (hrs >= 1) {
      return hrs + ` hours ago`;
    } else {
      return Math.round(((diffInMs % 86400000) % 3600000) / 60000) + ` minutes ago`;
    }
  }

}

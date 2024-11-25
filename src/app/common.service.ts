import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  alertShowTime = 4000;
  errContent = "Error"
  succContent = "Ok"
  pageList: any = [
    { "name": "20", "value": "20" },
    { "name": "30", "value": "30" },
    { "name": "40", "value": "40" },
    { "name": "50", "value": "50" },
    { "name": "60", "value": "60" },
    { "name": "70", "value": "70" },
    { "name": "80", "value": "80" },
    { "name": "90", "value": "90" },
    { "name": "100", "value": "100" },
    { "name": "200", "value": "200" }
  ];
  subjectUserType: any = new Subject<any>();

  constructor(private snackBar: MatSnackBar) { }

  showAlertMessage(content: any, action: any) {
    this.snackBar.open(content, action, {
      duration: this.alertShowTime,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }

  mailFormatCheck(email: any) {
    const format: any = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (format.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  convertOnlyDate(date: any) {
    const parts = date.split("-");
    const convertedDateString = `20${parts[2]}-${parts[1]}-${parts[0]}`;
    return convertedDateString;
  }

  dateFormatDateMonthYear(date: any) {
    var dateComponents = date.split('-');
    var day = dateComponents[2];
    var month = dateComponents[1];
    var year = dateComponents[0];
    // if (year.length === 2) {
    //   var currentYear = new Date().getFullYear().toString().slice(0, 2);
    //   year = currentYear + year;
    // }
    var outputDate = day + '-' + month + '-' + year;
    return outputDate;
  }
}

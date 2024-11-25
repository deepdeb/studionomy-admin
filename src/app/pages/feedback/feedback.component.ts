import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { CommonService } from 'src/app/common.service';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  limit: number = 10;
  offset: number = 0;
  totalFeedback: number = 0;
  feedbackList: any = [];
  searchName = "" as any;
  pageList = this.common.pageList;
  constructor(private rest: RestService, private common: CommonService) { }

  ngOnInit(): void {
    this.getFeedbackList();
  }
  getFeedbackList() {
    const data = {
      limit: this.limit,
      offset: this.offset
    };
    this.rest.getFeedbackList(data).subscribe((res: any) => {
      if (res.success) {
        this.totalFeedback = res.totalFeedback;
        this.feedbackList = [];
        this.feedbackList = res.response;
        console.log('feedback list>>>', this.feedbackList);
      }
    })
  }
  statusChange(f_id: any, isShow: any) {
    const data = {
      f_id: f_id,
      isShow: isShow
    };
    this.rest.changeFeedbackStatus(data).subscribe((res: any) => {
      if (res.success) {
        this.getFeedbackList();
        this.common.showAlertMessage(res.message, this.common.succContent);
      }
    })
  }
  search() {
    if (this.searchName == "" || this.searchName == null || this.searchName == undefined) {
      this.common.showAlertMessage("Please enter name", this.common.errContent);
      return;
    };
    const data = {
      name: this.searchName
    };
    this.rest.getFeedbackList(data).subscribe((res: any) => {
      if (res.success) {
        this.totalFeedback = res.totalFeedback;
        this.feedbackList = [];
        this.feedbackList = res.response;
      }
    })
  }
  allFeedback() {
    if (this.searchName.length == 0) {
      this.getFeedbackList();
    }
  }
  dateFormat(date: any) {
    var myDate = new Date(date);
    var finalDate = myDate.toISOString().split("T")[0]
    var tempDate = myDate.toISOString().split("T")[1];
    const [year, month, day] = finalDate.split('-');
    const result = [day, month, year].join('-');
    return result;
  }

  //------------------------  Pagination ------------------//

  previous() {
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.getFeedbackList();
  }
  next() {
    this.offset = this.offset + this.limit;
    this.getFeedbackList();
  }
  changePageLimit(event: any) {
    this.limit = event.target.value;
    this.getFeedbackList();
  }
}

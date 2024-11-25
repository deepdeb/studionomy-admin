import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-availed-subscription',
  templateUrl: './availed-subscription.component.html',
  styleUrls: ['./availed-subscription.component.css']
})
export class AvailedSubscriptionComponent implements OnInit {
  totalAvailedSubscription = 0;
  limit: number = 10;
  offset: number = 0;
  pageList = this.common.pageList;
  availedSubscriptionList: any = [];
  searchCondition: any;


  constructor(private common: CommonService, private rest: RestService) { }

  ngOnInit(): void {
    this.getAvailedSubscriptionList();
  }

  getAvailedSubscriptionList() {
    const data = {
      limit: this.limit,
      offset: this.offset
    };
    this.rest.getAvailedSubscriptionList(data).subscribe((res: any) => {
      if (res.success) {
        this.totalAvailedSubscription = res.totalSubscription[0].count;
        this.availedSubscriptionList = [];
        this.availedSubscriptionList = res.response;
      }
    })
  }

  searchSubscriber(searchCondition: any) {
    const data = {
      limit: this.limit,
      offset: this.offset,
      searchCondition : this.searchCondition
    };
    this.rest.getAvailedSubscriptionList(data).subscribe((res: any) => {
      if (res.success) {
        this.totalAvailedSubscription = res.totalSubscription[0].count;
        this.availedSubscriptionList = [];
        this.availedSubscriptionList = res.response;
      }
    })
  }

  dateFormat (date: any) {
    const formattedDate = date.split('T')[0];
    const finalDate = this.common.dateFormatDateMonthYear(formattedDate);
    return finalDate;
  }

  //------------------------  Pagination ------------------//

  previous() {
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.getAvailedSubscriptionList();
  }
  next() {
    this.offset = this.offset + this.limit;
    this.getAvailedSubscriptionList();
  }
  changePageLimit(event: any) {
    this.limit = event.target.value;
    this.getAvailedSubscriptionList();
  }
}

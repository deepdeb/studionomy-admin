import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { CommonService } from 'src/app/common.service';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  subs_id: any = 0;
  subs_type = "" as any;
  subs_for = "" as any;
  subs_name = "" as any;
  amount: any = "";
  no_of_jobs: any = "";
  validity: any = "";
  limit: number = 10;
  offset: number = 0;
  totalSubscription: number = 0;
  subscriptionList: any = [];
  searchSubsName = "" as any;
  pageList = this.common.pageList;
  editFlag = false as any;
  discount_type = '' as any;
  discount = '' as any;
  final_amount = '' as any;
  constructor(private rest: RestService, private common: CommonService) { }

  ngOnInit(): void {
    this.getSubscriptionList();
  }

  subscriptionSubmit() {
    if (this.subs_for == "" || this.subs_for == null || this.subs_for == undefined) {
      if(this.subs_for !== 0) {
        this.common.showAlertMessage("Please select subscription for", this.common.errContent);
        return;
      }
    }
    if (this.subs_name == "" || this.subs_name == null || this.subs_name == undefined) {
      this.common.showAlertMessage("Please enter subscription name", this.common.errContent);
      return;
    }
    if (this.subs_type == "" || this.subs_type == null || this.subs_type == undefined) {
      if(this.subs_type !== 0) {
        this.common.showAlertMessage("Please select subscription type", this.common.errContent);
        return;
      }
    }
    if (this.amount == "" || this.amount == null || this.amount == undefined) {
      this.common.showAlertMessage("Please enter amount", this.common.errContent);
      return;
    }

    const data = {
      subs_id: this.subs_id,
      subs_type: this.subs_type,
      subs_for: this.subs_for,
      subs_name: this.subs_name,
      amount: this.amount,
      discount_type: this.discount_type,
      discount: this.discount,
      final_amount: this.final_amount,
      no_of_jobs: this.no_of_jobs,
      validity: this.subs_type == 0 ? this.validity : null,
      created_by: localStorage.getItem('slAdminUserId')
    };


    this.rest.subscriptionSubmit(data).subscribe((res: any) => {
      if (res.success) {
        this.getSubscriptionList();
        this.subs_id = 0;
        this.subs_type = "";
        this.subs_for = "";
        this.subs_name = "";
        this.amount = "";
        this.no_of_jobs = "";
        this.validity = "";
        this.discount_type = '',
        this.discount = '',
        this.final_amount = ''
        this.common.showAlertMessage(res.message, this.common.succContent);
      } else {
        this.common.showAlertMessage(res.message, this.common.errContent);
      }
    })
  }

  getSubscriptionList() {
    const data = {
      limit: this.limit,
      offset: this.offset
    };
    this.rest.subscriptionList(data).subscribe((res: any) => {
      if (res.success) {
        this.totalSubscription = res.totalSubscription;
        this.subscriptionList = [];
        this.subscriptionList = res.response;
        console.log(">>", this.subscriptionList);
      }
    })
  }
  subscriptionStatus(subs_id: any, isActive: any) {
    const data = {
      subs_id: subs_id,
      isActive: isActive
    };
    this.rest.changeSubscriptionStatus(data).subscribe((res: any) => {
      if (res.success) {
        this.getSubscriptionList();
        this.common.showAlertMessage(res.message, this.common.succContent);
      }
    })
  }
  fetchEditData(item: any) {
    this.subs_for = item.subs_for;
    this.subs_name = item.subs_name;
    this.subs_type = item.subs_type;
    this.amount = item.amount;
    this.discount_type = item.discount_type;
    this.discount = item.discount;
    this.final_amount = item.final_amount;
    this.no_of_jobs = item.no_of_jobs;
    this.validity = item.validity;
    this.subs_id = item.subs_id;
    this.editFlag = true;
  }
  search() {
    if (this.searchSubsName == "" || this.searchSubsName == null || this.searchSubsName == undefined) {
      this.common.showAlertMessage("Please enter value", this.common.errContent);
      return;
    }
    const data = {
      subs_name: this.searchSubsName
    };
    this.rest.subscriptionList(data).subscribe((res: any) => {
      if (res.success) {
        this.totalSubscription = res.totalSubscription;
        this.subscriptionList = [];
        this.subscriptionList = res.response;
      }
    })
  }
  allSubscription() {
    if (this.searchSubsName.length == 0) {
      this.getSubscriptionList();
    }
  }

  //------------------------  Pagination ------------------//

  previous() {
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.getSubscriptionList();
  }
  next() {
    this.offset = this.offset + this.limit;
    this.getSubscriptionList();
  }

  changePageLimit(event: any) {
    this.limit = event.target.value;
    this.getSubscriptionList();
  }

  calculateFinalAmount() {
    if(this.discount !== 0 && this.discount !== null && this.discount !== undefined && this.discount !== '') {
      if(this.discount_type === 'flat') {
        this.final_amount = this.amount - this.discount;
      } else {
        const amountToDeduct = this.amount * (this.discount/100);
        this.final_amount = this.amount - amountToDeduct;
      }
    } else {
      this.final_amount = this.amount;
    }
  }
}

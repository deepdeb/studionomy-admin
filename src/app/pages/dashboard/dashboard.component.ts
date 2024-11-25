import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalStudioUser: number = 0;
  totalFreelancerUser: number = 0;
  totalEquipmentUser: number = 0;
  totalSubscription: number = 0;

  constructor(private rest: RestService, private router: Router, private common: CommonService) {
  }

  ngOnInit(): void {
    this.getDashboardCount();
  }

  getDashboardCount() {
    this.rest.getDashboardCount().subscribe((res: any) => {
      if (res.success) {
        this.totalStudioUser = res.totalStudioUser;
        this.totalFreelancerUser = res.totalFreelancerUser;
        this.totalEquipmentUser = res.totalEquipmentUser;
        this.totalSubscription = res.totalSubscription;
      }
    })
  }
  goToUser(type: any) {
    this.common.subjectUserType.next(type);
    this.router.navigate(['pages/user/' + type]);
  }
  goToFeedbackList() {
    this.router.navigate(['pages/feedback-list']);
  }
  goToQueryList() {
    this.router.navigate(['pages/query-list']);
  }
  goToSubscription() {
    this.router.navigate(['pages/subscription']);
  }
  goToAvailedSubscription() {
    this.router.navigate(['pages/availed-subscription-list']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private router: Router, private common: CommonService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('slAdminUserId')) {
      this.router.navigate(['/']);
    }
  }

  goToDashboard() {
    this.router.navigate(['pages/dashboard']);
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

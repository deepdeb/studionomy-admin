import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName = "" as any;
  constructor(private router: Router, private common: CommonService) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('slAdminUserName');

  }
  logout() {
    localStorage.removeItem('slAdminUserId');
    this.router.navigate(['/']);
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

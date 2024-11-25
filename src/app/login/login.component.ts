import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { RestService } from '../rest.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName = "" as any;
  password = "" as any;

  constructor(private router: Router, private common: CommonService, private rest: RestService) { }

  ngOnInit(): void {
  }

  login() {
    if (this.userName == "" || this.userName == null || this.userName == undefined) {
      this.common.showAlertMessage("Please enter username", this.common.errContent);
      return;
    }
    if (this.password == "" || this.password == null || this.password == undefined) {
      this.common.showAlertMessage("Please enter password", this.common.errContent);
      return;
    }
    const data = {
      userName: this.userName,
      password: this.password,
      loginType: "admin"
    }
    this.rest.login(data).subscribe((res: any) => {
      if (res.success) {
        localStorage.setItem('slAdminUserId', res.response[0].userId);
        localStorage.setItem('slAdminUserName', res.response[0].userName);
        this.common.showAlertMessage(res.message, this.common.succContent);
        this.router.navigate(['pages/dashboard']);
      } else {
        this.common.showAlertMessage(res.message, this.common.errContent);
      }
    })
  }

}

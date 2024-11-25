import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { CommonService } from 'src/app/common.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  limit: number = 10;
  offset: number = 0;
  userList: any = [];
  userCount: number = 0;
  userType = "" as any;
  city = "";
  name = "";
  subscribe = "" as any;
  pageList = this.common.pageList;
  constructor(private rest: RestService, private common: CommonService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.common.subjectUserType.subscribe((res: any) => {
      this.userType = res;
      this.limit = 10;
      this.getUserList(this.userType);
    })
    this.userType = this.activateRoute.snapshot.paramMap.get('id');
    if (this.userType != null && this.userType != "") {
      this.getUserList(this.userType);
    }
  }
  getUserList(type: any) {
    const data = {
      userType: type.toString() ? type.toString() : null,
      city: this.city ? this.city : null,
      name: this.name ? this.name : null,
      limit: this.limit,
      offset: this.offset
    };

    this.rest.getUserList(data).subscribe((res: any) => {
      if (res.success) {
        this.userList = [];
        this.userCount = res.userCount;
        this.userList = res.response;
        console.log('>>>', res.response);
      }
    })
  }
  goToSocialLink(link: any) {
    window.open(link);
  }
  search() {
    if (this.city == "" || this.city == null || this.city == undefined && this.subscribe == "" || this.subscribe == null || this.subscribe == undefined) {
      this.common.showAlertMessage("Please fill any one field", this.common.errContent);
      return;
    };
    this.getUserList(this.userType);
  }
  allUser() {
    if (this.city.length == 0) {
      this.city = "";
      this.getUserList(this.userType);
    }
  }

  //------------------------  Pagination ------------------//

  previous() {
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.getUserList(this.userType);
  }
  next() {
    this.offset = this.offset + this.limit;
    this.getUserList(this.userType);
  }

  changePageLimit(event: any) {
    this.limit = event.target.value;
    this.getUserList(this.userType);
  }
}


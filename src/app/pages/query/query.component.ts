import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { CommonService } from 'src/app/common.service';
@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  limit: number = 10;
  offset: number = 0;
  totalQuery: number = 0;
  queryList: any = [];
  searchName = "" as any;
  pageList = this.common.pageList;
  constructor(private rest: RestService, private common: CommonService) { }

  ngOnInit(): void {
    this.getQueryList();
  }

  getQueryList() {
    const data = {
      limit: this.limit,
      offset: this.offset
    };
    this.rest.getQueryList(data).subscribe((res: any) => {
      if (res.success) {
        this.totalQuery = res.totalQuery;
        this.queryList = [];
        this.queryList = res.response;
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
    this.rest.getQueryList(data).subscribe((res: any) => {
      if (res.success) {
        this.totalQuery = res.totalQuery;
        this.queryList = [];
        this.queryList = res.response;
      }
    })
  }
  allQuery() {
    if (this.searchName.length == 0) {
      this.getQueryList();
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
    this.queryList();
  }
  next() {
    this.offset = this.offset + this.limit;
    this.queryList();
  }
  changePageLimit(event: any) {
    this.limit = event.target.value;
    this.queryList();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class RestService {
  //API_ROOT = "http://localhost:5000/v1/";

  API_ROOT = environment.API_ROOT;
  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(this.API_ROOT + 'user/userLogin', data, httpOptions);
  }

  getFeedbackList(data: any) {
    return this.http.post(this.API_ROOT + 'feedback/feedbackList', data, httpOptions);
  }
  getQueryList(data: any) {
    return this.http.post(this.API_ROOT + 'query/queryList', data, httpOptions);
  }
  subscriptionSubmit(data: any) {
    return this.http.post(this.API_ROOT + 'subscription/subscriptionSubmit', data, httpOptions);
  }
  subscriptionList(data: any) {
    return this.http.post(this.API_ROOT + 'subscription/submitSubscriptionList', data, httpOptions);
  }
  changeFeedbackStatus(data: any) {
    return this.http.post(this.API_ROOT + 'feedback/changeFeedbackStatus', data, httpOptions);
  }
  changeSubscriptionStatus(data: any) {
    return this.http.post(this.API_ROOT + 'subscription/changeSubscriptionStatus', data, httpOptions);
  }
  getUserList(data: any) {
    return this.http.post(this.API_ROOT + 'user/userList', data, httpOptions);
  }
  getDashboardCount() {
    return this.http.get(this.API_ROOT + 'common/dashboardCount', httpOptions);
  }
  getAvailedSubscriptionList(data: any) {
    return this.http.post(this.API_ROOT + 'subscription/availedSubscription', data, httpOptions);
  }
}

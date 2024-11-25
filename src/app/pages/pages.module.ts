import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { QueryComponent } from './query/query.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { UserComponent } from './user/user.component';
import { AvailedSubscriptionComponent } from './availed-subscription/availed-subscription.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    FeedbackComponent,
    QueryComponent,
    SubscriptionComponent,
    UserComponent,
    AvailedSubscriptionComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule
  ]
})
export class PagesModule { }

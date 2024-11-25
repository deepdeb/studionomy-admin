import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { QueryComponent } from './query/query.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { AvailedSubscriptionComponent } from './availed-subscription/availed-subscription.component';
const routes: Routes = [{
  path: '', component: PagesComponent,
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user/:id', component: UserComponent },
    { path: 'feedback-list', component: FeedbackComponent },
    { path: 'query-list', component: QueryComponent },
    { path: 'subscription', component: SubscriptionComponent },
    { path: 'availed-subscription-list', component: AvailedSubscriptionComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

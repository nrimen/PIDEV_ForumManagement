import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./Components/home/home.component";
import { ApplicationComponent } from "./Components/application/application.component";
import { NotFoundComponent } from "./Shared/not-found/not-found.component";
import { RequestComponent } from './Components/request/request.component';
import { AddrequestComponent } from './Components/addrequest/addrequest.component';
import { RequestadminComponent } from './Components/requestadmin/requestadmin.component';
import { ResumeComponent } from './resume/resume.component';
import { ApplyComponent } from './Components/apply/apply.component';
import { ZegocloudComponent } from './zegocloud/zegocloud.component';


const r: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'applications', component: ApplicationComponent },
  { path: 'requests', component: RequestComponent },
  { path: 'requestsadmin', component: RequestadminComponent },
  { path: 'addrequest', component: AddrequestComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'apply', component: ApplyComponent },
  {path: 'videocall', component: ZegocloudComponent},

  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(r)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

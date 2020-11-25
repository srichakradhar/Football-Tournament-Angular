import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Guard
import { AuthGuard } from './guards/auth.guard';
//Components
import { RegistrationComponent } from './components/registration/registration.component';
import { ViewdetailsComponent } from './components/viewdetails/viewdetails.component';
import { PlayersComponent } from './components/players/players.component';
import { MappingComponent } from './components/mapping/mapping.component';
import { Team11Component } from './components/team11/team11.component';
import { LoginComponent } from './components/login/login.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"adminlogin",component:AdminLoginComponent},
  {path:"register",component:RegistrationComponent},
  {path:"viewdetails",component:ViewdetailsComponent,canActivate : [AuthGuard]},
  {path:"map",component:MappingComponent},
  {path:"players",component:PlayersComponent},
  {path:"players/:id",component:PlayersComponent},
  {path:"team11",component:Team11Component},
  {path:"team11/:id",component:Team11Component},
  {path:"",redirectTo:"login",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [RegistrationComponent,ViewdetailsComponent,MappingComponent,PlayersComponent,Team11Component,LoginComponent,AdminLoginComponent];
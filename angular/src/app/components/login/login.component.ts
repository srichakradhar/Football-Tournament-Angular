import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TeamdataService } from 'src/app/services/teamdata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild(NgForm) ngForm: NgForm;

  center = "center";
  nameReqErr="user name is required";
  pwdReqErr="password is required";

  loginUser = {
    name: '',
    password: ''
  }

  constructor(private router: Router, private _teamService: TeamdataService) { }

  ngOnInit(): void {
    this._teamService.logout();
  }

  toRegister() {
    this.router.navigate(['/register']);
  }

  logging(user) {

    this._teamService.getUserLogin(user).subscribe((data) => {

      localStorage.setItem('isLoggedIn', "true");
      localStorage.setItem('token', data.token);
      localStorage.setItem('author', data.team.name);
      this.router.navigate(['/viewdetails']);
    
    });

  }

  adminLogin() {
    this.router.navigate(['/adminlogin']);
  }

}



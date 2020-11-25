import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TeamdataService } from 'src/app/services/teamdata.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  @ViewChild(NgForm) ngForm: NgForm;

  center = "center";
  nameReqErr="user name is required";
  pwdReqErr="password is required";

  loginAdmin = {
    name: '',
    password: ''
  }

  constructor(private router: Router, private _teamService: TeamdataService) { }

  ngOnInit(): void {
    this._teamService.logout();
  }

  logging(admin) {

    this._teamService.getAdminLogin(admin).subscribe(data => {

      localStorage.setItem('isLoggedIn', "true");
      localStorage.setItem('token', data.token);
      localStorage.setItem('author', data.admin.name);
      localStorage.setItem('admin', 'Admin');
      this.router.navigate(['/viewdetails']);

    });

  }

  userLogin() {
    this.router.navigate(['/login']);
  }

}




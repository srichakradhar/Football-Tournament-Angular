import { Component, OnInit, ViewChild } from '@angular/core';
import { TeamClass } from 'src/app/models/TeamClass';
import { TeamdataService } from '../../services/teamdata.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  IsValidateSuccess: boolean = true;
  cpass1 = { cpass: '' }
  teamArray: TeamClass[]
  @ViewChild(NgForm) ngForm: NgForm;

  nameReqErr="Name is required";
  nameMinErr="Name must be at least 3 characters long";
  coachReqErr="Coach name is required";
  coachMinErr="Coach name must be at least 3 characters long";
  coachPatternErr="Name should contain alphebets only";
  countryReqErr="Country name is required";
  countryMinErr="Country name must be at least 3 characters long";
  pwdReqErr="Password is required";
  pwdPatternErr="Password does not meet required condition";


  constructor(private router: Router, private actRoute: ActivatedRoute, private _teamService: TeamdataService) { }

  ngOnInit(): void {
    this.clear();
  }

  currentTeam: TeamClass = {
    id: '',
    name: '',
    country: '',
    coach: '',
    password: ''
  }

  createTeam(form: NgForm, team: TeamClass) {

    this._teamService.createTeam(team).subscribe((result: TeamClass) => {
      alert("Team Details Added\nYou can login now");
      this.router.navigate(['/login']);
    });
    this.clear();
    form.resetForm();

  }

  clear() {
    this.currentTeam = {
      id: '',
      name: '',
      country: '',
      coach: '',
      password: ''
    }
  }

}

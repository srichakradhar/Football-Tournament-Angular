import { Component, OnInit } from '@angular/core';
import { TeamClass } from '../../models/TeamClass';
import { Router } from '@angular/router';
import { TeamdataService } from '../../services/teamdata.service';

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.css']
})
export class ViewdetailsComponent implements OnInit {

  showLoading: boolean = true;
  teamId: string;
  teamArray: TeamClass[];
  updatedAlert = '';

  updating = {
    coach: ''
  }

  adminUpdating = {
    name: '',
    country: '',
    coach: ''
  }
  
  assignTeam(team) {
    this.teamId = team.id;
    this.adminUpdating.name = team.name;
    this.adminUpdating.coach = team.coach;
    this.adminUpdating.country = team.country;
  }
  
  constructor(private _teamService: TeamdataService, private router: Router) { }
  
  shown: string;
  shownAdmin: string;
  ngOnInit(): void {
    this.shownAdmin = localStorage.getItem('admin');
    this.shown = localStorage.getItem('author');
    this.getTeams();
  }
  
  getTeams() {

    if (this.isAdmin()) {
      this._teamService.getAdminTeams().subscribe(data => {
        this.teamArray = data;
        this.showLoading = false;
      });
    } else {
      this._teamService.getTeams().subscribe(data => {
        this.teamArray = data;
        this.showLoading = false;
      });
    }

  }

  updateTeam(updated, id) {

    if (this.isAdmin()) {
      console.log(id);
      this._teamService.adminUpdateTeam(updated, id).subscribe(data => {
        this.getTeams();
        alert("Team details Updated");
      });
    } else {
      this._teamService.updateTeam(updated).subscribe(data => {
        this.getTeams();
        alert("Coach Name Updated");
      });
    }

  }

  deleteTeam(id) {

    if (this.isAdmin()) {
      this._teamService.adminDeleteTeam(id).subscribe(data => {
        alert(data.message);
        this.getTeams();
      });
    }
    else {
      this._teamService.deleteTeam().subscribe(data => {
        alert("you are no more a valid user");
        this.router.navigate(['/login']);
      });
    }

  }

  PlayerDetails(team) {
    this.router.navigate(['/players', team.id]);
  }

  team11(team) {
    this.router.navigate(['/team11', team.id]);
  }

  myTeam11() {
    this.router.navigate(['/team11']);
  }

  myPlayerDetails() {
    this.router.navigate(['/players']);
  }

  toLeaderBoard() {
    this.router.navigate(['/map']);
  }

  logout() {
    this._teamService.logout();
    this.router.navigate(['/login']);
  }

  isBelongsTo(name) {
    if (name.localeCompare(this.shown) == 0) return true;
    else return false;
  }

  isAdmin() {
    if ("Admin".localeCompare(this.shownAdmin) == 0) return true;
    else return false;
  }

}

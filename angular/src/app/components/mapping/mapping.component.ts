import { Component, OnInit } from '@angular/core';
import { TeamClass } from 'src/app/models/TeamClass';
import { MapClass } from 'src/app/models/MapClass';
import { Router } from '@angular/router';
import { TeamdataService } from '../../services/teamdata.service';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit {

  showLoading: boolean = true;

  constructor(private _teamService: TeamdataService, private router: Router) {}

  center = "center";
  inSuffTeamsErr="Number of teams should be 4 or above";
  team1Final = "";
  team2Final = "";
  teamWinner = "";
  team1SemiFinal1 = "";
  team2SemiFinal1 = "";
  team3SemiFinal2 = "";
  team4SemiFinal2 = "";
  numberOfTeams: number;
  shownAdmin: string;
  teamArray: TeamClass[];

  ngOnInit(): void {
    this.shownAdmin = localStorage.getItem('admin');
    this.getMappings();
    this.getTeams();
  }

  isAdmin() {
    if ("Admin".localeCompare(this.shownAdmin) == 0) return true;
    else return false;
  }

  mappingToLeaderboard(name,category){
    if(this.isAdmin()){
      this._teamService.getMaps().subscribe((data:MapClass[]) => {
        for(let each of data){
          if(each.category.localeCompare(category)==0){
            each.name= (name.localeCompare("clear")==0) ? '' : name ;
            this.updateMapping(each);
          }
        }
        this.getMappings();
      });
    }
  }

  clearAllMapping(){
    this._teamService.getMaps().subscribe((data:MapClass[]) => {
      for(let each of data){
        each.name = '';
        this.updateMapping(each);
      }
    });
  }

  updateMapping(mapTeam) {
    this._teamService.updateMapping(mapTeam).subscribe(
      (result: MapClass) => {
        this.getMappings();
      });
  }

  getTeams() {

    if (this.isAdmin()) {
      this._teamService.getAdminTeams().subscribe((data: TeamClass[]) => {
        this.numberOfTeams = data.length;
        if (this.numberOfTeams >= 4) {
          this.teamArray = data;
        }else{
          this.clearAllMapping();
        }
        this.showLoading = false;
      });
    } else {
      this._teamService.getTeams().subscribe((data: TeamClass[]) => {
        this.numberOfTeams = data.length;
        if (this.numberOfTeams >= 4) {
          this.teamArray = data;
        }else{
          this.clearAllMapping();
        }
        this.showLoading = false;
      });
    }

  }

  getMappings() {
    this._teamService.getMaps().subscribe(
      (data: MapClass[]) => {
        this.team1Final = data[0].name;
        this.team2Final = data[1].name;
        this.teamWinner = data[2].name;
        this.team1SemiFinal1 = data[3].name;
        this.team2SemiFinal1 = data[4].name;
        this.team3SemiFinal2 = data[5].name;
        this.team4SemiFinal2 = data[6].name;
      });
  }

  toHome() {
    this.router.navigate(['viewdetails']);
  }

}









import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PlayerClass } from 'src/app/models/PlayerClass';
import { TeamClass } from 'src/app/models/TeamClass';
import { TeamdataService } from '../../services/teamdata.service';

@Component({
  selector: 'app-team11',
  templateUrl: './team11.component.html',
  styleUrls: ['./team11.component.css']
})
export class Team11Component implements OnInit {

  teamId: string;
  playerArray: PlayerClass[];
  team11Players = [];
  teamArray: TeamClass;
  ids: number;
  typeBaseSelection: string;
  teamElevenMsg: string;
  showLoading: boolean;
  showTeamName: string;
  shownAdmin: string;

  constructor(private actRoute: ActivatedRoute, private _teamService: TeamdataService, private router: Router) { }

  ngOnInit(): void {
    this.showLoading = true;
    this.showTeamName = localStorage.getItem('author');
    this.shownAdmin = localStorage.getItem('admin');
    this.actRoute.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.teamId = id;
    });
    this.getPlayers();
    this.getMyTeam(this.teamId);
  }

  getMyTeam(id) {

    if (this.isAdmin()) {
      this._teamService.getAdminTeams().subscribe((data) => {
        for (let team of data) {
          if (team.id.localeCompare(id) == 0) {
            this.showTeamName = team.name;
            break;
          }
        }
      });
    }

  }

  isAdmin() {
    if ("Admin".localeCompare(this.shownAdmin) == 0) return true;
    else return false;
  }


  getPlayers() {

    if (this.isAdmin()) {
      this._teamService.adminGetPlayers(this.teamId).subscribe(data => {
        this.playerArray = data;
        this._teamService.adminGetTeam11(this.teamId).subscribe(data => {
          this.team11Players = data.team11s;
          this.typeBaseSelection = data.message;
          if (this.team11Players.length < 11) this.teamElevenMsg = "No sufficient players"; else this.teamElevenMsg = "";
        });
        this.showLoading = false;
      });
    } else {
      this._teamService.getPlayers().subscribe(data => {
        this.playerArray = data;
        this._teamService.getTeam11().subscribe(data => {
          this.team11Players = data.team11s;
          this.typeBaseSelection = data.message;
          if (this.team11Players.length < 11) this.teamElevenMsg = "No sufficient players"; else this.teamElevenMsg = "";
        });
        this.showLoading = false;
      });
    }
  
  }

  toTeam11(player) {

    if (this.team11Players.length < 11) {
      player.inEleven = true;
      if (this.isAdmin()) {
        this._teamService.adminUpdatePlayer(player).subscribe();
      } else {
        this._teamService.updatePlayer(player).subscribe();
      }
    } else alert("There are already 11 players");
    this.getPlayers();

  }

  initialise() {
    this.ids = 0;
  }
  increment() {
    this.ids++;
  }

  clearFromTeam11(player) {

    player.inEleven = false;
    if (this.isAdmin()) {
      this._teamService.adminUpdatePlayer(player).subscribe();
    } else {
      this._teamService.updatePlayer(player).subscribe();
    }
    this.getPlayers();

  }

  toHome() {
    this.router.navigate(['viewdetails']);
  }

}

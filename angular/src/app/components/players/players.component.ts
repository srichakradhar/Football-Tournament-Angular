import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TeamClass } from 'src/app/models/TeamClass';
import { PlayerClass } from 'src/app/models/PlayerClass';
import { Component, OnInit , ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { TeamdataService } from '../../services/teamdata.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  playerArray:PlayerClass[]=[];
  displayedColumns: string[] = ['name', 'type', 'age' , 'edit','del','noOfMatches','goalsScored'];
  dataSource = new MatTableDataSource<PlayerClass>(this.playerArray);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  teamId;
  @ViewChild(NgForm) ngForm: NgForm;

  nameReqErr="Name is required";
  namePatternErr="Name should contain alphebets only";
  nameMinErr="Name must be at least 3 characters long";
  typeReqErr="Type is required";
  ageReqErr="Age is required";
  ageRangeErr="Player age should between 16 and 35";
  nmReqErr="No. of matches is required";
  nmRangeErr="No. of matches should between 0 and 2000";
  goalReqErr="No. of goals is required";
  goalRangeErr="No. of goals should between 0 and 1000";


  playerDetail:PlayerClass={
    id:'',
    inEleven:false,
    name:'',
    type:'',
    age:null,
    noOfMatches:null,
    goalsScored:null
  }
  
  typesOfPlayer=["Defender","Goal Keeper","Mid-Fielder","Forwarder"];

  teamArray:TeamClass;

  constructor(private actRoute:ActivatedRoute,private _teamService:TeamdataService,private router:Router) { }

  showLoading:boolean=true;
  showTeamName:string;
  shownAdmin:string;

  ngOnInit(): void {
    this.showLoading=true;
    this.showTeamName=localStorage.getItem('author');
    this.shownAdmin=localStorage.getItem('admin');
    this.actRoute.paramMap.subscribe((params: ParamMap) => {
      let id=params.get('id');
      this.teamId=id;
    });
    this.getMyTeam(this.teamId);
    this.getPlayers();
  }

  getMyTeam(id){

    if(this.isAdmin()){
      this._teamService.getAdminTeams().subscribe((data) => {
        for(let team of data){
          if(team.id.localeCompare(id)==0){
            this.showTeamName=team.name;
            break;
          }
        }
      });
    }
  }

  isAdmin(){
    if("Admin".localeCompare(this.shownAdmin)==0) return true;
    else return false;
  }
  
  getPlayers(){

    if(this.isAdmin()){
      this._teamService.adminGetPlayers(this.teamId).subscribe((data) => {
          console.log(data);
          this.playerArray = data;
          this.dataSource = new MatTableDataSource<PlayerClass>(this.playerArray);
          this.dataSource.paginator = this.paginator;    
          this.showLoading=false;
        });  
    }else{
    this._teamService.getPlayers().subscribe((data) => {
        this.playerArray = data;
        this.dataSource = new MatTableDataSource<PlayerClass>(this.playerArray);
        this.dataSource.paginator = this.paginator;    
        this.showLoading=false;
      });
    }

  }

  editPlayers(player){
    this.playerDetail = Object.assign({},player);
  }
  
  deletePlayer(id){
    
    if(this.isAdmin()){
      this._teamService.adminDeletePlayer(id).subscribe((data) => {alert(data.message); this.getPlayers(); });
    }else{
    this._teamService.deletePlayer(id).subscribe((data) => {alert(data.message); this.getPlayers(); });
    }
  
  }

  deleteAllPlayers(){
    
    if(this.isAdmin()){
      this._teamService.adminDeleteAllPlayers(this.teamId).subscribe((data) => {alert(data.message); this.getPlayers();});  
    }else{
    this._teamService.deleteAllPlayers().subscribe((data) => {alert(data.message); this.getPlayers();});
    }
  
  }

  createOrUpdatePlayer(form:NgForm,p:PlayerClass){
   
    if(p.id!=''){ 
      if(this.isAdmin()){
        this._teamService.adminUpdatePlayer(p).subscribe();
      }else{
      this._teamService.updatePlayer(p).subscribe();
      }
      alert("Player Details Updated");;
    }
    else if(this.dataSource.data.length<15){
        if(this.isAdmin()){
          this._teamService.adminAddPlayers(p,this.teamId).subscribe();
        }else{
          this._teamService.createPlayer(p).subscribe();
        }
        alert("Player Details Added");
    }
    else{
      alert("Maximum players in a team should be 15");
    }
    this.getPlayers();
    this.clear();
    form.resetForm();
  
  }
  
  clear(){
    this.playerDetail={
      id:'',
      inEleven:null,
      name:'',
      type:'',
      age:null,
      noOfMatches:null,
      goalsScored:null
    }
  }


  toHome(){
    this.router.navigate(['viewdetails']);
  }

}

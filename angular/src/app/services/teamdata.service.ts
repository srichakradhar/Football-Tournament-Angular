import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Team11Class } from '../models/Team11Class';
import { MapClass } from '../models/MapClass';

@Injectable({
  providedIn: 'root'
})
export class TeamdataService {

  errorMessage: string = '';

  constructor(private httpClient: HttpClient) { }

  //admin
  getAdminLogin(admin): Observable<any> {
    return this.httpClient.post<any>('/api/login', admin).pipe(catchError(this.errorHandler));
  }

  getAdminTeams(): Observable<any[]> {
    return this.httpClient.get<any[]>('/api/admin/teams/view')
      .pipe(map(teamsData => {
        if (teamsData) {
          return teamsData.map(teams => {
            return {
              name: teams.name,
              country: teams.country,
              coach: teams.coach,
              id: teams._id
            }
          })
        }
      }), catchError(this.errorHandler));
  }

  adminUpdateTeam(team, id): Observable<any> {
    return this.httpClient.patch<any>('/api/admin/teams/update/' + id, team).pipe(catchError(this.errorHandler));
  }

  adminDeleteTeam(id): Observable<any> {
    return this.httpClient.delete<any>('/api/admin/teams/delete/' + id).pipe(catchError(this.errorHandler));
  }

  adminGetPlayers(id): Observable<any[]> {
    return this.httpClient.get<any>('/api/admin/players/view/' + id)
      .pipe(map(playersData => {
        if (playersData) {
          return playersData.map(players => {
            return {
              name: players.name,
              type: players.type,
              age: players.age,
              inEleven: players.inEleven,
              noOfMatches: players.noOfMatches,
              goalsScored: players.goalsScored,
              id: players._id
            }
          })
        }
      }), catchError(this.errorHandler));
  }

  adminAddPlayers(player, id): Observable<any> {
    return this.httpClient.post<any>('/api/admin/players/register/' + id, player).pipe(catchError(this.errorHandler));
  }

  adminUpdatePlayer(player): Observable<any> {
    return this.httpClient.patch('/api/admin/players/update/' + player.id, player).pipe(catchError(this.errorHandler))
  }

  adminDeletePlayer(id): Observable<any> {
    return this.httpClient.delete<any>('/api/admin/players/delete/' + id).pipe(catchError(this.errorHandler));
  }

  adminDeleteAllPlayers(id): Observable<any> {
    return this.httpClient.delete<any>('/api/admin/players/deleteAll/' + id).pipe(catchError(this.errorHandler));
  }

  adminGetTeam11(id): Observable<any> {
    return this.httpClient.get<any>('/api/admin/teams/eleven/' + id)
      .pipe(map((playersData) => {
          return {
            message:playersData.message,
            team11s:playersData.team11s.map((players) =>  { return {
              name: players.name,
              type: players.type,
              age: players.age,
              inEleven: players.inEleven,
              noOfMatches: players.noOfMatches,
              goalsScored: players.goalsScored,
              id: players._id
            }})
          }           
      }), catchError(this.errorHandler));
  }

  //teams 
  getUserLogin(team): Observable<any> {
    return this.httpClient.post<any>('/api/teams/login', team).pipe(catchError(this.errorHandler));
  }

  getTeams(): Observable<any[]> {
    return this.httpClient.get<any[]>('/api/teams/view')
      .pipe(map(teamsData => {
        if (teamsData) {
          return teamsData.map(teams => {
            return {
              name: teams.name,
              country: teams.country,
              coach: teams.coach,
              id: teams._id
            }
          })
        }
      }), catchError(this.errorHandler));
  }

  createTeam(team): Observable<any> {
    return this.httpClient.post('/api/teams/registration', team).pipe(catchError(this.errorHandler))
  }

  deleteTeam(): Observable<any> {
    return this.httpClient.delete<any>('/api/teams/delete').pipe(catchError(this.errorHandler));
  }
  updateTeam(team): Observable<any> {
    return this.httpClient.patch<any>('/api/teams/update', team).pipe(catchError(this.errorHandler));
  }

  getTeam11(): Observable<any> {
    return this.httpClient.get<Team11Class>('/api/teams/eleven')
    .pipe(map((playersData) => {
      return {
        message:playersData.message,
        team11s:playersData.team11s.map((players) =>  { return {
          name: players.name,
          type: players.type,
          age: players.age,
          inEleven: players.inEleven,
          noOfMatches: players.noOfMatches,
          goalsScored: players.goalsScored,
          id: players._id
        }})
      }           
  }), catchError(this.errorHandler));
  }

  //players
  getPlayers(): Observable<any[]> {
    return this.httpClient.get<any[]>('/api/players/view')
      .pipe(map(playersData => {
        if (playersData) {
          return playersData.map(players => {
            return {
              name: players.name,
              type: players.type,
              age: players.age,
              inEleven: players.inEleven,
              noOfMatches: players.noOfMatches,
              goalsScored: players.goalsScored,
              id: players._id
            }
          })
        }
      }), catchError(this.errorHandler));
  }

  createPlayer(player): Observable<any> {
    return this.httpClient.post('/api/players/register', player).pipe(catchError(this.errorHandler))
  }

  updatePlayer(player): Observable<any> {
    return this.httpClient.patch('/api/players/update/' + player.id, player).pipe(catchError(this.errorHandler))
  }

  deletePlayer(id): Observable<any> {
    return this.httpClient.delete<any>('/api/players/delete/' + id).pipe(catchError(this.errorHandler));
  }

  deleteAllPlayers(): Observable<any> {
    return this.httpClient.delete<any>('/api/players/deleteAll').pipe(catchError(this.errorHandler));
  }

  //tournament maps

  getMaps(): Observable<any[]> {
    return this.httpClient.get<any[]>('/api/mapping/view')
      .pipe(map(mapsData => {
        if (mapsData) {
          return mapsData.map((maps) => {
            return {
              category: maps.category,
              name: maps.name,
              id: maps._id
            }
          })
        }
      }));
  }

  updateMapping(team: MapClass): Observable<any> {
    return this.httpClient.patch('/api/mapping/update/' + team.id, team).pipe(catchError(this.errorHandler))
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  }

  private errorHandler(error: HttpErrorResponse) {

    if (error.error) {
      this.errorMessage = 'Backend returned code ' + error.status + ' body was: ' + error.error;
      if (error.error.errmsg)
        alert(error.error.errmsg);
      else if (error.error.message)
        alert(error.error.message);
      else
        alert(this.errorMessage);
        console.error(error);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

}

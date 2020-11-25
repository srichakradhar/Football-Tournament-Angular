Football Tournament Management application developed in angular as front end and nodejs as backend

This web application is act as both admin and user side application

In every component, there is two functions `isBelongsTo` and `isAdmin`

`isBelongsTo` => There is one parameter, return type boolean
                 return [true] if authenticated user is corresponds to the name parameter else return [false]
				 use localStorage `author` value

`isAdmin` => There is no parameter, return type boolean
             return [true] if authenticated user is admin else return [false]
			 use localStorage `admin` value			 

The database have default data set = 1 Admin and 2 User

Admin Credentials
------------------
Username : Admin  
Password : Fresco@333

User Credentials
------------------
1. Username : Fast Footers
   Password : User1@333

2. Username : Fire Fighters
   Password : User2@333   

Forms used in the project are template driven

COMPONENTS
----------------------------------------------------------------------------

Admin-login - a page which contains login form for admin username and password to login
  //In local storage, set `isLoggedIn` as "true"
  //set `token` as generated JWT token from backend service
  //set `author` as name of admin from service
  //set `admin` as "Admin"	

[Form Fields]
1. User name(required) 
2. Password(required)

loader  - a loader will display while front end takes time to fetch data from backend

Login - a page which contains login form for football teams username and password to login
 //In local storage, set isLoggedIn as true
 //set author as name of team logged in 
 //set token as generated JWT token from backend service

[Form Fields]
1. User name(required) 
2. Password(required)

Mapping - a page which contains leaderboard for four teams or above as semi-final 1, semi-final 2, final and winner
          have options for selections and remove, admin only can able to select and remove teams in leaderboard.
[Map Data]
1. Name - name of the teams
2. Category - Team 1, Team 2, Team 3, Team 4, Semi-Final 1, Semi-Final 2, Final		  

Team 1 and Team 2 are teams playing in first semi-final match leaderboard
Team 3 and Team 4 are teams playing in second semi-final match leaderboard
Semi-Final 1 and Semi-Final 2 are teams playing in final match leaderboard
Final is a team in winner leader board

Navigation - a navbar which holds the title "Football Tournament Management"

Players - a page which contains player details options to edit and delete the player 
          and a form to create and edit the details, the form requires validations for each fields 
          (player name, type, age, number of matches and goals scored), the player details are displayed
          in table of angular material with pagination
          Maximum players in a team should be 15

[Form Fields]
1. Player name(required, minimum 3 characters, maximum 15 characters, alphabets only) 
2. Player type(required)		 
3. Player age (required, min 16 and max 35)
4. No. of matches played (required, min 0 and max 2000)
5. No. of goals scored (required, min 0 and max 1000)

Registration - a page which contains form to register the team details and the form requires validations 
               for each fields (team name, country name, coach name, password and confirm password)
			   
[Form Fields]
1. Team name(required, minimum 3 characters, maximum 15 characters) 
2. Country name(required, minimum 3 characters)		 
3. Coach name (required, minimum 3 characters, maximum 15 characters, alphabets only)
4. Password (required, password criteria[atleast 1 special character, atleast 1 lowercase letter, atleast 1    uppercase letter, minimum 8 characters, maximum 12 characters])
5. Confirm Password (required)[should match Password Field]			   

Team11 - a page which contains all players in a team for selecting them for team11 and removal from team11

Viewdetails - a page which contains team details(team name, country name and coach name) and 
              option for edit and delete the team details and have  links to players, team11 and 
              mapping components

GUARDS
----------------------------------------------------------------------------

AuthGuard - a route guard which guarding routes whether we can visit a route or not

SERVICES
----------------------------------------------------------------------------

TeamdataService - provides httpclient to connect with backend database for both admin and teams to get
                  the response from backend.

/api = > http://localhost:8001/ = > It connects to the backend node.js server,
                                    the port is specified in proxy.config.json,
                                    the angular app is running on the port 8000
                  
API for Admin   - /api/login                      =>  "POST"   => to login for admin with username and password 
                                                                  (no authentication required)
                                                                  response as admin details and a token genreated 
                                                                  from backend which has been stored in local storage
                                                                  if credentials is wrong, then response is 
                                                                  "Username or password is wrong"
                                                                    
                  /api/admin/teams/view           =>  "GET"    => to get team details  
                  
                  /api/admin/teams/update/:id     =>  "PATCH"  => to update the team details
                  
                  /api/admin/players/view/:id     =>  "GET"    => to get the player details 
                  
                  /api/admin/players/register/:id =>  "POST"   => to add the player details
                  
                  /api/admin/players/update/:id   =>  "PATCH"  => to update the player details 
                  
                  /api/admin/players/delete/:id   =>  "DELETE" => to delete a player 
                  
                  /api/admin/teams/deleteAll/:id  =>  "DELETE" => to delete all players in a team 
                  
                  /api/admin/teams/eleven/:id     =>  "GET"    => to get team 11 players
                  
                  /api/mapping/update/            =>  "PATCH"  => to update the team leader board

API for teams   - /api/teams/registration         =>  "POST"   => to add the team details 
                                                                  (no authentication required)                                                            
                  /api/teams/login                =>  "POST"   => to login for teams with username and password
                                                                  response as team details and a token genreated 
                                                                  from backend which has been stored in local storage
                                                                  if credentials is wrong, then response is 
                                                                  "Username or password is wrong"

                  /api/teams/view                 =>  "GET"    => to get team details  
                  
                  /api/teams/delete               =>  "DELETE" => to delete the team 
                  
                  /api/teams/update               =>  "PATCH"  => to update the team details
                  
                  /api/teams/eleven               =>  "GET"    => to get the team 11 players
                  
                  /api/players/view               =>  "GET"    => to get the player details
                  
                  /api/players/register           =>  "POST"   => to add player details 
                  
                  /api/players/update/:id         =>  "PATCH"  => to update the player details
                  
                  /api/players/delete/:id         =>  "DELETE" => to delete the player
                  
                  /api/players/deleteAll          =>  "DELETE" => to delete all players in a team


API for 
both Admin and 
teams            - /api/mapping/view              =>  "GET"    => to get the leaderboard details
                   
logout  => logout function removes the item from local storage

#AppRoutingModule => It specifies the path to route other components

#AngularMaterailModule => It imports the needed angular material package for table used in player component

#The football image is in assets folder to display it login pages

models
---------------------------------------------------------------------------

The classes available in the model folder is to identify the fields of backend data

MapClass = fields for Tournament leaderboard details

PlayerClass = fields for player details

Team11Class = fields for team 11 players details

TeamClass = fields for team details

user = fields for credentials to login

TESTS
----------------------------------------------------------------------------

The test files are specified as *.spec.ts which contains test cases for each Components ,TeamDataService and AuthGuard

COMMANDS TO RUN THE APPLICATION
----------------------------------------------------------------------------

Install - npm install

Run - npm start

Test - npm test

# FootBallTournament

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0-rc.0.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:8000/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



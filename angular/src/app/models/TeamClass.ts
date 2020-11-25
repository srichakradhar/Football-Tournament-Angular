export class TeamClass {
  id: string;
  name: string;
  country: string;
  coach: string;
  password: string;

  constructor(name, country, coach) {
    this.name = name;
    this.country = country;
    this.coach = coach;

  }
}
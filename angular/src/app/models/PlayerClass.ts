export class PlayerClass {
  id: string;
  inEleven: boolean;
  name: string;
  type: string;
  age: number;
  noOfMatches;
  goalsScored;
  constructor(id, inEleven, name, type, age) {
    this.id = id;
    this.inEleven = inEleven;
    this.name = name;
    this.type = type;
    this.age = age;

  }
}
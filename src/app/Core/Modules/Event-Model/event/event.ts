export class Event {
  idEvent?: number;
  debutDate: Date|null;
  lastDate: Date|null;

  location: string;
  description: string|null;


  constructor(
    idEvent: number,
    debutDate: Date|null,
  lastDate: Date|null,
  location: string,
  description: string|null

  ) {
    this.idEvent = idEvent;
    this.debutDate = debutDate;
    this.lastDate = lastDate;
    this.location = location;
    this.description = description;

  }
}

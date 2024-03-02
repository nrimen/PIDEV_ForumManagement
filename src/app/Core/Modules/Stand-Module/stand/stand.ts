import { PackEnum } from './pack.enum';
export class Stand {
  idStand?: number;
  reservationDate: Date|null;
  pack: PackEnum;
  price: number;
  gallery: string[];
  reserved: boolean;
  finished: boolean;
  partner: boolean;
  immatriculationStand: string;
  userStand: string|null;
  rows?: { seats: any[] }[];

  constructor(
    idStand: number,
    reservationDate: Date|null,
    pack: PackEnum,
    price: number,
    gallery: string[],
    reserved: boolean,
    finished: boolean,
    partner: boolean,
    immatriculationStand: string,
    userStand: string|null
  ) {
    this.idStand = idStand;
    this.reservationDate = reservationDate;
    this.pack = pack;
    this.price = price;
    this.gallery = gallery;
    this.reserved = reserved;
    this.finished = finished;
    this.partner = partner;
    this.immatriculationStand = immatriculationStand;
    this.userStand = userStand;
  }
}

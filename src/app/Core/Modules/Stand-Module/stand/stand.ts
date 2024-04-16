import { PackEnum } from './pack.enum';
import {UserModuleModule} from "../../user-module/user-module.module";
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
  userStand: UserModuleModule|null;
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
    userStand: UserModuleModule|null
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

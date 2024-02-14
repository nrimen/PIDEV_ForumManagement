import { PackEnum } from './pack.enum';
export class Stand {
  idStand?: number;
  reservationDate: Date|null;
  pack: PackEnum;
  price: number;
  gallery: string[];
  isReserved: boolean;
  isFinished: boolean;
  isPartner: boolean;
  immatriculationStand: string;
  userStand: string|null;

  constructor(
    idStand: number,
    reservationDate: Date|null,
    pack: PackEnum,
    price: number,
    gallery: string[],
    isReserved: boolean,
    isFinished: boolean,
    isPartner: boolean,
    immatriculationStand: string,
    userStand: string|null
  ) {
    this.idStand = idStand;
    this.reservationDate = reservationDate;
    this.pack = pack;
    this.price = price;
    this.gallery = gallery;
    this.isReserved = isReserved;
    this.isFinished = isFinished;
    this.isPartner = isPartner;
    this.immatriculationStand = immatriculationStand;
    this.userStand = userStand;
  }
}

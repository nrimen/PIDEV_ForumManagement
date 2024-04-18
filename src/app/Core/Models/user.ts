import { Blog } from "./blog";

export interface User {
nickname: any;
    idUser: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
  inscriptionDate: Date;
  address: string;
  role: Role;
  immatriculationNumber: string;
  sectorOfActivity: SectorOfActivity;
  levelOfStudies: string;
  domainOfStudies: string;
  blogs: Blog[];
  propic:string;

  
}
export enum Role {
    
  }
  
  export enum SectorOfActivity {
  }
  

import { Blog } from "./blog";

export interface User {
    idUser: number;
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

  
}
export enum Role {
    
  }
  
  export enum SectorOfActivity {
  }
  

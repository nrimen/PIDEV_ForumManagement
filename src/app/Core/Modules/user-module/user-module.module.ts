
export interface UserModuleModule {
  idUser?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
  inscriptionDate: Date;
  address: string;
  role: Role;
  immatriculationNumber: string;
  sectorOfActivity : SectorOfActivity;
  levelOfStudies: string;
  domainOfStudies: string;

}
export enum Role {
  Exposant = 'Exposant' ,
  Student = 'Student' ,
  Admin = 'Admin',
  Supplier = 'Supplier',
  Alumny = 'Alumny',
  Professor = 'Professor'
}

export enum SectorOfActivity {
  IT='IT' ,
  Civil_Engineering = 'Civil_Engineering' ,
  Electromechanical ='Electromechanical',
  Bussiness = 'Bussiness'
}


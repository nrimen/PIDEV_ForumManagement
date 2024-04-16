export interface FavOffersModule {
    idOffer?: number;
    offerTitle: string;
    postingDate: Date;
    closingDate: Date;
    location: string;
    employementType: EmployementType;
    offerStatus: string;
    offerDescription: string;
}
export enum EmployementType {
    FullTimeJob = 'fulltimejob',
    PartTimeJob = 'parttimejob',
    Internship = 'internship'
}


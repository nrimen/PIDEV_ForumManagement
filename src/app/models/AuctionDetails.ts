import { Product } from "./Product";

export class AuctionDetails {
    id : number | undefined;
    product!: {
        name: string;
        category: string;
      };
    minPrice!: number;
    endDate!: Date;

    participantCount?: number = 0; // Corrected property name and initialized to 0
    auctionStatus?: string = 'Closed'; // Initialized to 'Closed'
    
  }
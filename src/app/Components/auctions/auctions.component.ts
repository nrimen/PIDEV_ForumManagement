import { Component } from '@angular/core';
import { AuctionService } from 'src/app/Services/Auction/auction.service';
import { AuctionDetails } from 'src/app/models/AuctionDetails';
import { Auction } from 'src/app/models/Auction'; // Adjust the import path as needed

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.css']
})
export class AuctionsComponent {
  auctions!: AuctionDetails[];
  router: any;
  userId?: number;
  auction!: AuctionDetails;

  constructor(private auctionService: AuctionService) {}

  ngOnInit() {
    this.auctionService.getAuctions().subscribe((auctions: AuctionDetails[]) => {
      this.auctions = auctions;
      console.log(auctions);
      console.log()
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    if(filterValue!=""){
      this.auctions = this.auctions.filter(item => item.product.name
        .toLowerCase().startsWith(filterValue
        .toLowerCase()));
    }
    if(filterValue=="") {
      this.ngOnInit();
    }
  }



   
  attemptToParticipate() {
    // Check if auction is defined and if participant count is less than 5
    if (this.auction.auctionStatus === 'ENDED' && (this.auction?.participantCount ?? 0) < 5) {
      if (this.userId) {
        // Safely increment participant count if defined
        if (this.auction?.participantCount !== undefined) {
          this.auction.participantCount++;
          
          // Check if the participant count has reached 5
          if (this.auction.participantCount === 5) {
            // Change auction status to ACTIVE
            this.auction.auctionStatus = 'ACTIVE';
            // Optionally, alert the user about the auction status change
            alert('The auction is now ACTIVE.');
          }
        }
        
        alert('You have successfully shown interest to participate in the auction.');
      } else {
        alert('Please log in to participate in the auction.');
      }
    } else {
      alert('The auction is either closed or already has enough participants.');
    }
  }



}
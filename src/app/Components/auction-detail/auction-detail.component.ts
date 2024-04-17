import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionService } from 'src/app/Services/Auction/auction.service';
import { AuctionDetails } from 'src/app/models/AuctionDetails';
import { Bid } from 'src/app/models/Bid';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ProfilComponent } from '../profil/profil.component';

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css']
})
export class AuctionDetailComponent {
  auctionId!: number;
  auction!: AuctionDetails;
  userId?: number;
  myForm!: FormGroup;
  currentPrice!: number;
  otpService: any;

  constructor(private route: ActivatedRoute, private auctionService: AuctionService, private router:Router) { }

  ngOnInit() {

    this.myForm = new FormGroup({
      price: new FormControl(null, Validators.required),
     });

    this.auctionId = Number(this.route.snapshot.paramMap.get('id'));

    const userId = localStorage.getItem('userId');
    this.userId = userId ? Number(userId) : undefined;

    this.auctionService.getAuction(this.auctionId).subscribe(auction => {
        console.log(auction);
        this.auction = auction;
    })

    forkJoin([this.auctionService.getAuction(this.auctionId), this.auctionService.getBids(this.auctionId)]).subscribe(result => {
      const auction = result[0];
      const bids = result[1];
      this.auction = auction;

      if (bids.length > 0) {
        this.currentPrice = Math.max(...bids.map(bid => bid.price))
      } else {
        this.currentPrice = this.auction.minPrice;
      }

    })

  }

  addBid(price: number) {
    console.log("userId", this.userId);
    if (this.userId) {
      const bid: Bid = {
        userId: this.userId,
        price: price
      }
      this.auctionService.addBid(this.auctionId, bid).subscribe({
        next: (id) => {
          console.log(id);
          // On successful bid addition, show success message
          alert("Bid placed successfully with ID: " + id);
          this.router.navigate(['/Auctions']);
        },
        error: (error) => {
          // Handle error response and display message accordingly
          console.error('Error when placing bid:', error);
          // Assuming the error response has a message field
          // Check the structure of your error response and adjust accordingly
          const errorMessage = error.error.message || "An error occurred while placing the bid.";
          alert(errorMessage);
        }
      });
    } else {
      // Handle case when userId is not set
      alert("You must be logged in to place a bid.");
    }
  }
  

  onSubmit() {
    console.log(this.myForm.value.price);
    this.addBid(this.myForm.value.price);
  }

  deleteAuction() {
    if(confirm("Are you sure you want to delete this auction?")) {
      this.auctionService.deleteAuction(this.auctionId).subscribe({
        next: () => {
          alert("Auction deleted successfully.");
          this.router.navigate(['/Auctions']); // Redirect to the auction list or another appropriate page
        },
        error: (error) => {
          console.error('Error deleting auction:', error);
          alert("An error occurred while deleting the auction.");
        }
      });
    }
  }


  sendOtp(): void {
    const otpRequest = {
      phoneNumber: "+21694887491",
      username: "21694887491"
    };
    this.otpService.sendOtp(otpRequest).subscribe({
      next: (response: any) => console.log(response),
      error: (error: any) => console.error(error)
    });
  }


  
 
  attemptToParticipate() {
    // Check if auction is defined and if participant count is less than 5
    if (this.auction.auctionStatus === 'ENDED' && (this.auction?.participantCount ?? 0) < 5) {
      if (this.userId) {
        // Safely increment participant count if defined
        if (this.auction?.participantCount !== undefined) {
          this.auction.participantCount++;
          
          // Check if the participant count has reached 5
          if (this.auction.participantCount === 2) {
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
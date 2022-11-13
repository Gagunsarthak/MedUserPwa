import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wid-star-rating',
  templateUrl: './app-star-rating.component.html',
  styleUrls: ['./app-star-rating.component.scss']
})
export class AppStarRatingComponent implements OnInit {

  @Input('rating')   rating: number = 3;
  @Input('starCount')   starCount: number = 5;
  @Input('color')   color: string = 'accent';
  @Output()   ratingUpdated = new EventEmitter();
 @Input() inputModeEnabled=false  // if set to true can be used to take input from the user for rating
    snackBarDuration: number = 2000;
    ratingArr :number[]= [];

  constructor(  private snackBar: MatSnackBar) {
  }


  ngOnInit() {
    console.log("a "+this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating:number) {
    if(!this.inputModeEnabled){
      return
    }
    console.log(rating)
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration
    });
    this.rating=rating
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';
import { IUserReviewTags } from 'src/routes/app-user-dashboard/Models/doctor.model';

@Component({
  selector: 'app-doc-feedback',
  templateUrl: './doc-feedback.component.html',
  styleUrls: ['./doc-feedback.component.scss']
})
export class DocFeedbackComponent implements OnInit {
 reviewCreateReq:IUserReviewTags={
  role:'review',
  reviewRating:0,
  reviewMessage: '',
  reviewDate:  new Date(),
  reviewlastEditedOn: new Date(),
  userId: '1',
  doctorId: '1',
  userName: 'SaiSarthakMohanty',
  isVerifiedUser: false,
 
  userScheduleId: '1234',
  accurateDiagnosisRating:0,
  friendlinessAndWaitTimeRating:0,
  bedsideMannerismRating:0,
  staffCourteousnessRating:0,
  patientEducationRating:0,
 
}
  constructor(private route:ActivatedRoute,private reviewServ:ReviewService,private _snackBar: MatSnackBar,private router:Router) {
    console.log("Feedback comp reached")
   }

  ngOnInit(): void {
       this.route.paramMap.subscribe(paramMap => {
       const id = paramMap.get('appointmentId')
      //Most of the fields of the request will be populated from the data we get from the scheduleId
      console.log("Paramap is ",id)
      // }
    })
  }
  onRatingChanged(rating:number,type:String){
    if(type==='accurateDiagnosisRating'){
      this.reviewCreateReq.accurateDiagnosisRating=rating
    }else if(type==='friendlinessAndWaitTimeRating'){
      this.reviewCreateReq.friendlinessAndWaitTimeRating=rating
    }else if(type==='bedsideMannerismRating'){
      this.reviewCreateReq.bedsideMannerismRating=rating
    }else if(type==='staffCourteousnessRating'){
      this.reviewCreateReq.staffCourteousnessRating=rating
    }else if(type==='patientEducationRating'){
      this.reviewCreateReq.patientEducationRating=rating
    }
    console.log("Rating provided is"+rating);
  //  this.rating = rating;
  }
  submitFeedBack(){
    console.log("Submit feedback called")
    this.reviewCreateReq.reviewRating=Math.max(this.reviewCreateReq.accurateDiagnosisRating,this.reviewCreateReq.bedsideMannerismRating,this.reviewCreateReq.friendlinessAndWaitTimeRating,this.reviewCreateReq.patientEducationRating,this.reviewCreateReq.staffCourteousnessRating)
this.reviewServ.createReview(this.reviewCreateReq).subscribe((data)=>{console.log("Data is ",data)
this._snackBar.open('Review Created Successfully', '', {
  duration: 3000
});
this.router.navigate(['home'])
},(err)=>{   this._snackBar.open('Error! Please try again', '', {
  duration: 3000
});})
  }
}

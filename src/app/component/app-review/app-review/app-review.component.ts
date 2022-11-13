import { E } from '@angular/cdk/keycodes';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TFetchStatus } from 'src/app/constants/misc.constant';
import { ConfigService } from 'src/app/services/config.service';
import { IReviewRequest, IReviewTags, IUserReviewTags } from 'src/routes/app-user-dashboard/Models/doctor.model';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-app-review',
  templateUrl: './app-review.component.html',
  styleUrls: ['./app-review.component.scss']
})
export class AppReviewComponent implements OnInit {
  @Input() userId='1'
   req:IReviewRequest={
    role:"review", 
    pageSize: 2,
    pageNo:0,
    doctorId:this.userId,
    sort:{}
 }
 overAllRating=0
 hits=0
 avgPatientEducationRating=0
 avgStaffCourteousnessRating=0
 avgFriendlinessAndWaitTimeRating=0
 isMobileOrTabView: boolean=false;
sortFieldActive:String='Published Date'
orderTypeActive:String='desc'
 timelineFetchStatus: TFetchStatus = 'none'
 reviewFetched:IUserReviewTags[]=[]
 sortList=["Rating","Published Date", "Edited Date"]
 orderList=['Ascending','Descending']
  avgBedsideMannerismRating=0;
  constructor(private revServ:ReviewService, private configSvc:ConfigService,private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.configSvc.isLtMedium$.subscribe((event)=>{this.isMobileOrTabView=event})
    this.req.doctorId=this.userId
this.fetchReviews('firstCall')
  }


  fetchReviews(callType:String){
    if(this.userId.length>0){
      if (callType== "firstCall"){
        this.req.pageNo=0
      }else if(callType=="subsequentCall"){
        this.req.pageNo+=1
      }
      this.revServ.fetchHashTags(this.req).subscribe((data)=>{
        if(callType==='firstCall'){
          this.reviewFetched=data.results
        }else if(callType=="subsequentCall"){
          this.reviewFetched=[...this.reviewFetched, ...data.results]
        }
        this.hits=data.hits
        this.overAllRating=data.avgReviewRating
        this.avgBedsideMannerismRating=data.avgBedsideMannerismRating
        this.avgFriendlinessAndWaitTimeRating=data.avgFriendlinessAndWaitTimeRating
        this.avgPatientEducationRating=data.avgPatientEducationRating
        this.avgStaffCourteousnessRating=data.avgStaffCourteousnessRating




        if (data.hits > this.reviewFetched.length) {

          this.timelineFetchStatus = 'hasMore'
        } else {
          this.timelineFetchStatus = 'done'
        }
      //  else {
      //   this.timelineFetchStatus = 'none'
      // }
      console.log("Review fetched",this.reviewFetched)
      },(err)=>{
        this.timelineFetchStatus='error'
         this._snackBar.open("Error! Please try again", '', {
          duration: 3000
        });
        console.log("MATICOJN BAR")})
    }
  }
  sortData(param:String){
    delete this.req.sort
    this.req.sort={}
    if(param=='Rating'){
      this.req.sort.reviewRating='desc'
    }else  if(param=='Published Date'){
      this.req.sort.reviewDate='desc'
    }else  if(param=='Edited Date'){
      this.req.sort.reviewlastEditedOn='desc'
    }
    this.sortFieldActive=param
    this.orderTypeActive='desc'
   this.fetchReviews('firstCall')

  }
  changeOrder(){
    if(this.req.sort){
      if(this.sortFieldActive=='Rating'){
        if(this.req.sort.reviewRating=='desc'){
          this.req.sort.reviewRating='asc'
          this.orderTypeActive='asc'
        }else{
          this.req.sort.reviewRating='desc'
          this.orderTypeActive='desc'
        }
      }else  if(this.sortFieldActive=='Published Date'){
       
          if(this.req.sort.reviewDate=='desc'){
            this.req.sort.reviewDate='asc'
            this.orderTypeActive='asc'
          }else{
            this.req.sort.reviewDate='desc'
            this.orderTypeActive='desc'
          }
        
      }else  if(this.sortFieldActive=='Edited Date'){
        if(this.req.sort.reviewlastEditedOn==='desc'){
          if(this.req.sort.reviewlastEditedOn=='desc'){
            this.req.sort.reviewlastEditedOn='asc'
            this.orderTypeActive='asc'
          }else{
            this.req.sort.reviewlastEditedOn='desc'
            this.orderTypeActive='desc'
          }
        }
      }
    }
   

    this.fetchReviews('firstCall')
  }
}

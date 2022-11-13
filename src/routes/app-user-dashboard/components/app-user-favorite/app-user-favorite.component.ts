import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TFetchStatus } from 'src/app/constants/misc.constant';
import { SignupService } from 'src/routes/app-signup/services/signup.service';
import { UserDashboardService } from '../../Services/user-dashboard.service';

@Component({
  selector: 'app-app-user-favorite',
  templateUrl: './app-user-favorite.component.html',
  styleUrls: ['./app-user-favorite.component.scss']
})
export class AppUserFavoriteComponent implements OnInit {
  favoriteList: any;
  hits=0
  timelineFetchStatus: TFetchStatus = 'none'
  constructor(private userDashServ:UserDashboardService, private signupServ:SignupService) { }
favoritesID:any=[]
  ngOnInit(): void {
this.fetchFavoriteId('firstCall')
  }


  fetchFavoriteId(callType:String){
    const req={
      
    id: this.signupServ.id|| 5,

    role: "user",

    fields: "favouriteDoctor",

    size: 5,

    page: 1,

    sort:"asc"

    }
    if(callType== 'firstCall'){
      req.page=1
    }else if(callType== 'subsequentCall'){
      req.page+=1
    }
    this.userDashServ.fetchFavorites(req).subscribe((data)=>{
      console.log("data is ",data.result)
console.log("fav id is ", this.favoritesID)
if(callType== 'firstCall'){
  this.favoritesID=data.result[0].map((e:any)=>{return e.doctorId})

}else if(callType== 'subsequentCall'){
  this.favoritesID=[...this.favoritesID,...data.result[0].map((e:any)=>{return e.doctorId})]

}
if (data.hits > this.favoritesID.length) {

  this.timelineFetchStatus = 'hasMore'
} else {
  this.timelineFetchStatus = 'done'
}
this.fetchDetailFavorite()
    },(err)=>{
      console.log("Error in fetching favorites Id")
    })
  }

  fetchDetailFavorite(){
    const req={
      "id":this.favoritesID,
  
      "role":"doctor",
  
     "fields":["address",
      "averageRating",
      "city",
      "designation",
      "profImageUrl",
      "noOfReviews",
      "yearsOfExperience",
      "reviewTags",
      "associatedClinics",
      "name"]
    }
    this.signupServ.fetchUserDetails(req).subscribe((data)=>{
      console.log("Data detailed is ",data)
      this.favoriteList=data.results
    },(err)=>{
      console.log("There was some error inm getting detailed data",err)
    })

  }
}

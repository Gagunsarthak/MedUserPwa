import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogDeleteComponent } from 'src/app/component/dialog-delete/dialog-delete.component';
import { DialogComponent } from 'src/app/component/dialog/dialog.component';
import { TFetchStatus } from 'src/app/constants/misc.constant';
import { ConfigService } from 'src/app/services/config.service';
import { IDocProfEditReq } from 'src/routes/app-user-dashboard/Models/doctor.model';
import { DoctorService } from 'src/routes/app-user-dashboard/Services/doctor.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-details-edit',
  templateUrl: './profile-details-edit.component.html',
  styleUrls: ['./profile-details-edit.component.scss']
})
export class ProfileDetailsEditComponent implements OnInit {
activeField:String=''
  userId: string;
  timelineFetchStatus: TFetchStatus = 'none'
  dataReceived:any
  isMobileOrTabView: boolean=false;
  indexOfObjectUnderFocus:any=''

  @ViewChild('dialogTemplate', { static: true }) dialogTemplate: TemplateRef<any>;
  constructor(   private configSvc:ConfigService,
    private activated:ActivatedRoute , 
    private docSvc:DoctorService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private ProfileSvc:ProfileService,
     private router:Router,) { }

  ngOnInit(): void {
    this.configSvc.isLtMedium$.subscribe((event)=>{this.isMobileOrTabView=event})
    this.activated.queryParamMap.subscribe(queryMap => {
      if (queryMap.has('field')) {
        this.activeField=queryMap.get('field')||''
  }
  if (queryMap.has('id')) {
    this.userId=queryMap.get('id')||''
}

})
this.timelineFetchStatus='fetching'
  this.docSvc.fetchProfileData(this.userId,"doctor",[this.activeField]).subscribe(data=>{
    // if(this.activeField=='languages'){
    //   this.dataReceived=data.fields.languages
    // }else  if(this.activeField=='experience'){
    //   this.dataReceived=data.fields.experience
    // }else  if(this.activeField=='specialization'){
    //   this.dataReceived=data.fields.specialization
    // }
    // else  if(this.activeField=='awardsAndPublications'){
    //   this.dataReceived=data.fields.awardsAndPublications
    // }else  if(this.activeField=='education'){
    //   this.dataReceived=data.fields.education
    // }
    this.dataReceived=data.results
       console.log("Data  is ",this.dataReceived)
     this.timelineFetchStatus='done'
   },(err)=>{console.log("error",err)
  this.timelineFetchStatus='error'
  })
    


}

openDialog(attr:String,task:String,obj?:any,config?: MatDialogConfig) {
  if(this.isMobileOrTabView){
    config={
      // height: '60%',
      width: '90%',
      maxWidth: '100vw',
        maxHeight: '100vh',
      //  height: '100%',
       // width: '100%',
        panelClass: 'full-screen-modal',
        data       : {field:attr,data:obj}
        
      ,
  }
  }else{
    config={
      // height: '60%',
      width: '60%',
     // maxWidth: '100vw',
        maxHeight: '100vh',
      //  height: '100%',
       // width: '100%',
        //panelClass: 'full-screen-modal'
        data       : {field:attr,data:obj}
  }
  }

if(attr==='language'){
  this.activeField='Language'
 
}else if(attr==='specialization'){
  this.activeField='Specialization'
}else if(attr==='education'){
  this.activeField='Education'
}else if(attr==='experience'){
  this.activeField='Experience'
}else if(attr==='awards'){
  this.activeField='AwardsPublications'
}
this.router.navigate([], {
  queryParams: {
    type: this.activeField
  },
  queryParamsHandling: 'merge',
});
    const dialogRef = this.dialog.open(DialogComponent,config);
  
 
  dialogRef.afterClosed().subscribe(result => {
  console.log("Dialog result:",result);
  if(!result.event){
    return
  }
    var changeProfileDetailsReq:IDocProfEditReq={
  id:[this.userId||''],
  role: 'doctor'
    }
    if(result.event=='AwardsPublications'){
      console.log("Res from dialog",result.data.value)
      changeProfileDetailsReq.awardsAndPublications=[...this.dataReceived.awardsAndPublications,result.data.value]
    }
    if(result.event=='Experience'){
      console.log("Res from dialog",result.data.value)
      if(task=='edit'){
        this.dataReceived.experience[this.indexOfObjectUnderFocus]=result.data.value
        // console.log("changed data received is ",this.dataReceived.awardsAndPublications)
          changeProfileDetailsReq.experience=this.dataReceived.experience
      }else{
        console.log("Adding exp")
        // changeProfileDetailsReq.experience=[...this.profRes.experience,result.data.value]
        changeProfileDetailsReq.experience=[result.data.value,...this.dataReceived.experience]
      //  this.dataReceived.experience[this.indexOfObjectUnderFocus]=result.data.value
        // console.log("changed data received is ",this.dataReceived.awardsAndPublications)
         // changeProfileDetailsReq.experience=this.dataReceived.experience
      }
   
    }
    if(result.event=='Education'){
      console.log("Res from dialog",result.data.value)
      changeProfileDetailsReq.education=[result.data.value,...this.dataReceived.education  ]
      if(task=='edit'){
        this.dataReceived.education[this.indexOfObjectUnderFocus]=result.data.value
        // console.log("changed data received is ",this.dataReceived.awardsAndPublications)
          changeProfileDetailsReq.education=this.dataReceived.education
      }else{
        console.log("Adding exp")
        // changeProfileDetailsReq.experience=[...this.profRes.experience,result.data.value]
        changeProfileDetailsReq.education=[result.data.value,...this.dataReceived.education]
      //  this.dataReceived.experience[this.indexOfObjectUnderFocus]=result.data.value
        // console.log("changed data received is ",this.dataReceived.awardsAndPublications)
         // changeProfileDetailsReq.experience=this.dataReceived.experience
      }
    }
    if(result.event=='Language'){
      console.log("Res from dialog",result.data.value.language)
      changeProfileDetailsReq.languages=[...this.dataReceived.languages,...result.data.value.language]
    }
    if(result.event=='Specialization'){
      console.log("Res from dialog",result.data.value)
      changeProfileDetailsReq.specialization=[...result.data.value.specialization,...this.dataReceived.specialization]
     // changeProfileDetailsReq.specialization=[...this.dataReceived.specialization,result.data.value]
    }
    if(result.event=='awardsAndPublications'){
      // console.log("Index is ",this.indexOfObjectUnderFocus)
      // console.log("prev data received is ",this.dataReceived.awardsAndPublications)
      // console.log("Res from dialog",result.data.value)
// this.dataReceived.awardsAndPublications.splice(this.indexOfObjectUnderFocus,1)
    //  this.dataReceived.awardsAndPublications.forEach((a)=>{if(a.)})
    this.dataReceived.awardsAndPublications[this.indexOfObjectUnderFocus]=result.data.value
    // console.log("changed data received is ",this.dataReceived.awardsAndPublications)
      changeProfileDetailsReq.awardsAndPublications=this.dataReceived.awardsAndPublications
     // changeProfileDetailsReq.specialization=[...this.dataReceived.specialization,result.data.value]
    }
    
    console.log("The final update req is ",changeProfileDetailsReq)
    this.ProfileSvc.updateProfileExperienceDetails(changeProfileDetailsReq).subscribe(()=>{
    
      let field=result.event
      console.log("Data updated successfully",field)
      if(!field){
        return
      }
      if(changeProfileDetailsReq.awardsAndPublications){
        this.dataReceived.awardsAndPublications=changeProfileDetailsReq.awardsAndPublications
  
       }else if(changeProfileDetailsReq.experience){
        this.dataReceived.experience=changeProfileDetailsReq.experience
       }else if(changeProfileDetailsReq.education){
        this.dataReceived.education=changeProfileDetailsReq.education
       }else if(changeProfileDetailsReq.languages){
        this.dataReceived.languages=changeProfileDetailsReq.languages
       }else if(changeProfileDetailsReq.specialization){
        this.dataReceived.specialization=changeProfileDetailsReq.specialization
       }
     
       this._snackBar.open('Data Updated Successfully', '', {
        duration: 3000
      });
    
    },()=>{
   //   console.log("Error in updating")
      this._snackBar.open("Error! Please try again", '', {
        duration: 3000
      });
    })
  });
}

editField(field:String,obj:any,index:any){
console.log("Field is "+field+" obj is ",obj)
this.indexOfObjectUnderFocus=index
this.openDialog(field,'edit',obj)
}
deleteItem(field:String,obj:any,index:any){
  console.log("Field is "+field+" obj is ",obj)
  this.indexOfObjectUnderFocus=index
  this.openDeleteDialog(field)
 // this.openDialog(field,'edit',obj)
  }
openDeleteDialog(attr:String){
  console.log("User Id si ")
  var changeProfileDetailsReq:IDocProfEditReq={
    id:[this.userId],
    role: 'doctor'
      }
  const dialogRef = this.dialog.open(DialogDeleteComponent);
  dialogRef.afterClosed().subscribe(value => {
    console.log("Dialog sent:",value); 
    if(!value){
      return
    }
    if(value.event=='delete'){
   
      if(attr==='language'){
       // this.activeField='Language'
        changeProfileDetailsReq.languages=this.dataReceived.languages.splice(this.indexOfObjectUnderFocus,1)
      }else if(attr==='specialization'){
        this.activeField='Specialization'
        
      }else if(attr==='education'){
       // this.activeField='Education'
       this.dataReceived.education.splice(this.indexOfObjectUnderFocus,1)
      changeProfileDetailsReq.education=this.dataReceived.education
      //  changeProfileDetailsReq.education=this.dataReceived.education.splice(this.indexOfObjectUnderFocus,1)

      }else if(attr==='experience'){
      //  this.activeField='Experience'
      console.log("Index under focus is ",this.indexOfObjectUnderFocus)
      this.dataReceived.experience.splice(this.indexOfObjectUnderFocus,1)
      changeProfileDetailsReq.experience=this.dataReceived.experience

      }else if(attr==='awards'){
        this.dataReceived.awardsAndPublications.splice(this.indexOfObjectUnderFocus,1)
        changeProfileDetailsReq.awardsAndPublications=this.dataReceived.awardsAndPublications
      }
     // this.dataReceived.experience[this.indexOfObjectUnderFocus]=result.data.value
        // console.log("changed data received is ",this.dataReceived.awardsAndPublications)
        //  changeProfileDetailsReq.experience=this.dataReceived.experience
    }

    this.ProfileSvc.updateProfileExperienceDetails(changeProfileDetailsReq).subscribe(()=>{
    
     
     
     
       this._snackBar.open('Item deleted Successfully', '', {
        duration: 3000
      });
    
    },()=>{
   //   console.log("Error in updating")
      this._snackBar.open("Error! Please try again", '', {
        duration: 3000
      });
    })
  });
}
}

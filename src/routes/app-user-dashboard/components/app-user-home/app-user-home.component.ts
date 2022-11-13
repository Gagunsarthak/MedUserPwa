import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChartConfiguration } from 'chart.js';
import { DialogGraphLineComponent } from 'src/app/component/dialog-graph-line/dialog-graph-line.component';
import { SignupService } from 'src/routes/app-signup/services/signup.service';
import { UserDashboardService } from '../../Services/user-dashboard.service';
import { DialogGraphBarComponent } from 'src/app/component/dialog-graph-bar/dialog-graph-bar.component';
import { DialogAddMedDetailComponent } from 'src/app/component/dialog-add-med-detail/dialog-add-med-detail.component';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface AppointmentElement {
  Doctor:string,
  AptDate: string;
  report:string,

  followUp: string;
  status: string,
  
  Amount: number;
}
export interface MedicalDetailElement {
  bmi:string,
  weight: string;
  heartRate:string,

  fbcStatus: string;
  date: Date,
  
 // Amount: number;
}

const ELEMENT_DATA: AppointmentElement[] = [
  {Doctor: "Sai", AptDate: 'Hydrogen',report:'doc', followUp: 'H',status:'done', Amount: 1.0079,},
  {Doctor: "Sarthak", AptDate: 'Helium',report:'doc', followUp: 'He',status:'done', Amount: 4.0026,},
  {Doctor: "Ayush", AptDate: 'Lithium',report:'doc',followUp: 'Li',status:'done', Amount: 6.941, },
  {Doctor: "Nitish", AptDate: 'Beryllium',report:'doc', followUp: 'Be',status:'done', Amount: 9.0122,},
  {Doctor: "Akash", AptDate: 'Boron',report:'doc', followUp: 'B',status:'done', Amount: 10.811,},
  {Doctor: "Sachin", AptDate: 'Carbon',report:'doc', followUp: 'C',status:'done', Amount: 12.0107},
  {Doctor: "Samuel", AptDate: 'Nitrogen',report:'doc', followUp: 'N',status:'done', Amount: 14.0067},
  {Doctor: "Ram", AptDate: 'Oxygen',report:'doc', followUp: 'O',status:'done', Amount: 15.9994},
  {Doctor: "Shyam", AptDate: 'Fluorine',report:'doc', followUp: 'F',status:'done', Amount: 18.9984},
  {Doctor: "Parshuram ", AptDate: 'Neon',report:'doc', followUp: 'Ne',status:'done', Amount: 20.1797},
];
@Component({
  selector: 'app-app-user-home',
  templateUrl: './app-user-home.component.html',
  styleUrls: ['./app-user-home.component.scss']
})


export class AppUserHomeComponent implements OnInit {
  displayedColumns: string[] = ['Doctor', 'AptDate', 'Report', 'Follow Up','Status','Amount'];
  displayedMedDetailColumns: string[] = ['BMI', 'Weight', 'heartRate', 'fbcStatus','date'];
 ELEMENT_MED_DATA:MedicalDetailElement[]=[]
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataMedDetailSource :any
  isMobileScreen=false
  constructor(  private _snackBar: MatSnackBar, private signUpServ:SignupService, public dialog: MatDialog,private configSvc:ConfigService,private signUpserv:SignupService, private UserDashboardSvc:UserDashboardService) { }

  ngOnInit(): void {
    this.configSvc.isXSmall$.subscribe((event)=>{this.isMobileScreen=event})
  this.fetchMedicalDetails()

  }
  fetchMedicalDetails(){
    const req={
      "id":[this.signUpServ.userId||1],
  
      "role":"user",
  
     "fields":["medicalDetails"]
    }
    this.signUpServ.fetchUserDetails(req).subscribe((data)=>{
console.log("Medical details fetched is ",data.results[0].medicalDetails)
this.ELEMENT_MED_DATA=data.results[0].medicalDetails
this.dataMedDetailSource= new MatTableDataSource(this.ELEMENT_MED_DATA);
},(err)=>{

    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openLineDialog(config?: MatDialogConfig) {
  
    if(this.isMobileScreen){
      config={
        width: '90%',
      maxWidth: '100vw',
      //  maxHeight: '100vh',
      //  height: '100%',
       // width: '100%',
        panelClass: 'full-screen-modal',
        data:{}
    }
    }else{
      config={
        // height: '60%',
      //   width: '60%',
      //  // maxWidth: '100vw',
      //     maxHeight: '100vh',
          data:{}
        //  height: '100%',
         // width: '100%',
          //panelClass: 'full-screen-modal'
    }
    }
//fetching medical details from the api
const BmiReq={
 
    id: this.signUpserv.id ||1,
    role : "user",
    fields: "bmi",
       
    size: 7

}
let lineChartData: ChartConfiguration<'line'>['data'] = {
  labels: [
    // 'January',
    // 'February',
    // 'March',
    // 'April',
    // 'May',
    // 'June',
    // 'July'
  ],
  datasets: [
    {
      data: [  ],
      label: 'BMI',
      fill: true,
      tension: 0.5,
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)'
    }
  ]
};
this.UserDashboardSvc.fetchMedVitalDetails(BmiReq).subscribe((data)=>{
console.log("BMI data is ",data)
data.forEach((element:  any) => {
  console.log("Elem is ",element)
  console.log("The date is ",new Date(element.date))
  // above here the conversion of date format has to take place
  lineChartData.labels?.push(element.date.toString().substring(0,4))
  lineChartData.datasets[0].data.push(element.data)
});
  console.log("linecghart data is ",lineChartData)
  if(config)
  config.data=lineChartData
  const dialogRef = this.dialog.open(DialogGraphLineComponent,config);
  dialogRef.afterClosed().subscribe(result => {
 
      
  },()=>{
 

})



},(err)=>{

})

 
}

openHeartRateLineDialog(config?: MatDialogConfig) {
  
  if(this.isMobileScreen){
    config={
      width: '90%',
      maxWidth: '100vw',
      //  maxHeight: '100vh',
      //  height: '100%',
       // width: '100%',
        panelClass: 'full-screen-modal',
        data:{}
  }
  }else{
    config={
      // height: '60%',
    //   width: '60%',
    //  // maxWidth: '100vw',
    //     maxHeight: '100vh',
        data:{}
      //  height: '100%',
       // width: '100%',
        //panelClass: 'full-screen-modal'
  }
  }
//fetching medical details from the api
const heartReq={

  id: this.signUpserv.id ||1,
  role : "user",
  fields: "heartRate",
     
  size: 7

}
let lineChartData: ChartConfiguration<'line'>['data'] = {
labels: [
0
  // 'January',
  // 'February',
  // 'March',
  // 'April',
  // 'May',
  // 'June',
  // 'July'
],
datasets: [
  {
    data: [0  ],
    label: 'Heart Rate',
    fill: true,
    tension: 0,
    borderColor: 'black',
    backgroundColor: '#18e4c4'
  }
]
};
this.UserDashboardSvc.fetchMedVitalDetails(heartReq).subscribe((data)=>{
console.log("BMI data is ",data)
data.forEach((element:  any) => {
console.log("Elem is ",element)
console.log("The date is ",new Date(element.date))
// above here the conversion of date format has to take place
lineChartData.labels?.push(element.date.toString().substring(0,4))
lineChartData.datasets[0].data.push(element.data)
})
console.log("linecghart data is ",lineChartData)
if(config)
config.data=lineChartData
const dialogRef = this.dialog.open(DialogGraphLineComponent,config);
dialogRef.afterClosed().subscribe(result => {

    
},()=>{


})

;

},(err)=>{
  console.log("Error in retrieving data ",err)

})


}
openFBCBarDialog(config?: MatDialogConfig) {
  
  if(this.isMobileScreen){
    config={
    //  height: '60%',
      width: '90%',
      maxWidth: '100vw',
      //  maxHeight: '100vh',
      //  height: '100%',
       // width: '100%',
        panelClass: 'full-screen-modal',
        data:{}
  }
  }else{
    config={
    //    height: '60%',
    //   width: '60%',
    // //  // maxWidth: '100vw',
    //     maxHeight: '200vh',
    //     maxWidth: '200vw',
    //     panelClass: 'full-screen-modal',
        data:{}
      //  height: '100%',
       // width: '100%',
       
  }
  }
//fetching medical details from the api
const fbcReq={

  id: this.signUpserv.id ||1,
  role : "user",
  fields: "fbcStatus",
     
  size: 7

}
let barChartData: ChartConfiguration<'bar'>['data'] = {
  labels: [  ],
  datasets: [
    { data: [  ], label: 'FBC Status' },
    // { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
  ]
};
this.UserDashboardSvc.fetchMedVitalDetails(fbcReq).subscribe((data)=>{
console.log("BMI data is ",data)
data.forEach((element:  any) => {
console.log("Elem is ",element)
console.log("The date is ",new Date(element.date))
// above here the conversion of date format has to take place
barChartData.labels?.push(element.date.toString().substring(0,4))
barChartData.datasets[0].data.push(element.data)
})
console.log("linecghart data is ",barChartData)
if(config)
config.data=barChartData
const dialogRef = this.dialog.open(DialogGraphBarComponent,config);
dialogRef.afterClosed().subscribe(result => {

    
},()=>{


})

;

},(err)=>{
  console.log("Error in retrieving data ",err)

})


}

openWeightlineDialog(config?: MatDialogConfig) {
  
  if(this.isMobileScreen){
    config={
      width: '90%',
      maxWidth: '100vw',
      //  maxHeight: '100vh',
      //  height: '100%',
       // width: '100%',
        panelClass: 'full-screen-modal',
        data:{}
  }
  }else{
    config={
      // height: '60%',
    //   width: '60%',
    //  // maxWidth: '100vw',
    //     maxHeight: '100vh',
        data:{}
      //  height: '100%',
       // width: '100%',
        //panelClass: 'full-screen-modal'
  }
  }
//fetching medical details from the api
const weightReq={

  id: this.signUpserv.id ||1,
  role : "user",
  fields: "weight",
     
  size: 7

}
let lineChartData: ChartConfiguration<'line'>['data'] = {
labels: [
  // 'January',
  // 'February',
  // 'March',
  // 'April',
  // 'May',
  // 'June',
  // 'July'
],
datasets: [
  {
    data: [  ],
    label: 'Weight',
    fill: true,
    tension: 0,
    borderColor: 'black',
    backgroundColor: '#34c3eb'
  }
]
};
this.UserDashboardSvc.fetchMedVitalDetails(weightReq).subscribe((data)=>{
console.log("BMI data is ",data)
data.forEach((element:  any) => {
console.log("Elem is ",element)
console.log("The date is ",new Date(element.date))
// above here the conversion of date format has to take place
lineChartData.labels?.push(element.date.toString().substring(0,4))
lineChartData.datasets[0].data.push(element.data)
})
console.log("linecghart data is ",lineChartData)
if(config)
config.data=lineChartData
const dialogRef = this.dialog.open(DialogGraphLineComponent,config);
dialogRef.afterClosed().subscribe(result => {

    
},()=>{


})

;

},(err)=>{
console.log("Error in retrieving data ",err)
})
}

openAddMedDetailDialog(config?: MatDialogConfig) {
  
  if(this.isMobileScreen){
    config={
      width: '90%',
      maxWidth: '100vw',
      //  maxHeight: '100vh',
      //  height: '100%',
       // width: '100%',
        panelClass: 'full-screen-modal',
        data:{}
  }
  }else{
    config={
     //  height: '60%',
       width: '60%',
    //  // maxWidth: '100vw',
    //     maxHeight: '100vh',
        data:{}
      //  height: '100%',
       // width: '100%',
        //panelClass: 'full-screen-modal'
  }
  }
//fetching medical details from the api

const dialogRef = this.dialog.open(DialogAddMedDetailComponent,config);
dialogRef.afterClosed().subscribe(result => {
  console.log("Dat received from dialog is ",result)
  if(result.data){
    const addMedDetail={

      id:this.signUpServ.id||1,
  
      role:"user",
  
      medicalDetails:[
  
          {  
  
              bmi :result.data.bmi,
  
              orderDate : "20221021T115513+0000",
  
              weight: result.data.weight,
  
              heartRate :result.data.heartRate,
  
              fbcStatus:result.data.fbcStatus,
  
              name:this.signUpServ.name||"abc"
  
          }
  
      ]
  
  }
  this.UserDashboardSvc.addMedDetails(addMedDetail).subscribe((data)=>{
    console.log("data added successfully")
    this._snackBar.open('Data Updated Successfully', '', {
      duration: 3000
    });
  this.fetchMedicalDetails()
  },(err)=>{
    this._snackBar.open("Error! Please try again", '', {
      duration: 3000
    });
  })
  }

    
},()=>{


})

}
}

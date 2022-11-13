import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { QueueFetchStatus } from 'src/app/constants/misc.constant';
import { SignupService } from 'src/routes/app-signup/services/signup.service';
import { QueueServiceService } from '../services/queue-service.service';

@Component({
  selector: 'app-app-live-queue',
  templateUrl: './app-live-queue.component.html',
  styleUrls: ['./app-live-queue.component.scss']
})
export class AppLiveQueueComponent implements OnInit,AfterViewInit {
  public output: string;
 queueStatus:QueueFetchStatus='stopped'
 pinGenerated=false
 pin=''
 alertMsg="Scan the QR code present in the CLINIC to generate PIN"
   @ViewChild('action', { static: false }) action: NgxScannerQrcodeComponent;
  liveQueueData:any[]=[];
  // TODO something this.action
 
  public onError(e: any): void {
    alert(e);}
  constructor(private _snackBar: MatSnackBar,private signUpUser:SignupService,private changeDetector : ChangeDetectorRef
    ,private liveQueueServ:QueueServiceService
    ) { }
  ngAfterViewInit(): void {
    if(this.queueStatus=='started' && this.action){
      this.action['start']().subscribe((res: boolean) =>  console.log("start" + ': ' + res));
      console.log("Action data isn ",this.output)
    }
  }
generaterandomPin():number{
 return  Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

}
  ngOnInit(): void {
    if(this.queueStatus=='started' && this.action){
      this.action['start']()
      console.log("Action data isn ",this.output)
    }
 
  }
  startQueue(){
    console.log("Start queue called")
    this.queueStatus='started'
    this.pinGenerated=false
    this.changeDetector.detectChanges();
    this.action['start']()
   // console.log("Action data isn ",this.output)
  }
  stopQueue(){
    console.log("Stop queue called")
    this.queueStatus='stopped'
    
    this.stopCamera()
   // console.log("Action data isn ",this.output)
 //   this.changeDetector.detectChanges();
  }
  fetchOutput(e:string){
    if(e==null){
      return
    }
console.log("fetchoutput ",e)
if(this.pinGenerated && this.pin.length>0){
  return
}
if(this.action  ){
  if( e!=null && e.length>0)
  this.pinGenerated=true // to be reomoved
  this.pin=this.generaterandomPin().toString()
  this.stopCamera()
  this._snackBar.open("PIN successfully generated", '', {
    duration: 5000
  });
this.alertMsg="Check Live Queue Status"
  if(this.signUpUser.id){  //here the checks if ita a logged in user is present has to be done and pin generation
    this.pinGenerated=true 
    this.pin=this.generaterandomPin().toString()
    this.alertMsg="Check Live Queue Status "
this.stopCamera()
this._snackBar.open("PIN successfully generated !", '', {
  duration: 3000
});
    //create the otp
   
  }else{
    // redirect to the live queue page 
  }
}
  }

  stopCamera(){
    if(this.action)
    this.action['toggleCamera']()

  }
 tabClick(event:MatTabChangeEvent){
  console.log("the evnt triggered is ",event)
  if(event.index==1){
    this.fetchliveQueueData()
  }
 }
  fetchliveQueueData(){
    const req={}
    this.liveQueueServ.fetchLiveQueueData(req).subscribe((data)=>{
console.log("dataReceived is",data )
this.liveQueueData=data

    },(err)=>{

    })
  }
}

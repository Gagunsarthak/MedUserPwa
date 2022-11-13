import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignupService } from 'src/routes/app-signup/services/signup.service';
import { DoctorService } from 'src/routes/app-user-dashboard/Services/doctor.service';
import { SlotBookingService } from '../slot-booking.service';

@Component({
  selector: 'wid-app-bookin-slot',
  templateUrl: './app-bookin-slot.component.html',
  styleUrls: ['./app-bookin-slot.component.scss']
})
export class AppBookinSlotComponent implements OnInit {
  @Input() doctorId='1'
scheduleDetails:any[]=[]
myForm: FormGroup ;
paletteColour:string=''
  constructor(private _snackBar: MatSnackBar,private signUpServ:SignupService,private bookSlotServ:SlotBookingService,private fb: FormBuilder,private docServ:DoctorService) { }

  ngOnInit(): void {

    this.getSchedule()
    this.createForm()
   
  }
  async getDoctorProfileData(id:String){
    console.log("DOCCC DETAILS CALLED")
await this.docServ.fetchProfileData(id,"doctor",["address","location"]).subscribe((data)=>{console.log("Profile data is ",data)
console.log("Datatatat is ",data.results[0].address)
 this.myForm.patchValue({
  address:data.results[0].address,
  location:data.results[0].location


})
},(err)=>{
  console.log("Error is ",err)
})


console.log("DOC DETAILS UPDATED",this.myForm)
  }
  createForm() {
    this.myForm = this.fb.group({
       fullName: ['', [Validators.required ]],
       doctorId:[this.doctorId],
       address:[''],
    location:[''],
    reasonForVisit:['',[Validators.required]],
       type:['in-person', [Validators.required]],
       slotDay:['', [Validators.required]],
       slotTime:['', [Validators.required]],
       appointmentTime:['']
    }
   
    );

    /////new approach
    console.log("Form built is ",this.myForm)
    this.getDoctorProfileData(this.doctorId)
  }
  getSchedule(){
    this.bookSlotServ.getSchedule(this.signUpServ.id||'1').subscribe((data)=>{

// this.scheduleDetails=data.totalSlots
//this.scheduleDetails = Object.entries(data.totalSlots).map((e) => ( { [e[0]]: e[1] } ));
Object.entries(data.totalSlots).forEach((obj:any)=>{
  console.log("obj is ",obj)
  //String m=obj.obj[0]
  let entry:any={
    day:obj[0],
    date:'21/09/2022',//this is hardcoded and needs to be changed
    session1: obj[1].session1_slots.map((e:string)=>{return {slotTime:e,color:'fff'}}),
    session2: obj[1].session2_slots.map((e:string)=>{return {slotTime:e,color:'fff'}}),
   // color:''
  }
  console.log("Entry ios ",entry)
  this.scheduleDetails.push(entry)



})
console.log("the data is ",this.scheduleDetails)
    },(err)=>{ console.log("The error is ",err)})
  }
  setSelectedSlot(slotTime:any,day:string,date:string,schedType:string,i:number){
console.log("The slot is "+slotTime+ "the day is "+day+"sched type is "+schedType+" index is "+i)
this.myForm.patchValue({
  slotDay: day, 
  slotTime: slotTime.slotTime,
  appointmentTime:'20180513T123456+0000'
});

//day=day.toLowerCase()
this.scheduleDetails.forEach(obj=>{
  console.log("Test obj is ",obj)
  obj.session1.forEach((slot:any)=>{slot.color=''})
  obj.session2.forEach((slot:any)=>{slot.color=''})
  if(obj.day==day  ){
    console.log("Case 1")
  

  if(schedType=='session1'){
//  obj.session1.forEach((slot:any)=>{console.log("slot is",slot);
//  if(slot.slotTime==slotTime){slot.color='red'}else{ slot.color=''}})
 console.log("Check"+JSON.stringify(obj.session1[i])) // .color='red'
 obj.session1[i].color='#18e4c4'
  }
  if(schedType=='session2'){
    //  obj.session1.forEach((slot:any)=>{console.log("slot is",slot);
    //  if(slot.slotTime==slotTime){slot.color='red'}else{ slot.color=''}})
     console.log("Check"+JSON.stringify(obj.session2[i])) // .color='red'
     obj.session2[i].color='#18e4c4'
      }

  }
})
console.log("THEHEHEHE FORM IOS S ",this.myForm)
  }

  createBooking(form: FormGroup){
    this.getDoctorProfileData(this.doctorId)
    console.log("The form is ",this.myForm.value)
    this.bookSlotServ.bookAppointment(this.myForm.value).subscribe((data)=>{
      console.log("Successfully Booked")
      this._snackBar.open("Appointment Successfully Booked", '', {
        duration: 3000
      })
    },(err)=>{
      console.log("Booking cancelled")
      this._snackBar.open("Some error occured. Retry", '', {
        duration: 3000
      })
    })
  }
  changeColor() {
    this.paletteColour = 'warn';
   }
}

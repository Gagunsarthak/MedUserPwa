import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router,Event } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-app-signup',
  templateUrl: './app-signup.component.html',
  styleUrls: ['./app-signup.component.scss']
})
export class AppSignupComponent implements OnInit {
  isLogInPage: boolean=false;
  currentRoute=''
  isMobileorTabScreen=false
  public getScreenWidth: any;
  public getScreenHeight: any;
  constructor(
    private activated: ActivatedRoute,
    private router: Router,
    private configSvc:ConfigService
  ) {
    this.configSvc.isLtMedium$.subscribe((event)=>{this.isMobileorTabScreen=event})

    this.router.events.subscribe((event: Event) => {
     

      if (event instanceof NavigationEnd) {
          // Hide progress spinner or progress bar
          this.currentRoute = event.url;          
          console.log(event);
          if(this.currentRoute.includes('login')){
            this.currentRoute='login'
          }
          else if(this.currentRoute.includes('reset')){
            this.currentRoute='reset'
          }else if(this.currentRoute.includes('register')){
            this.currentRoute='register'
          }
      }

     
  });

}
  //   @HostListener('window:resize', ['$event'])
  // onWindowResize() {
  //   this.getScreenWidth = window.innerWidth;
  //   this.getScreenHeight = window.innerHeight;
  //   //console.log("Width of screen is ",this.getScreenWidth)
  //   if(this.getScreenWidth<775){
  //     this.isMobileScreen=true
  //   }else{
  //     this.isMobileScreen=false
  //   }
  // // this.openDialog()
  // }

  ngOnInit(): void {
  
  }

}


// import { SwUpdate } from '@angular/service-worker'
// import { environment } from '../../../environments/environment'
// import { MatDialog } from '@angular/material'
// import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component'

import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { Router, NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from "@angular/router";
import { delay } from "rxjs";
import { ConfigService } from "src/app/services/config.service";
import { RootService } from "./root.service";

@Component({
  selector: 'ws-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit, AfterViewInit {
  // constructor(){
  //   console.log("Root component reached")
  // }
  @ViewChild('previewContainer', { read: ViewContainerRef, static: true })
  previewContainerViewRef: ViewContainerRef | null = null
  @ViewChild('appUpdateTitle', { static: true })
  appUpdateTitleRef: ElementRef | null = null
  @ViewChild('appUpdateBody', { static: true })
  appUpdateBodyRef: ElementRef | null = null

 // isXSmall$ = this.valueSvc.isXSmall$
public getScreenWidth: any;
  public getScreenHeight: any;
  routeChangeInProgress = false
  showNavbar = false
  currentUrl!: string
  isNavBarRequired = false
  isInIframe = false
  appStartRaised = false
  isSetupPage = false
  isMobileorTabView: boolean;
  currentRoute: string;
  
  constructor(
    private router: Router,
    // public authSvc: AuthKeycloakService,
    public configSvc: ConfigService,
   //  private valueSvc: ValueService,
    // private telemetrySvc: TelemetryService,
    // private mobileAppsSvc: MobileAppsService,
    private rootSvc: RootService,
    // private btnBackSvc: BtnPageBackService,
    private changeDetector: ChangeDetectorRef,
  ) {
    // this.mobileAppsSvc.init()
  }

  ngOnInit() {

    // this.onWindowResize()
    // try {
    //   this.isInIframe = window.self !== window.top
    // } catch (_ex) {
    //   this.isInIframe = false
    // }

   // this.btnBackSvc.initialize()
    // Application start telemetry
    // if (this.authSvc.isAuthenticated) {
    //   this.telemetrySvc.start('app', 'view', '')
    //   this.appStartRaised = true

    // }
    this.configSvc.isLtMedium$.subscribe((event)=>{this.isMobileorTabView=event})
    
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('/setup/')) {
          this.isSetupPage = true
        }
      }
      if (event instanceof NavigationStart) {
        if (event.url.includes('preview') || event.url.includes('embed')) {
          this.isNavBarRequired = false
        } else if (event.url.includes('signUp/') ) {
          this.isNavBarRequired = false
        } else {
          this.isNavBarRequired = true
        }
        this.routeChangeInProgress = true
        this.changeDetector.detectChanges()
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.routeChangeInProgress = false
        this.currentUrl = event.url
        this.changeDetector.detectChanges()
      }

      // if (event instanceof NavigationEnd) {
      //   this.telemetrySvc.impression()
      //   if (this.appStartRaised) {
      //     this.telemetrySvc.audit(WsEvents.WsAuditTypes.Created, 'Login', {})
      //     this.appStartRaised = false
      //   }
      // }
    })
    this.rootSvc.showNavbarDisplay$.pipe(delay(500)).subscribe(display => {
      this.showNavbar = display
    })
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    //console.log("Width of screen is ",this.getScreenWidth)
    if(this.getScreenWidth<775){
      this.configSvc.isMobileScreen=true
    }else{
      this.configSvc.isMobileScreen=false
    }
  // this.openDialog()
  }
  ngAfterViewInit() {
    // this.initAppUpdateCheck()
  }

  // initAppUpdateCheck() {
  //   this.logger.log('LOGGING IN ROOT FOR PWA INIT CHECK')
  //   if (environment.production) {
  //     const appIsStable$ = this.appRef.isStable.pipe(
  //       first(isStable => isStable),
  //     )
  //     const everySixHours$ = interval(6 * 60 * 60 * 1000)
  //     const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$)
  //     everySixHoursOnceAppIsStable$.subscribe(() => this.swUpdate.checkForUpdate())
  //     if (this.swUpdate.isEnabled) {
  //       this.swUpdate.available.subscribe(() => {
  //         const dialogRef = this.dialog.open(DialogConfirmComponent, {
  //           data: {
  //             title: (this.appUpdateTitleRef && this.appUpdateTitleRef.nativeElement.value) || '',
  //             body: (this.appUpdateBodyRef && this.appUpdateBodyRef.nativeElement.value) || '',
  //           },
  //         })
  //         dialogRef.afterClosed().subscribe(
  //           result => {
  //             if (result) {
  //               this.swUpdate.activateUpdate().then(() => {
  //                 if ('caches' in window) {
  //                   caches.keys()
  //                     .then(keyList => {
  //                       timer(2000).subscribe(
  //                         _ => window.location.reload(),
  //                       )
  //                       return Promise.all(keyList.map(key => {
  //                         return caches.delete(key)
  //                       }))
  //                     })
  //                 }
  //               })
  //             }
  //           },
  //         )
  //       })
  //     }
  //   }
  // }
}

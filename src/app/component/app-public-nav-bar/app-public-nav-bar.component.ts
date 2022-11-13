import { Component, OnInit } from '@angular/core'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'

@Component({
  selector: 'ws-app-public-nav-bar',
  templateUrl: './app-public-nav-bar.component.html',
  styleUrls: ['./app-public-nav-bar.component.scss'],
})
export class AppPublicNavBarComponent implements OnInit {
  appIcon: SafeUrl | null = null
  logo = ''
  appName = ''
  constructor(private domSanitizer: DomSanitizer, ) { }

  public get showPublicNavbar(): boolean {
    return true
  }

  ngOnInit() {
    // if (this.configSvc.instanceConfig) {
    //   this.appIcon = this.domSanitizer.bypassSecurityTrustResourceUrl(
    //     this.configSvc.instanceConfig.logos.appTransparent,
    //   )
    //   this.appName = this.configSvc.instanceConfig.details.appName
    //   this.navBar = this.configSvc.primaryNavBar
    // }
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChartConfiguration } from 'chart.js';
import { DialogGraphLineComponent } from 'src/app/component/dialog-graph-line/dialog-graph-line.component';
import { ConfigService } from 'src/app/services/config.service';
import { SignupService } from 'src/routes/app-signup/services/signup.service';
import { UserDashboardService } from '../Services/user-dashboard.service';

@Component({
  selector: 'app-app-user-dashboard',
  templateUrl: './app-user-dashboard.component.html',
  styleUrls: ['./app-user-dashboard.component.scss']
})
export class AppUserDashboardComponent implements OnInit {
  isMobileorTabScreen=false
  constructor( private configSvc:ConfigService) { }

  ngOnInit(): void {
    this.configSvc.isLtMedium$.subscribe((event)=>{this.isMobileorTabScreen=event})
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(DialogGraphLineComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }



}

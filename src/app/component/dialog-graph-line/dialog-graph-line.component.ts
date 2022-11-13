import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-dialog-graph-line',
  templateUrl: './dialog-graph-line.component.html',
  styleUrls: ['./dialog-graph-line.component.scss']
})
export class DialogGraphLineComponent implements OnInit {
  title = 'ng2-charts-demo';
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
     lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
   lineChartLegend = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public chartData: ChartConfiguration<'line'>['data'],
    private dialogRef: MatDialogRef<DialogConfirmComponent>,
  ) { }
  ngOnInit(){
   console.log("cahrt data is ",this.chartData)
   if(this.chartData){
    this.lineChartData.datasets=this.chartData.datasets
    this.lineChartData.labels=this.chartData.labels
   }
  }

  confirmed() {
    this.dialogRef.close(true)
  }
  
}

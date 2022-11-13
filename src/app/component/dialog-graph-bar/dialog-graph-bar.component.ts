import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dialog-graph-bar',
  templateUrl: './dialog-graph-bar.component.html',
  styleUrls: ['./dialog-graph-bar.component.scss']
})
export class DialogGraphBarComponent implements OnInit {
  title = 'ng2-charts-demo';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      // { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  constructor( @Inject(MAT_DIALOG_DATA) public chartData: ChartConfiguration<'bar'>['data'],) { }

  ngOnInit(): void {
    console.log("Bar data is ",this.chartData)
    if(this.chartData){
     this.barChartData.datasets=this.chartData.datasets
     this.barChartData.labels=this.chartData.labels
    }
  }

  confirmed() {
   // this.dialogRef.close(true)
  }
}

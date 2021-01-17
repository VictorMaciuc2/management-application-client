import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: string[];
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-most-used-technologies',
  templateUrl: './most-used-technologies.component.html',
  styleUrls: ['./most-used-technologies.component.css']
})
export class MostUsedTechnologiesComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  @Input() mostUsedTech; 
  public chartOptions: Partial<ChartOptions>;
  
  constructor() {
  }
  
  ngOnInit(): void {
    this.chartOptions = {
      series: this.mostUsedTech.map(e => e.nr_of_projects),
      chart: {
        type: "donut"
      },
      labels: this.mostUsedTech.map(e => e.name),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 100
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}

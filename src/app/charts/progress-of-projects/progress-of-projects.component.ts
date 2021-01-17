import { Component, Input, OnInit, ViewChild } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-progress-of-projects',
  templateUrl: './progress-of-projects.component.html',
  styleUrls: ['./progress-of-projects.component.css']
})
export class ProgressOfProjectsComponent implements OnInit {
  @Input() progressOfProjects; 
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    
  }

  ngOnInit(): void {
    var total = this.progressOfProjects.map(p => p.procent).reduce((a,b) => a + b, 0) / (this.progressOfProjects.length );
    this.chartOptions = {
      series: this.progressOfProjects.map(p => p.procent.toFixed(2)),
      chart: {
        height: 350,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px"
            },
            value: {
              fontSize: "16px"
            },
            total: {
              show: true,
              label: "Average",
              formatter: function (w) {
                return total.toFixed(2) + '%';
              }
            }
          }
        }
      },
      labels: this.progressOfProjects.map(p => p.project.name)
    }
  }
}  

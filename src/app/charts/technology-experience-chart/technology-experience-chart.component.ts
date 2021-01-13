import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import ApexCharts from 'apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-technology-experience-chart',
  templateUrl: './technology-experience-chart.component.html',
  styleUrls: ['./technology-experience-chart.component.css']
})
export class TechnologyExperienceChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  @Input() technologies; 
  public chartOptions: Partial<ChartOptions>;
  public selectedTechnology;

  constructor() { }

  ngOnInit(): void {
    this.selectedTechnology = this.technologies[0];
    this.renderChart();
  }

  renderChart() {
    var employees = this.selectedTechnology.users.filter(u => u.experienceInDays != 0).sort((a, b) => b.experienceInDays - a.experienceInDays);;

    this.chartOptions = {
      series:  [{
        name: "months",
        data: employees.map(e => Math.ceil(e.experienceInDays / 30))
      }],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: employees.map(e => e.name)
      }
    };
  }

}

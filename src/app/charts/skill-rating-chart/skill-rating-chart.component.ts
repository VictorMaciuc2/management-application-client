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
  selector: 'app-skill-rating-chart',
  templateUrl: './skill-rating-chart.component.html',
  styleUrls: ['./skill-rating-chart.component.css']
})
export class SkillRatingChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  @Input() skillRatings;
  public chartOptions: Partial<ChartOptions>;
  public selectedSkill;
  public selectedSkillValue;

  constructor() { }

  ngOnInit(): void {
    this.selectedSkill = this.skillRatings[0];
    this.renderChart();
  }

  renderChart() {
    var skills=this.skillRatings;
    var employees=this.selectedSkill.users;
    var ratings=employees.map(e => e.rating);
    var names=employees.map(e => e.user.name);
    this.chartOptions = {
      series:  [{
        name: "skill rating",
        data: ratings
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
        categories:  names
      }
    };
  }

}

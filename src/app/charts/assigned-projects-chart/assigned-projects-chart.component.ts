import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-assigned-projects-chart',
  templateUrl: './assigned-projects-chart.component.html',
  styleUrls: ['./assigned-projects-chart.component.css']
})
export class AssignedProjectsChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  @Input() usersWithProjects; 
  public chartOptions: Partial<ChartOptions>;

  constructor() { }

  ngOnInit(): void {
    this.renderChart();
  }

  renderChart() {

    this.chartOptions = {
      series:  [{
        name: "nrOfProjects",
        data: this.usersWithProjects.map(e => e.nrOfProjects)
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
        categories: this.usersWithProjects.map(e => e.name)
      }
    };
  }
}

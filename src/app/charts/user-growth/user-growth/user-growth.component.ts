import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-user-growth',
  templateUrl: './user-growth.component.html',
  styleUrls: ['./user-growth.component.css']
})
export class UserGrowthComponent implements OnInit {
  selectedDataRow: any;
  @ViewChild("chart") chart: ChartComponent;
  @Input() dataRows: any[]; 
  public chartOptions: Partial<ChartOptions>;

  constructor() { }

  ngOnInit(): void {
    this.selectedDataRow = this.dataRows[0];
    this.createChart();
  }

  createChart(){
    if (this.selectedDataRow === undefined){
      return;
    }

    this.chartOptions = {
      series: [
        {
          name: "Feedback",
          data: this.selectedDataRow.reports.map(report => report.rating)
        }
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },

      subtitle: {
        text: this.selectedDataRow.user.name,
        align: "left"
      },
      labels: this.selectedDataRow.reports.map(report => report.date),
      xaxis: {
        type: "datetime",
        labels: {
          format: 'dd MMM'
        }
      },
      yaxis: {
        max: 5,
        min: 1,
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };
  }
}

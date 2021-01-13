import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexLegend, ApexStroke, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { FeedbackService } from 'src/app/services/feedback.service';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  selectedDataRow: any;
  dataRows: any[];

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.getUserGrowth();
  }

  getUserGrowth(){
    this.feedbackService.getUserGrowth().subscribe(
      dataRow => {
        this.dataRows = dataRow.filter(dataRow => dataRow.user.role === 3);

        this.selectedDataRow = this.dataRows[0];
        this.createChart();
      }
    );
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

      title: {
        text: "Skills growth",
        align: "left"
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

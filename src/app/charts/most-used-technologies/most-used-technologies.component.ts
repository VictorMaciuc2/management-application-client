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
  selector: 'app-most-used-technologies',
  templateUrl: './most-used-technologies.component.html',
  styleUrls: ['./most-used-technologies.component.css']
})
export class MostUsedTechnologiesComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  @Input() mostUsedTech; 
  public chartOptions: Partial<ChartOptions>;
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, EventEmitter } from '@angular/core';
import { AppService } from './app.service';
import { GraphDataSet, GraphSeries } from './app.model';
import { DatePipe } from '@angular/common';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Service Health';

  isProcessing = false;
  isProcessed = false;
  isLoaded = false;
  isError = false;

  // events
  $resultEvent: EventEmitter<any> = new EventEmitter();
  $processingEvent: EventEmitter<boolean> = new EventEmitter();
  $errorsEvent: EventEmitter<any> = new EventEmitter();

  // graph data source
  graphDataSource: any[] = [];

  // graph options
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  yAxisLabel = 'Status';
  timeline = true;
  legendPosition = 'right';
  curve = shape.curveStep;
  yScaleMax = 8;
  yScaleMin = 1;
  // autoScale = false;

  colorScheme = {
    // domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
    domain: ['#01579b', '#0277bd', '#0288d1', '#039be5', '#03a9f4', '#29b6f6', '#4fc3f7', '#81d4fa', '#b3e5fc', '#e1f5fe']
  };

  constructor(private appService: AppService, private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.$processingEvent.subscribe((isProcessing) => this.isProcessing = isProcessing);

    this.$errorsEvent.subscribe((errors) => {
      this.isError = true;
    });

    this.$resultEvent.subscribe((result) => {
      this.isError = false;

      if (result) {
        console.log(result);
        const serviceResult: any = result;

        if (serviceResult) {

          // clear out previous search list.
          this.graphDataSource = [];

          // Primary Web Service.
          const datasetWebServiceOne: GraphDataSet = new GraphDataSet();
          datasetWebServiceOne.name = 'Service Primary WS Activity';
          datasetWebServiceOne.series = [];

          if (serviceResult.mainWebServiceStatuses.length > 0) {

            serviceResult.mainWebServiceStatuses.forEach(row => {
              datasetWebServiceOne.series.push({
                name: this.datePipe.transform(row.timestamp, 'dd-MM-yyyy HH:mm:ss'),
                value: (row.status) ? 5 : 0
              });
            });
          }

          // Secondary Web Service.
          const datasetWebServiceTwo: GraphDataSet = new GraphDataSet();
          datasetWebServiceTwo.name = 'Service Secondary WS Activity';
          datasetWebServiceTwo.series = [];

          if (serviceResult.secondaryWebServiceStatuses.length > 0) {

            serviceResult.secondaryWebServiceStatuses.forEach(row => {
              datasetWebServiceTwo.series.push({
                name: this.datePipe.transform(row.timestamp, 'dd-MM-yyyy HH:mm:ss'),
                value: (row.status) ? 4 : 0
              });
            });
          }

          this.graphDataSource.push(datasetWebServiceOne);
          this.graphDataSource.push(datasetWebServiceTwo);

          console.log(this.graphDataSource);
        }
      }
    });

    this.appService.getServerState(this.$processingEvent, this.$resultEvent, this.$errorsEvent);
  }

  refreshData(): void {
    this.appService.getServerState(this.$processingEvent, this.$resultEvent, this.$errorsEvent);
  }
}

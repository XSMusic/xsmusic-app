import { Component, OnInit } from '@angular/core';
import { AnalyticsService, TOAST_STATE, UIService } from '@services';
import { AnalyticsGetVisitsDto } from '@shared/services/api/analytics/analytics.dto';
import { AnalyticsGetVisitsResponse } from '@shared/services/api/analytics/analytics.response';
import { ChartOptionsModel } from '../chart-bar/chart-bar.options-model';

@Component({
  selector: 'analytics-visits-last-days',
  templateUrl: 'analytics-visits-last-days.component.html',
  styleUrls: ['./analytics-visits-last-days.component.scss'],
})
export class AnalyticsVisitsLastDaysComponent implements OnInit {
  data!: AnalyticsGetVisitsResponse[];
  optionsChart!: any;
  dateSelected = '7daysAgo';
  dataDate!: any[];
  backgroundColors = [
    'rgba(59, 130, 246, 0.08)',
    'rgba(59, 130, 246, 0.08)',
    'rgba(59, 130, 246, 0.08)',
    'rgba(59, 130, 246, 0.08)',
  ];
  borderColors = [
    'rgb(0, 0, 0)',
    'rgb(99, 102, 241)',
    'rgb(204, 0, 0)',
    'rgb(30, 171, 22)',
  ];
  pointBackgroundColors = [
    'rgb(0, 0, 0)',
    'rgb(99, 102, 241)',
    'rgb(204, 0, 0)',
    'rgb(30, 171, 22)',
  ];
  constructor(
    private analyticsService: AnalyticsService,
    private ui: UIService
  ) {}

  ngOnInit() {
    this.setDates();
    this.getVisits();
  }

  setDates() {
    this.dataDate = this.analyticsService.dates;
  }

  getVisits() {
    const body: AnalyticsGetVisitsDto = {
      startDate: this.dateSelected,
      endDate: 'today',
      order: 'date',
    };
    this.analyticsService.getVisits(body).subscribe({
      next: (response) => {
        this.data = response;
        this.createOptionsChart();
        this.createDatasets();
        this.setData();
      },
      error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
    });
  }

  private createOptionsChart() {
    this.optionsChart = new ChartOptionsModel({
      data: {
        labels: [],
        datasets: [],
      },
      type: 'line',
      options: {
        scales: {
          x: { grid: { display: false } },
          y: {
            display: true,
            ticks: { display: true },
            grid: { display: false },
          },
        },
        // scales: { x: { display: false }, y: { display: false } },
        elements: { line: { tension: 0.5 } },
        responsive: true,
        maintainAspectRatio: false,
        // plugins: { legend: { display: false } },
      },
      loading: true,
    });
  }

  private createDatasets() {
    this.data[0].items.forEach((element, index) => {
      this.optionsChart.data.datasets.push({
        data: [],
        fill: true,
        label: element.name,
        backgroundColor: this.backgroundColors[index],
        borderColor: this.borderColors[index],
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 3,

        pointBackgroundColor: this.pointBackgroundColors[index],
      });
    });
  }

  setData() {
    this.data.forEach((element) => {
      element.items.forEach((subi, i) => {
        this.optionsChart.data.datasets[i].data.push(subi.value);
      });
      this.optionsChart.data.labels.push(element.date);
    });
    this.optionsChart.loading = false;
  }

  onChangeSelect() {
    this.getVisits();
  }
}

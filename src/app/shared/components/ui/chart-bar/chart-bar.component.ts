import { Component, ViewChild, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'chart-bar',
    templateUrl: 'chart-bar.component.html',
})
export class ChartBarComponent {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
    @Input() data!: {
        options: ChartConfiguration['options'];
        data: ChartData<ChartType>;
        type: ChartType;
    };
}

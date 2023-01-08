import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

export class ChartOptionsModel {
    options: ChartConfiguration['options'] = {};
    data: ChartData<ChartType> = {
        labels: [],
        datasets: [{ data: [] }],
    };
    type: ChartType = 'line';
    loading = true;

    constructor(data?: ChartOptionsModel) {
        if (data) {
            Object.assign(this, data);
        }
    }
}

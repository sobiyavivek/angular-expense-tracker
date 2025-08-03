import { Component , OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UserService } from '../user-service';
import { HttpClient } from '@angular/common/http';
import { curveNatural } from 'd3-shape';
import { MatFormField , MatFormFieldControl } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDatepicker,MatDatepickerModule } from '@angular/material/datepicker';
import { MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BarChartType, NgxChartsModule } from '@swimlane/ngx-charts';
import { Color , ScaleType } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { provideNativeDateAdapter, MatNativeDateModule } from '@angular/material/core';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialogActions ,MatDialogContent} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { BaseChartDirective, NgChartsConfiguration } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  imports: [MatFormField,MatInputModule,NgChartsModule, MatButtonModule,  MatCardModule, HttpClientModule, MatNativeDateModule, NgxChartsModule, MatDatepickerModule, FormsModule, MatLabel, CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './dashboard.css',
  providers: [provideNativeDateAdapter()]
})
export class Dashboard implements OnInit {
@ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  fromDate!: Date;
  toDate!: Date;

  chartType: 'bar' | 'line'  = 'line';
  fullData: any[] = [];

  expensesChartData: ChartConfiguration<'line' | 'bar'>['data'] = { labels: [], datasets: [] };
  savingsChartData: ChartConfiguration<'line' | 'bar'>['data'] = { labels: [], datasets: [] };

  chartOptions: ChartOptions<'line' | 'bar'> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `₹${tooltipItem.raw}`
        }
      },
      legend: {
        display: true
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Date' }
      },
      y: {
        title: { display: true, text: 'Amount' }
      }
    }
  };

  apiUrl = 'https://687f6140efe65e5200897a08.mockapi.io/finance/transactions';

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  setChartType(type: 'bar' | 'line') {
    this.chartType = type;
    this.prepareChartData(this.fullData);
  }

  loadChartData(): void {
    const currentUser = this.userService.getLoggedInUser();
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      const userData = data.filter(d => d.userId === currentUser?.userId);
      this.fullData = userData;
      this.prepareChartData(userData);
    });
  }

  filterData(): void {
    const filtered = this.fullData.filter(d => {
      const date = new Date(d.date);
      return (!this.fromDate || date >= this.fromDate) &&
             (!this.toDate || date <= this.toDate);
    });
    this.prepareChartData(filtered);
  }

  prepareChartData(data: any[]): void {
    const formatLabel = (d: string) => new Date(d).toLocaleDateString();

    const expenses = data.filter(d => d.title === 'Expenses');
    const savings = data.filter(d => d.title === 'Savings');

    this.expensesChartData = {
      labels: expenses.map(e => formatLabel(e.date)),
      datasets: [{
        label: 'Expenses',
        data: expenses.map(e => +e.amount),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'red',
        fill: this.chartType === 'line',
        tension: 0.4
      }]
    };

    this.savingsChartData = {
      labels: savings.map(s => formatLabel(s.date)),
      datasets: [{
        label: 'Savings',
        data: savings.map(s => +s.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'blue',
        fill: this.chartType === 'line',
        tension: 0.4
      }]
    };

    this.chart?.update();
  }
}




















//   fromDate!: Date;
//   toDate!: Date;
//   chartType : 'line' | 'bar' = 'line' ;
//   fullData: any[] = [];
//   expensesChartData: any[] = [];
//   savingsChartData: any[] = [];
//   apiUrl = 'https://687f6140efe65e5200897a08.mockapi.io/finance/transactions';

//   @ViewChild('customTooltip') customTooltip: any;
//   constructor(private http: HttpClient, private userService: UserService , private router : Router) {}

//   ngOnInit() {
//     this.loadChartData();
//   }
//   logout(): void {
//   this.userService.logout();
//   this.router.navigate(['/login']);
// }
//   loadChartData() {
//     const currentUser = this.userService.getLoggedInUser();
//     this.http.get<any[]>(this.apiUrl).subscribe(data => {
//       const userData = data.filter(d => d.userId === currentUser?.userId);
//       this.fullData = userData;
//       this.prepareChartData(userData);
//     });
//   }
//   setChartType(type : 'line' | 'bar')
//   {
//     this.chartType = type;
//   }
// filterData() {
//     const filtered = this.fullData.filter(d => {
//       const date = new Date(d.date);
//       return (!this.fromDate || date >= this.fromDate) &&
//              (!this.toDate || date <= this.toDate);
//     });
//     this.prepareChartData(filtered);
//   }
//    prepareChartData(data: any[]) {
//     const expenses = data.filter(d => d.title === 'Expenses');
//     const savings = data.filter(d => d.title === 'Savings');

//     this.expensesChartData = [{
//       name: 'Expenses',
//       series: expenses.map(e => ({
//         name: new Date(e.date).toLocaleDateString(),
//         value: +e.amount
//       }))
//     }];
//     this.savingsChartData = [{
//       name: 'Savings',
//       series: savings.map(s => ({
//         name: new Date(s.date).toLocaleDateString(),
//         value: +s.amount
//       }))
//     }];
//   }
//   onPointSelect(event: any) {
//     console.log('Selected point:', event);
//   }



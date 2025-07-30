import { Component ,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user-service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-transaction-list',
  imports: [MatTableModule,HttpClientModule,MatCardModule,CommonModule, MatButtonModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css'
})
export class TransactionList implements OnInit {

   expenses: any[] = [];
  savings: any[] = [];
  displayedColumns: string[] = ['id', 'amount', 'type', 'category', 'notes', 'date'];
  apiUrl = 'https://687f6140efe65e5200897a08.mockapi.io/finance/transactions';

  constructor(private http: HttpClient, private userService: UserService ,private cdr : ChangeDetectorRef,  private router :Router) {}
logout(): void {
  this.userService.logout();
  this.router.navigate(['/login']);
}
  ngOnInit(): void {
    const currentUser = this.userService.getLoggedInUser();
  
  this.http.get<any[]>(this.apiUrl).subscribe(data => {
      const userData = data.filter(d => d.userId === currentUser?.userId); // ✅ Per-user transactions
      this.expenses = userData.filter(item => item.title === 'Expenses');
      this.savings = userData.filter(item => item.title === 'Savings');
      this.cdr.detectChanges();
    });
  }
}

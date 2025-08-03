import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { finalize, map, switchMap } from 'rxjs';
import { UserService } from '../user-service';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-transaction-form',
  imports: [HttpClientModule, MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
   CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css'
})
export class TransactionForm {

transactionForm !: FormGroup;
  isLoading = false;
  apiUrl = 'https://687f6140efe65e5200897a08.mockapi.io/finance/transactions';

  constructor(private fb: FormBuilder, private snackBar : MatSnackBar, private http: HttpClient , private userService: UserService,private router: Router) {
    this.transactionForm = this.fb.group({
      title: ['', Validators.required],
      amount: ['' , Validators.required],
      type : ['' , Validators.required],
      category : ['' , Validators.required],
      notes : ['' , Validators.required],
      date: ['' , Validators.required]
    });
  }
logout(): void {
  this.userService.logout();
  this.router.navigate(['/login']);
}
transHistory()
{
  this.router.navigate(['/transaction-list']);
}
  
  onSubmit() {
  if (this.transactionForm.invalid) return;

  this.isLoading = true;
  const currentUser = this.userService.getLoggedInUser(); 

  this.http.get<any[]>(this.apiUrl)
    .pipe(
      map(data => {
        const lastId = data.length ? Math.max(...data.map(d => +d.id)) : 0;
        return lastId + 1;
      }),
      switchMap(newId => {
        const newTransaction = {
          id: newId.toString(),
          userId: currentUser?.userId, 
          ...this.transactionForm.value,
          date: new Date(this.transactionForm.value.date).toISOString()
        };
        return this.http.post(this.apiUrl, newTransaction);
      }),
      finalize(() => this.isLoading = false)
    )
    .subscribe({
      next: res => {
        this.snackBar.open('Transaction added!', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          panelClass: ['snackbar-success']
        });
        this.transactionForm.reset();
        setTimeout(() => this.router.navigate(['/transaction-list']), 3000);
      },
      error: err => {
        console.error('Error adding transaction:', err);
      }
    });
}

}


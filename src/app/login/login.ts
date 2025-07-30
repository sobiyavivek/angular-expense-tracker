import { Component ,NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User,UserService } from '../user-service';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule, FormsModule,MatSnackBarModule, MatCardModule,MatButton,MatInputModule,MatIconModule,MatFormFieldModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
   hidePassword: boolean = true;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    const user = this.userService.login(email, password);
    if (user) {
      this.snackBar.open('Login successful!', 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        panelClass: ['snackbar-success']
      });
      this.router.navigate(['/transaction-form']);
    } 
     else {
      this.snackBar.open('Invalid email or password', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
    }
  }
}

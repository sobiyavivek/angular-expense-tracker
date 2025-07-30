import { Component, OnInit } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User , UserService } from '../user-service'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarModule ,MatSnackBar } from '@angular/material/snack-bar';

// import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-register',
  imports: [CommonModule,MatCheckbox,MatSnackBarModule, ReactiveFormsModule, FormsModule ,MatSelectModule, MatCardModule,MatButtonModule,MatButton,MatInputModule,MatIconModule,MatFormFieldModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register  implements OnInit {
selectedGender : string ='';
registerForm!: FormGroup;
 isNewuser : boolean = false ;
 constructor(private fb: FormBuilder ,private userService : UserService, private snackBar: MatSnackBar, private router: Router) {}

  userObj : User = new User() ;
  userList : User[] = [] ;
form: any;
 currentUser: User = new User();
 hidePassword = true;
  
  ngOnInit() {
    this.registerForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',
    [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]
  ],
      city: ['', Validators.required],
      gender: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      isAgree: [false, Validators.requiredTrue],
      
    });
    

  
  

   
  }
   

onSave() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const newUser: User = {
      userId: 0,
      ...this.registerForm.value
    };
     this.userService.registerUser(newUser);
    this.registerForm.reset();

    this.snackBar.open('Registration Successful!', 'Close', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['snackbar-success']
    });
    
    setTimeout(() => this.router.navigate(['/home']), 3000);
  }
  logout(): void {
  this.userService.logout();
  this.router.navigate(['/login']);
}
   onDelete(userId: number) {
    if (confirm("Are you sure you want to delete?")) {
      this.userService.deleteUser(userId);
      this.userList = this.userService.getUsers();
    }
  }
  onUpdate() {
    this.userService.updateUser(this.userObj);
    this.userList = this.userService.getUsers();
  }
}

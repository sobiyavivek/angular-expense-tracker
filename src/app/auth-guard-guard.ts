import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user-service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router , private snackBar : MatSnackBar) {}

  canActivate(): boolean {
    const user = this.userService.getLoggedInUser();
    if (user) return true;
 this.snackBar.open('Please login first', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });
    this.router.navigate(['/login']);
    return false;
  }
}

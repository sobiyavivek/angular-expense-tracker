import { Component,effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, MatCardModule,MatButton,MatInputModule,MatIconModule,MatFormFieldModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}

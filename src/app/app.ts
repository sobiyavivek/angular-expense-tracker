import { Component ,effect, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from './theme-service';
import {MatCardModule} from '@angular/material/card';
import { HighLight } from './high-light';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HighLight, RouterLink,MatCardModule,MatSidenavModule,MatListModule,MatSlideToggleModule,MatButtonModule, MatIconModule,MatToolbarModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
darkMode = signal (false);
constructor(private themeService : ThemeService){}
  // ApiURL="https://687f6140efe65e5200897a08.mockapi.io/finance/transactions"
applyDarkMode = effect(() =>
{
  const darkMode = this.darkMode();
  document.body.classList.toggle('darkMode',darkMode);
})
  
}

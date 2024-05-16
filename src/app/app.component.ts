import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilterComponent } from './filtro/filter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    FilterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'magic-app';
}

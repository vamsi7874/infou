import { Component } from '@angular/core';
import { NewsscrollComponent } from '../../newsscroll/newsscroll.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NewsscrollComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {}

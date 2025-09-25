import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {



  email = signal('');
  password = signal('');

  onSubmit() {
   
  }

}

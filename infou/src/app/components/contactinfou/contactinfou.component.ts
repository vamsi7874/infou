import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-contactinfou',
  standalone: true,
  imports: [],
  templateUrl: './contactinfou.component.html',
  styleUrl: './contactinfou.component.css'
})
export class ContactinfouComponent {

  constructor(){

  }

  contactInfo : any ={
    email : "vamsi@mail.com",
    mobile : "9492048237",

  }

}

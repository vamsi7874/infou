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

  schedulerOpts = signal([ {name : "Weather",icon : '<i class="fa-solid fa-cloud"></i>'} , {name : "Finanace",icon : '<i class="fa-solid fa-coins"></i>'}
  ])

 

}

import { Component } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signedupscrren',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './signedupscrren.component.html',
  styleUrl: './signedupscrren.component.css'
})
export class SignedupscrrenComponent {
  constructor(private router : Router){

    console.log(this.router.events,"routerEvents");
    


  }

 

}

import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signedupscrren',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './signedupscrren.component.html',
  styleUrl: './signedupscrren.component.css'
})
export class SignedupscrrenComponent implements OnInit {
  private router = inject(ActivatedRoute)
  constructor(){
    effect(()=>{
      let routes = this.routerChanges$()  
    })
  }

  routerChanges$ = toSignal(this.router.queryParamMap.pipe());

  ngOnInit(): void {
  }


 

}

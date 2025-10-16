import { TitleCasePipe } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WeatherComponent } from '../../weather/weather.component';

@Component({
  selector: 'app-signedupscrren',
  standalone: true,
  imports: [RouterModule, TitleCasePipe, WeatherComponent],
  templateUrl: './signedupscrren.component.html',
  styleUrl: './signedupscrren.component.css',
})
export class SignedupscrrenComponent implements OnInit {
  private router = inject(ActivatedRoute);
  constructor() {
    effect(() => {
      let routes = this.routerChanges$();
    });
  }

  routerChanges$ = toSignal(this.router.queryParamMap.pipe());
  userData: any;
  userName = signal<string>('');

  ngOnInit(): void {
    this.userData = localStorage.getItem('user-email');
    this.userName.set(this.userData.split('@')[0]);
  }
}

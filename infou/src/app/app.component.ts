import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { environtment } from '../environment';
import {
  NgbProgressbarConfig,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NgbProgressbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    NgbProgressbarConfig,
  ],
})
export class AppComponent implements OnInit {
  title = 'infou';
  waitingTime = signal(0);
  maxWaittime = 60;
  isServerUp = signal(false);
  private http = inject(HttpClient);
  intervalId: any;
  private route = inject(Router);

  constructor(
    private config: NgbProgressbarConfig,
    private titleService: Title
  ) {
    config.max = this.maxWaittime;
    config.striped = true;
    config.animated = true;
    config.type = 'success';
    config.height = '20px';
  }

  ngOnInit(): void {
    this.checkDownTime();
    this.setTitle('infoU');
  }

  setTitle(name: string) {
    this.titleService.setTitle(name?.toUpperCase());
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      if (this.waitingTime() < this.maxWaittime) {
        this.waitingTime.update((t) => t + 1);
      }
    }, 1000);
  }

  checkDownTime() {
    this.startCountdown();
    this.http
      .get(environtment.baseUrl.replace('app', ''))
      .subscribe((res: any) => {
        console.log(res, 'response');

        if (res.code === 200) {
          this.isServerUp.set(true);
          clearInterval(this.intervalId);
          this.checkSession();
        }
      });
  }

  checkSession() {
    if (localStorage.getItem('token')) {
      this.route.navigate(['home']);
    }
  }
}

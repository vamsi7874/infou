import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HomecommonService } from './homecommon.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { routes } from '../../app.routes';
import { Router, RouterModule } from '@angular/router';
import { SignedupscrrenComponent } from '../signedupscrren/signedupscrren.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SignedupscrrenComponent,
    RouterModule,
    NgbPopoverModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [HomecommonService],
})
export class HomeComponent implements OnInit {
  homeService = inject(HomecommonService);
  signupForm!: FormGroup;
  loginForm!: FormGroup;
  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {}

  headerOptions = signal<any[]>([
    {
      path: '/home',
      isActive: false,
      name: 'Home',
    },
    {
      path: '/chat',
      isActive: false,
      name: 'AI Chat',
    },
    {
      path: '/scheduler',
      isActive: false,
      name: 'Scheduler',
    },
    {
      path: '/about',
      isActive: false,
      name: 'About',
    },
    {
      path: '/services',
      isActive: false,
      name: 'Explore/Trends',
    },
  ]);

  email = signal('');
  password = signal('');

  // signUppayload = this.homeService.signUpPayload

  isNavbarExpanded = false;

  get isSignedUp() {
    return this.homeService.isLoggedIn();
  }

  toggleNavbar() {
    this.isNavbarExpanded = !this.isNavbarExpanded;
  }

  closeNavbar() {
    this.isNavbarExpanded = false;
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  check() {
    this.showLoginScreen.set(true);
  }

  showLoginScreen = signal(false);

  onSignup() {
    this.homeService
      .signup(
        this.signupForm.getRawValue()?.email,
        this.signupForm.getRawValue().password
      )
      .subscribe((res) => {
        console.log(res, 'loggedresponse');
      });
  }

  onLogin() {
    console.log(this.loginForm.value, 'values');

    this.homeService
      .login(
        this.loginForm.getRawValue()?.email,
        this.loginForm.getRawValue().password
      )
      .subscribe((res) => {
        console.log(res, 'loggedresp');
      });
  }

  routeToPath(link: any) {
    this.headerOptions().forEach((ele) => {
      if (ele?.path == link?.path) {
        ele.isActive = true;
      }
    });
    this.router.navigate([link?.path]).then(() => {
      // this.isSignedUp.set(true);
    });
  }
}

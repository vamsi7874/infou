import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { HomecommonService } from './homecommon.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { routes } from '../../app.routes';
import { Router, RouterModule } from '@angular/router';
import { SignedupscrrenComponent } from '../signedupscrren/signedupscrren.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule,SignedupscrrenComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers : [HomecommonService]
})
export class HomeComponent {

  homeService = inject(HomecommonService);
constructor(private http : HttpClient,private router : Router){

}

headerOptions = signal<any[]>([
  {
  path : "/home",isActive : false,name : "Home"
},
{
  path : "/scheduler",isActive : false,name : "Scheduler"
},{
  path : "/about",isActive : false, name : "About"
},{
  path : "/services", isActive : false,name : "Services"
}])



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

  onSubmit() {
   
  }

  onSignup(){

  this.homeService.signup(this.email(),this.password()).subscribe((res)=>{
      console.log(res,"response");
      
    })

 }

   onLogin(data : any){

  this.homeService.login(this.email(),this.password()).subscribe((res)=>{
      console.log(res,"response");
      
    })

 }

 routeToPath(link  :any){
  this.headerOptions().forEach((ele)=>{
    if(ele?.path == link?.path){
      ele.isActive = true
    }
  })
  this.router.navigate([link?.path]).then(()=>{
    // this.isSignedUp.set(true);
  })
 }

}

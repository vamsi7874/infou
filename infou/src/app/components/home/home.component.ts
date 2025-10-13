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
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // homeService = inject(HomecommonService);
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
  isSignedUp = signal(false);


  // signUppayload = this.homeService.signUpPayload

  isNavbarExpanded = false;

  toggleNavbar() {
    this.isNavbarExpanded = !this.isNavbarExpanded;
  }

  closeNavbar() {
    this.isNavbarExpanded = false;
  }

  onSubmit() {
    // this.signUppayload.set({email : this.email,password : this.password});

    this.onSignup({email : this.email(),password : this.password(),methodName : "auth-signUp",mobile : '9000900090' }).subscribe((res : any)=>{
      if(res?.status == 401){
        this.isSignedUp.set(false);
      }
      this.isSignedUp.set(true);
      this.routeToPath({path : "/home"})
      
    })
  }

  onSignup(data : any){

  return this.http.post('http://localhost:3000/app/commCall',data).pipe(res=>res);

 }

 routeToPath(link  :any){
  this.headerOptions().forEach((ele)=>{
    if(ele?.path == link?.path){
      ele.isActive = true
    }
  })
  this.router.navigate([link?.path]).then(()=>{
    this.isSignedUp.set(true);
  })
 }

}

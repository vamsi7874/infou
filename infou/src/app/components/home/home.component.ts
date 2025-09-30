import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { HomecommonService } from './homecommon.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';
import { SignedupscrrenComponent } from '../signedupscrren/signedupscrren.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule,SignedupscrrenComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // homeService = inject(HomecommonService);
constructor(private http : HttpClient,private router : Router){

}

headerOptions = signal<any[]>([{
  path : "/",isActive : true,name : "Home"
},{
  path : "/contacts",isActive : false,name : "Contacts"
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
      
    })
  }

  onSignup(data : any){

  return this.http.post('http://localhost:3000/app/commCall',data).pipe(res=>res);

 }

 routeToPath(path  :string){
  this.router.navigate([path]).then(()=>{
    console.log(this.router?.events,"routeEvents");
    
  })

 }

}

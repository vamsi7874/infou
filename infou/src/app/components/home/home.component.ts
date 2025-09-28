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



  email = signal('');
  password = signal('');
  isSignedUp = signal(true);

  // signUppayload = this.homeService.signUpPayload

  onSubmit() {
    // this.signUppayload.set({email : this.email,password : this.password});

    this.onSignup({email : this.email(),password : this.password(),methodName : "auth-signUp",mobile : '9000900090' }).subscribe((res : any)=>{
      if(res?.acknowledged){
        this.isSignedUp.set(true);
         
        

      }
      
    })
  }

  onSignup(data : any){

  return this.http.post('http://localhost:3000/app/commCall',data).pipe(res=>res);

 }

}

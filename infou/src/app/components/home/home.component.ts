import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { HomecommonService } from './homecommon.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // homeService = inject(HomecommonService);
constructor(private http : HttpClient){

}



  email = signal('');
  password = signal('');

  // signUppayload = this.homeService.signUpPayload

  onSubmit() {
    // this.signUppayload.set({email : this.email,password : this.password});

    this.onSignup({email : this.email,password : this.password,methodName : "auth-signUp",mobile : '9000900090' }).subscribe((res)=>{
      console.log(res,"responseAdded");
      
    })
  }

  onSignup(data : any){

  return this.http.post('http://localhost:3000/app/commCall',data).pipe(res=>res);

 }

}

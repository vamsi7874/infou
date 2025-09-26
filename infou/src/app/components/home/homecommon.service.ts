import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class HomecommonService {

  signUpPayload = signal<any>(null);

   private http = inject(HttpClient); 

  constructor() { 

  }

 

 onLogin(){
  
 }

 
}

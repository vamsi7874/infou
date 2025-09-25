import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomecommonService {

  constructor(private http : HttpClient) { 

  }

  onSignup(email : string,password : string){
    if(!email || !password || (email === password)){
      return
    }

    


  }
}

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-contactinfou',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './contactinfou.component.html',
  styleUrl: './contactinfou.component.css'
})
export class ContactinfouComponent {

  http = inject(HttpClient);

  constructor(){

  }

  schedulerOpts = signal([ {name : "Weather",key : "weather",icon : '<i class="fa-solid fa-cloud"></i>'} , {name : "Finanace",key : "finance",icon : '<i class="fa-solid fa-coins"></i>'},
 {name : "Disaster Funds",key : "disasterfunds",icon:'<i class="fa-solid fa-wheat-awn-circle-exclamation"></i>'},{name : "Horti Cultural Crops" ,key : "horticrops",icon : '<i class="fa-solid fa-building-wheat"></i>'} ])

 
 onClickScheduler(key : string | undefined){

  const uri = 'http://localhost:3000/app/commCall'
  const payload = {
    key : key,
    methodName : "datajobs-startScheduler"
  }

  this.http.post(uri,payload).subscribe((res)=>{
    window.alert("Scheduled Successfully..");
  })

} 
}

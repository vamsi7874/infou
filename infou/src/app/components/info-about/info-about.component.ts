import { Component, signal } from '@angular/core';
import { environtment } from '../../../environment';



@Component({
  selector: 'app-info-about',
  standalone: true,
  imports: [],
  templateUrl: './info-about.component.html',
  styleUrl: './info-about.component.css'
})
export class InfoAboutComponent {

  appInfo = signal<any>({
    version : environtment.version,
    deployedAt : 'Firebase',
    nxtDeploymentDate : new Date().getDate() + 1,
    isScheduleEnable : true,
    cms : "Strapi Open Source" 

  })

}

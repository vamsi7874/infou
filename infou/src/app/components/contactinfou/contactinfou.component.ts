import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-contactinfou',
  standalone: true,
  imports: [HttpClientModule, DatePipe],
  templateUrl: './contactinfou.component.html',
  styleUrl: './contactinfou.component.css',
})
export class ContactinfouComponent implements OnInit {
  http = inject(HttpClient);
  cronLogs = signal<any[]>([]);

  constructor() {}

  schedulerOpts = signal([
    {
      name: 'Weather',
      key: 'weather',
      icon: '<i class="fa-solid fa-cloud"></i>',
    },
    {
      name: 'Finanace',
      key: 'finance',
      icon: '<i class="fa-solid fa-coins"></i>',
    },
    {
      name: 'Disaster Funds',
      key: 'disasterfunds',
      icon: '<i class="fa-solid fa-wheat-awn-circle-exclamation"></i>',
    },
    {
      name: 'Horti Cultural Crops',
      key: 'horticrops',
      icon: '<i class="fa-solid fa-building-wheat"></i>',
    },
  ]);

  ngOnInit(): void {
    this.getCronLogs();
  }

  onClickScheduler(key: string | undefined) {
    const uri = 'http://localhost:3000/app/commCall';
    // const uri = 'https://infouapi.onrender.com/app/commCall';
    const payload = {
      key: key,
      methodName: 'datajobs-startScheduler',
    };

    this.http.post(uri, payload).subscribe((res) => {
      window.alert('Scheduled Successfully..');
    });
  }

  getCronLogs() {
    const uri = 'http://localhost:3000/app/commCall';
    // const uri = 'https://infouapi.onrender.com/app/commCall';
    const payload = {
      methodName: 'logs-getLogsData',
    };

    this.http.post(uri, payload).subscribe((res: any) => {
      if (res?.length) {
        //can implement in back end also
        const refreshed = res?.filter((ele: any) => ele?.cron_type != null);
        this.cronLogs.set(refreshed);
      }
    });
  }
}

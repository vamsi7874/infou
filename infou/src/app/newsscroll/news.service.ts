import { inject, Injectable, signal } from '@angular/core';
import { environtment } from '../../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private http = inject(HttpClient);
  newsData = signal<any[]>([]);

  constructor() {}

  getNews() {
    let url = environtment.baseUrl + '/commCall';
    let body = {
      methodName: 'news-fetchNewsDataToday',
    };

    this.http.post(url, body).subscribe((res: any) => {
      this.newsData.set(res['data']);
    });
  }
}

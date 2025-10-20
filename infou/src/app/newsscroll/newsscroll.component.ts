import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { environtment } from '../../environment';
import { NewsService } from './news.service';
import { single } from 'rxjs';

export type NewsItem = {
  image: string;
  title: string;
  desc: string;
};

@Component({
  selector: 'app-newsscroll',
  standalone: true,
  imports: [],
  providers: [NewsService],
  templateUrl: './newsscroll.component.html',
  styleUrl: './newsscroll.component.css',
})
export class NewsscrollComponent implements OnInit {
  private newService = inject(NewsService);
  newsData = this.newService.newsData;

  constructor() {}

  ngOnInit(): void {
    this.newService.getNews();
  }
}

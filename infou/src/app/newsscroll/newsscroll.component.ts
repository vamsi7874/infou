import { Component, computed, inject } from '@angular/core';
import { NewsService } from './news.service';
import { TitleCasePipe } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HttpClientModule } from '@angular/common/http'; // Only if not provided globally

export type NewsItem = {
  image: string;
  title: string;
  desc: string;
};

@Component({
  selector: 'app-newsscroll',
  standalone: true,
  imports: [TitleCasePipe, NgxSkeletonLoaderModule],
  providers: [NewsService],
  templateUrl: './newsscroll.component.html',
  styleUrl: './newsscroll.component.css',
})
export class NewsscrollComponent {
  private newService = inject(NewsService);
  newsData = this.newService.newsData;

  topics = computed(() => this.newsData() && Object.keys(this.newsData()));

  constructor() {
    this.newService.getNews();
  }

  getTopicsData(topic: string): any[] {
    return this.newsData()?.[topic]?.articles?.slice(1, 11) || [];
  }
}

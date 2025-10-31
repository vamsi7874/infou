import { TitleCasePipe } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WeatherComponent } from '../../weather/weather.component';
import {
  NewsItem,
  NewsscrollComponent,
} from '../../newsscroll/newsscroll.component';
import { NewsService } from '../../newsscroll/news.service';
import {
  NgbCarousel,
  NgbCarouselModule,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signedupscrren',
  standalone: true,
  imports: [
    RouterModule,
    TitleCasePipe,
    WeatherComponent,
    NewsscrollComponent,
    NgbCarouselModule,
  ],
  templateUrl: './signedupscrren.component.html',
  styleUrl: './signedupscrren.component.css',
})
export class SignedupscrrenComponent implements OnInit {
  private router = inject(ActivatedRoute);
  private newService = inject(NewsService);
  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;
  constructor() {
    effect(() => {
      let routes = this.routerChanges$();
    });
  }

  routerChanges$ = toSignal(this.router.queryParamMap.pipe());
  userData: any;
  userName = signal<string>('');
  newsData = this.newService.newsData;
  pauseOnHover = true;
  pauseOnFocus = true;
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;

  preparedData = computed(() => {
    if (this.newsData()) {
      return this.preparedDataSlides(this.newsData());
    }
    return [];
  });

  ngOnInit(): void {
    this.userData = localStorage.getItem('user-email');
    this.userName.set(this.userData.split('@')[0]);
    this.newService.getNews();
  }

  preparedDataSlides(data: Record<string, any>): NewsItem[] {
    const keys = ['ai', 'gold', 'stocks', 'india'];
    console.log(data, 'dataCom');

    return keys
      .map((key) => {
        const article = data[key]?.articles[0];
        if (!article) return null;
        return {
          desc: article.description,
          title: article.title,
          image: article.urlToImage,
        };
      })
      .filter((item): item is NewsItem => !!item);
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }
}

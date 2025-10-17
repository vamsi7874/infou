import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { environtment } from '../../environment';

@Component({
  selector: 'app-ai-interact',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './ai-interact.component.html',
  styleUrl: './ai-interact.component.css',
})
export class AiInteractComponent {
  data = signal('');
  message = new FormControl('');
  http = inject(HttpClient);
  isLoading = signal<boolean>(true);
  loaderHtml = ` <div class="d-flex flex-column justify-content-center align-items-center">
      <div class="spinner-grow text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div>
        <small class="text-secondary">Gemini is Laoding</small>
      </div>
    </div>`;

  getAiResponse() {
    this.data.set(this.loaderHtml);

    let url = environtment.baseUrl + '/commCall';
    let payload = {
      methodName: 'ai-getAiResponse',
      message: this.message.value,
    };

    this.http.post(url, payload).subscribe((res: any) => {
      this.message.reset();
      this.data.set(res?.response.trim(''));
      this.isLoading.set(false);
    });
  }
}

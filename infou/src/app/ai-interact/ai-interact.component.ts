import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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

  getAiResponse() {
    console.log('kdsjfsjdf');

    let url = 'http://localhost:3000/app/commCall';
    let payload = {
      methodName: 'ai-getAiResponse',
      message: this.message.value,
    };

    this.http.post(url, payload).subscribe((res: any) => {
      this.data.set(res?.response);
      console.log(this.data(), 'dd');
    });
  }
}

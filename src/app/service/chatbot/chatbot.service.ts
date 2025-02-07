import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions'; // ✅ URL correcta
  private apiKey = 'ss'; // ⚠️ No expongas tu API Key en el código

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    const body = {
      model: 'gpt-4o',  // Asegúrate de que el modelo es válido
      messages: [{ role: 'user', content: message }],
      max_tokens: 150
    };

    return this.http.post(this.apiUrl, body, { headers });
  }

  transcribeAudio(audioData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`, // Usa una clave válida
    });
  
    return this.http.post('https://api.openai.com/v1/audio/transcriptions', audioData, { headers });
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from './service/chatbot/chatbot.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messages: { text: string; sender: 'user' | 'bot' }[] = [];
  userInput: string = '';
  isNightMode: boolean = false;
  recording: boolean = false;
  private mediaRecorder!: MediaRecorder;
  private audioChunks: BlobPart[] = [];

  constructor(private chatbotService: ChatbotService) {}

  toggleNightMode() {
    this.isNightMode = !this.isNightMode;
    this.applyTheme();
  }

  applyTheme() {
    const body = document.body;
    if (this.isNightMode) {
      body.setAttribute('data-theme', 'dark');
    } else {
      body.setAttribute('data-theme', 'light');
    }
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.messages.push({ text: this.userInput, sender: 'user' });

    this.chatbotService.sendMessage(this.userInput).subscribe((response) => {
      const botReply = response.choices[0].message.content;
      this.messages.push({ text: botReply, sender: 'bot' });
    });

    this.userInput = '';
  }
  

  onFileUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      alert(`File uploaded: ${file.name}`);
      // Handle file upload logic here
    }
  }
  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];
      this.recording = true;

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        this.recording = false;
        this.processAudio();
      };

      this.mediaRecorder.start();
    }).catch((error) => console.error('Error al acceder al micrófono:', error));
  }

  stopRecording() {
    if (this.mediaRecorder && this.recording) {
      this.mediaRecorder.stop();
    }
  }

  processAudio() {
    const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
  
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.webm'); // Asegurar nombre y tipo
    formData.append('model', 'whisper-1'); // Modelo de OpenAI para transcripción
  
    this.chatbotService.transcribeAudio(formData).subscribe({
      next: (response) => {
        this.userInput = response.text; // Captura la transcripción
        this.sendMessage();
      },
      error: (err) => {
        console.error('Error en la transcripción:', err);
      },
    });
  }
  
}
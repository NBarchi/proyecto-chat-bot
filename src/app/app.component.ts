import { CommonModule, NgClass, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, NgClass,NgForOf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isNightMode: boolean = false;
  messages: { text: string, isUser: boolean }[] = [];
  userInput: string = '';

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
    if (this.userInput.trim()) {
      this.messages.push({ text: this.userInput, isUser: true });
      const userMessage = this.userInput; // Guarda el mensaje del usuario
      this.userInput = '';
  
      // Simula la respuesta del AI (reemplaza esto con tu lógica real si es necesario)
      setTimeout(() => {
        const aiResponse = 'Esta es una respuesta simulada de AI.';
        this.messages.push({ text: aiResponse, isUser: false });
      }, 1000);
    }
  }
  

  onFileUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      alert(`File uploaded: ${file.name}`);
      // Handle file upload logic here
    }
  }
}
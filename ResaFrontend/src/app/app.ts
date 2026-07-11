import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './components/home/home';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Home, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = signal('Resa App - Citazioni e Riflessioni');

  ngOnInit(): void {
    // L'applicazione è pronta all'avvio
    console.log('Resa App caricata con successo!');
  }
}


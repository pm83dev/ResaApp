import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResaApiService } from '../../service/resaApi.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit, OnDestroy {
  public title: string = 'ResaFrontend';
  allQuotesSubscription: any;

  constructor(public resaApiService: ResaApiService) {}

  ngOnInit(): void {
    // Carica la citazione casuale e tutte le citazioni
    this.resaApiService.loadQuote();
    this.resaApiService.loadAllQuotes();
  }

  getNewQuote(): void {
    // Carica una nuova citazione casuale
    this.resaApiService.loadRandomQuote();
  }

  ngOnDestroy(): void {
    // Pulisci la subscription per evitare memory leak
    this.allQuotesSubscription?.unsubscribe();
  }
}

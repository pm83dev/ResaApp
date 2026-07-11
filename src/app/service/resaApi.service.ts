import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, of } from 'rxjs';
import { QuoteModel } from '../models/model';

/**
 * Servizio per la gestione delle chiamate API relative alle citazioni.
 * Utilizza i segnali (Signals) di Angular per gestire lo stato in modo reattivo.
 */
@Injectable({
  providedIn: 'root', // Rende il servizio disponibile globalmente nell'applicazione
})
export class ResaApiService {
  /**
   * Segnale che contiene l'oggetto della citazione corrente.
   * Inizialmente impostato a null.
   */
  public quote = signal<QuoteModel | null>(null);

  /**
   * Segnale che contiene il messaggio di errore, se presente.
   * Inizialmente impostato a null.
   */
  public errorMessage = signal<string | null>(null);

  /**
   * Costruttore del servizio.
   * @param http Client HTTP di Angular per effettuare le richieste asincrone.
   */
  constructor(private readonly http: HttpClient) {}

  /** URL dell'endpoint API per recuperare la citazione */
  private readonly API_URL = 'https://localhost:7261/api/quote/get-quote';

  /**
   * Esegue la richiesta HTTP GET verso l'API.
   * Gestisce gli errori tramite l'operatore catchError di RxJS.
   * @returns Un Observable contenente il modello della citazione o null in caso di errore.
   */
  getQuoteFromApi() {
    return this.http.get<QuoteModel>(this.API_URL).pipe(
      catchError((error) => {
        // Log dell'errore nella console per debugging
        console.error('Errore API:', error);

        // Aggiorna il segnale dell'errore con un messaggio leggibile dall'utente
        this.errorMessage.set('Impossibile caricare la citazione. Controlla la connessione.');

        // Restituisce un Observable di null per evitare che l'applicazione crashi
        return of(null);
      }),
    );
  }

  getQuoteById(id: number) {
    return this.http.get<QuoteModel>(`https://localhost:7261/api/quote/get-quote-by-id/${id}`).pipe(
      catchError((error) => {
        console.error('Errore API:', error);
        this.errorMessage.set('Impossibile caricare la citazione. Controlla la connessione.');
        return of(null);
      }),
    );
  }

  /**
   * Metodo pubblico per avviare il caricamento della citazione.
   * Gestisce la logica di reset dello stato e l'iscrizione (subscription) al flusso dati.
   */
  loadQuote() {
    // Pulisce eventuali messaggi di errore precedenti prima di iniziare la nuova chiamata
    this.errorMessage.set(null);

    // Iscrizione alla chiamata API
    this.getQuoteFromApi().subscribe((data) => {
      // Se i dati sono stati ricevuti correttamente (non null), aggiorna il segnale della citazione
      if (data) {
        this.quote.set(data);
      }
    });
  }
}

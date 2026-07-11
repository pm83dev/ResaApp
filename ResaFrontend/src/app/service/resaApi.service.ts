import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, of } from 'rxjs';
import { QuoteModel, DataQuotesModel } from '../models/model';


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

  public allQuotes = signal<DataQuotesModel>({ quotes: [] });

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

  /** Endpoint per ottenere una citazione specifica tramite ID */
  getQuoteById(id: number) {
    return this.http.get<QuoteModel>(`https://localhost:7261/api/quote/get-quote-by-id/${id}`).pipe(
      catchError((error) => {
        console.error('Errore API:', error);
        this.errorMessage.set('Impossibile caricare la citazione. Controlla la connessione.');
        return of(null);
      }),
    );
  }

  /** Endpoint per le citazioni casuali */
  private readonly RANDOM_QUOTE_URL = 'https://localhost:7261/api/quote/get-random-quote';

  getRandomQuoteFromApi() {
    return this.http.get<QuoteModel>(this.RANDOM_QUOTE_URL).pipe(
      catchError((error) => {
        console.error('Errore API:', error);
        this.errorMessage.set('Impossibile caricare la citazione casuale. Controlla la connessione.');
        return of(null);
      }),
    );
  }

  /** Endpoint per ottenere tutte le citazioni */
  getAllQuotesApi() {
    return this.http.get<DataQuotesModel>('https://localhost:7261/api/quote/get-all-quotes').pipe(
      catchError((error) => {
        console.error('Errore API:', error);
        this.errorMessage.set('Impossibile caricare le citazioni. Controlla la connessione.');
        return of({ quotes: [] });
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

  /** Metodo pubblico per avviare il caricamento di tutte le citazioni. */
  loadAllQuotes() {
    this.errorMessage.set(null);
    this.getAllQuotesApi().subscribe((data) => {
      if (data) {
        this.allQuotes.set(data);
      }
    });
  }

  /** Metodo pubblico per caricare una citazione casuale */
  loadRandomQuote() {
    this.errorMessage.set(null);
    this.getRandomQuoteFromApi().subscribe((data) => {
      if (data) {
        this.quote.set(data);
      }
    });
  }
}

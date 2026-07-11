using Microsoft.AspNetCore.Mvc;
using ResaBackend.Dto;
using ResaBackend.Models;

namespace ResaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuoteController : ControllerBase
    {
        private readonly List<QuoteModel> _quotes = new()
        {
            new QuoteModel { id = 1, quote = "L'imperfezione è libertà.", author = "Il Paradosso della Resa" },
            new QuoteModel { id = 2, quote = "La vita è un'opera d'arte.", author = "Albert Einstein" },
            new QuoteModel { id = 3, quote = "L'errore è il passo verso la perfezione.", author = "Confucio" },
            new QuoteModel { id = 4, quote = "Il successo è la somma di piccoli sforzi.", author = "Ralph Waldo Emerson" },
            new QuoteModel { id = 5, quote = "La felicità non è qualcosa di pronto. Viene dalle tue azioni.", author = "Dalai Lama" },
            new QuoteModel { id = 6, quote = "Non smettere mai di imparare, perché la vita non smette mai di insegnare.", author = "Anonimo" },
            new QuoteModel { id = 7, quote = "La creatività è l'intelligenza che si diverte.", author = "Albert Einstein" },
            new QuoteModel { id = 8, quote = "Il coraggio non è l'assenza di paura, ma la capacità di agire nonostante la paura.", author = "Mark Twain" },
            new QuoteModel { id = 9, quote = "La vita è ciò che accade mentre sei impegnato a fare altri piani.", author = "John Lennon" },
        };

        /// <summary>
        /// Restituisce una singola citazione predefinita (la prima della lista) nel formato richiesto dal frontend.
        /// </summary>
        [HttpGet("get-quote")]
        public IActionResult Get()
        {
            // Restituisce i dati nel formato atteso dal frontend
            return Ok(new QuoteDto
            {
                id = _quotes[0].id,
                quote = _quotes[0].quote,
                description = "Una riflessione profonda sul perfezionismo e la libertà.",
                author = _quotes[0].author,
                category = "Filosofia"
            });
        }

        /// <summary>
        /// Recupera tutte le citazioni presenti nella lista e le restituisce mappate nel formato richiesto.
        /// </summary>
        [HttpGet("get-all-quotes")]
        public IActionResult GetAll()
        {


            return Ok(new DataQuotesDto
            {
                quotes = _quotes.Select(q => new QuoteDto
                {
                    id = q.id,
                    quote = q.quote,
                    description = $"Descrizione della citazione di {q.author}",
                    author = q.author,
                    category = "Generale"
                }).ToList()
            });
        }

        /// <summary>
        /// Recupera una specifica citazione in base al suo identificativo univoco (ID).
        /// </summary>
        [HttpGet("get-quote-by-id/{id}")]
        public IActionResult GetById(int id)
        {
            var quote = _quotes.FirstOrDefault(q => q.id == id);
            if (quote == null)
            {
                return NotFound(new { message = $"Quote con id {id} non trovata." });
            }

            return Ok(new QuoteDto
            {
                id = quote.id,
                quote = quote.quote,
                description = $"Descrizione della citazione di {quote.author}",
                author = quote.author,
                category = "Generale"
            });
        }

        /// <summary>
        /// Seleziona e restituisce una citazione casuale dalla lista disponibile.
        /// </summary>
        [HttpGet("get-random-quote")]
        public IActionResult GetRandom()
        {
            int randomIndex = Random.Shared.Next(_quotes.Count);
            var randomQuote = _quotes[randomIndex];

            return Ok(new QuoteDto
            {
                id = randomQuote.id,
                quote = randomQuote.quote,
                description = $"Una citazione casuale di {randomQuote.author}",
                author = randomQuote.author,
                category = "Casuale"
            });
        }

        /// <summary>
        /// Aggiunge una nuova citazione alla lista assegnandole un ID incrementale.
        /// </summary>
        [HttpPost("add-quote")]
        public IActionResult Add([FromBody] QuoteModel newQuote)
        {
            newQuote.id = GenerateId();
            _quotes.Add(newQuote);

            return Ok(new QuoteDto
            {
                id = newQuote.id,
                quote = newQuote.quote,
                description = $"Nuova citazione aggiunta da {newQuote.author}",
                author = newQuote.author,
                category = "Nuova"
            });
        }

        /// <summary>
        /// Aggiorna i dettagli di una citazione esistente basandosi sull'ID fornito.
        /// </summary>
        [HttpPut("update-quote/{id}")]
        public IActionResult Update(int id, [FromBody] QuoteModel updatedQuote)
        {
            var quote = _quotes.FirstOrDefault(q => q.id == id);
            if (quote == null)
            {
                return NotFound(new { message = $"Quote con id {id} non trovata." });
            }

            quote.quote = updatedQuote.quote;
            quote.author = updatedQuote.author;

            return Ok(new QuoteDto
            {
                id = quote.id,
                quote = quote.quote,
                description = $"Quote aggiornata da {updatedQuote.author}",
                author = quote.author,
                category = "Aggiornata"
            });
        }

        /// <summary>
        /// Rimuove una citazione dalla lista in base al suo identificativo univoco (ID).
        /// </summary>
        [HttpDelete("delete-quote/{id}")]
        public IActionResult Delete(int id)
        {
            var quote = _quotes.FirstOrDefault(q => q.id == id);
            if (quote == null)
            {
                return NotFound(new { message = $"Quote con id {id} non trovata." });
            }

            _quotes.Remove(quote);
            return Ok(new QuoteDto
            {
                id = quote.id,
                quote = quote.quote,
                description = $"Quote con id {id} cancellata con successo.",
                author = quote.author,
                category = "Cancellata"
            });
        }

        /// <summary>
        /// Genera un nuovo ID univoco basandosi sul valore massimo attuale nella lista.
        /// </summary>
        private int GenerateId()
        {
            return _quotes.Any() ? _quotes.Max(q => q.id) + 1 : 1;
        }
    }
}
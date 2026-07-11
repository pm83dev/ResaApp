using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

// Crea il builder dell'applicazione per configurare i servizi e l'host
var builder = WebApplication.CreateBuilder(args);

// Aggiunge il supporto ai controller API
builder.Services.AddControllers();

// Configura la politica CORS per permettere richieste da qualsiasi origine, metodo e header
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

// Aggiunge i servizi necessari per l'esplorazione degli endpoint e la generazione di Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Costruisce l'applicazione basandosi sulle configurazioni dei servizi
var app = builder.Build();

// Se l'ambiente è di sviluppo, abilita le interfacce Swagger per la documentazione API
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Forza il reindirizzamento verso connessioni HTTPS sicure
app.UseHttpsRedirection();

// Abilita il servizio per servire file statici dalla cartella wwwroot
app.UseStaticFiles();

// Configura il sistema di routing dell'applicazione
app.UseRouting();

// Applica la politica CORS configurata precedentemente
app.UseCors();

// Abilita il middleware di autorizzazione
app.UseAuthorization();

// Middleware per gestire il routing di Angular
app.Use(async (context, next) =>
{
    var path = context.Request.Path.Value;

    // 1. Lascia passare le chiamate API (non devono essere intercettate)
    if (path != null && path.StartsWith("/api"))
    {
        await next();
        return;
    }

    // 2. Lascia passare Swagger e file statici (che hanno estensioni .js, .css, .png, ecc.)
    if (path != null && (path.StartsWith("/swagger") || path.Contains(".") || path.Contains("?")))
    {
        await next();
        return;
    }

    // 3. Se arriviamo qui, è una rotta di Angular (es: /dashboard, /login)
    var filePath = Path.Combine(app.Environment.WebRootPath, "index.html");

    if (System.IO.File.Exists(filePath))
    {
        context.Response.ContentType = "text/html";
        await context.Response.SendFileAsync(filePath);
    }
    else
    {
        context.Response.StatusCode = 404;
        await context.Response.WriteAsync("Pagina non trovata.");
    }
});

app.MapControllers();

app.Run();

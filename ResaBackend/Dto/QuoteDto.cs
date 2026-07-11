namespace ResaBackend.Dto;

public class QuoteDto
{
    public int id { get; set; }
    public string quote { get; set; }
    public string description { get; set; }
    public string author { get; set; }
    public string category { get; set; }
}

public class DataQuotesDto
{
    public List<QuoteDto> quotes { get; set; }
}
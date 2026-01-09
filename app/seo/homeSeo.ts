export const homeJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://example.com/#website",
      "url": "https://example.com",
      "name": "Nutri",
      "description": "Regista refeições, acompanha macros e recebe recomendações personalizadas com IA.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://example.com/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://example.com/#organization",
      "name": "Nutri",
      "url": "https://example.com",
      "contactPoint": [{
        "@type": "ContactPoint",
        "email": "suporte@nutriai.pt",
        "contactType": "customer support",
        "availableLanguage": ["Portuguese", "English"]
      }]
    },
    {
      "@type": "WebPage",
      "@id": "https://example.com/#webpage",
      "url": "https://example.com",
      "name": "Nutri — Alimentação Inteligente",
      "isPartOf": { "@id": "https://example.com/#website" }
    }
  ]
});

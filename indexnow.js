(async function(){
  // === CONFIGURAÇÕES ===
  const keyLocation = 'https://raw.githubusercontent.com/pejotta/blogueiros-united/main/indexnow.txt'; // URL completa do arquivo da chave
  const host = 'blogueirosunited.blogspot.com'; // Seu domínio (ou personalizado)
  const postLimit = 10; // Quantidade de posts a enviar
  const feedUrl = 'https://' + host + '/feeds/posts/default?alt=json&max-results=' + postLimit;

  try {
    const response = await fetch(feedUrl);
    const data = await response.json();

    if (!data.feed || !data.feed.entry) {
      console.warn("Nenhum post encontrado no feed!");
      return;
    }

    const urls = data.feed.entry.map(entry => entry.link.find(l => l.rel === 'alternate').href);
    console.log("URLs encontradas:", urls);

    const payload = {
      host: host,
      key: key,
      keyLocation: keyLocation,
      urlList: urls
    };

    const indexNowResponse = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });

    if (indexNowResponse.ok) {
      console.log("✅ URLs enviadas com sucesso ao IndexNow!");
    } else {
      console.error("❌ Falha no envio:", indexNowResponse.status);
    }
  } catch (error) {
    console.error("Erro geral:", error);
  }
})();

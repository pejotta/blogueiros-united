// Obtém referências aos elementos do DOM
const linkInput = document.getElementById('linkTarget');
const imageInput = document.getElementById('imageUpload');
const bannerPreview = document.getElementById('bannerPreview');
const outputCode = document.getElementById('outputCode');

// Armazenará a imagem em Base64
let imageBase64 = '';

// 1. Lógica para carregar a imagem e convertê-la para Base64
imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            // Guarda a imagem Base64
            imageBase64 = e.target.result;
            // Opcional: pré-visualiza a imagem assim que ela é carregada
            updatePreview(linkInput.value, imageBase64);
        };
        // Lê o arquivo como URL de dados (Base64)
        reader.readAsDataURL(file);
    } else {
        imageBase64 = '';
        updatePreview(linkInput.value, imageBase64);
    }
});

// 2. Função principal para gerar o banner e o código
function generateBanner() {
    const link = linkInput.value.trim() || '#'; // Usa '#' se o link estiver vazio
    
    if (!imageBase64) {
        alert("Por favor, carregue uma imagem para gerar o banner.");
        return;
    }

    // Atualiza a pré-visualização
    updatePreview(link, imageBase64);
    
    // Gera o código HTML final
    const htmlCode = generateHTML(link, imageBase64);
    
    // Exibe o código
    outputCode.value = htmlCode;
}

// Função para atualizar a pré-visualização na tela
function updatePreview(link, base64) {
    if (!base64) {
        bannerPreview.innerHTML = '<p>O seu banner aparecerá aqui após a configuração.</p>';
        return;
    }

    const bannerHtml = `
<a href="${link}" target="_blank" class="banner-content" rel="noopener noreferrer">
    <img src="${base64}" alt="Banner promocional" class="banner-image">
</a>
    `;
    
    bannerPreview.innerHTML = bannerHtml;
    // Estiliza a área de pré-visualização para mostrar o banner corretamente
    bannerPreview.style.border = 'none';
    bannerPreview.style.padding = '0';
}

// Função para montar a string HTML final
function generateHTML(link, base64) {
    // Atenção: O Base64 pode ser uma string MUITO LONGA!
    // Esta é a estrutura HTML/CSS mínima que o usuário irá copiar.
    return `<a href="${link}" target="_blank" style="display: block; line-height: 0;">
  <img src="${base64}" alt="Banner promocional" style="width: 100%; height: auto; display: block; border: 0;">
</a>`;
}

// Função para copiar o código para a área de transferência
function copyCode() {
    outputCode.select();
    outputCode.setSelectionRange(0, 99999); // Para mobile
    navigator.clipboard.writeText(outputCode.value).then(() => {
        alert("Código copiado para a área de transferência!");
    }).catch(err => {
        console.error('Erro ao copiar o código: ', err);
        alert("Não foi possível copiar o código. Por favor, copie manualmente.");
    });
}
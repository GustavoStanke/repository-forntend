// Referência aos elementos do DOM
const productList = document.getElementById("product-list");
const productCount = document.getElementById("product-count");
const sortOptions = document.getElementById("sortOptions");

// Função para carregar produtos com base na ordenação
async function loadProducts(order = "nome") {
    try {
        // Fazendo a requisição para a API, passando o parâmetro 'order'
        const response = await fetch(`http://localhost:8080/produto?order=${order}`);
    
        // Verificando se a requisição foi bem-sucedida
        if (!response.ok) {
          throw new Error("Erro ao acessar a API: " + response.status);
        }
    
        const products = await response.json();
    
        // Renderizando os produtos
        let htmlContent = "";
        products.forEach(product => {
          htmlContent += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <div class="card">
                <img src="${product.url || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${product.nome || 'Imagem do produto'}">
                <div class="card-body">
                  <h5 class="card-title">${product.nome || 'Produto sem nome'}</h5>
                  <p class="card-text">Preço: R$ ${product.preco || '0,00'}</p>
                </div>
              </div>
            </div>
          `;
        });
    
        // Atualizando o DOM com os produtos
        productList.innerHTML = htmlContent;
        productCount.textContent = `Total de produtos: ${products.length}`;
      } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
        productList.innerHTML = "<p class='text-danger'>Erro ao carregar produtos.</p>";
      }
}

// Carregando os produtos ao iniciar a página
window.onload = () => loadProducts();

// Evento de mudança no seletor de ordenação
sortOptions.addEventListener("change", (event) => {
    const selectedOrder = event.target.value;
    loadProducts(selectedOrder); // Carregar produtos com a ordenação selecionada
});

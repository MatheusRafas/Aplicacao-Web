function calcularTroco() {
    const valorCompra = parseInt(document.getElementById("valorCompra").value);
    const valorPago = parseInt(document.getElementById("valorPago").value);
    const notas = [100, 10, 1];
    const troco = {};
    let valorTroco = valorPago - valorCompra;

    for (const nota of notas) {
      const quantidadeNotas = Math.floor(valorTroco / nota);
      if (quantidadeNotas > 0) {
        troco[nota] = quantidadeNotas;
        valorTroco -= quantidadeNotas * nota;
      }
    }

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `<h2>Troco:</h2>`;
    for (const nota in troco) {
        resultado.innerHTML += `<p>Total da compra: R$${valorCompra}</p>`;  
      resultado.innerHTML += `<p>R$${nota}-${troco[nota]} nota(s)</p>`;
    }
}
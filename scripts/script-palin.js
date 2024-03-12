function findPalindromes() {
    const start = parseInt(document.getElementById('inicio').value);
    const end = parseInt(document.getElementById('fim').value);
    const palindromes = findPalindromesInRange(start, end);
    document.getElementById('result').innerHTML = `<h2>Números Palíndromos:</h2><ul>${palindromes.map(p => `<li>${p}</li>`).join('')}</ul>`;
  }

  function findPalindromesInRange(start, end) {
    const palindromes = [];
    for (let num = start; num <= end; num++) {
      const numStr = num.toString();
      if (numStr === numStr.split('').reverse().join('')) {
        palindromes.push(num);
      }
    }
    return palindromes;
  }
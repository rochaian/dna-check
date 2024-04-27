// services/apiService.ts

// const API_BASE_URL = 'http://localhost:3000';
const API_BASE_URL = 'https://dna-check-server.onrender.com'


export async function checkDna(dna: string[][]) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/checkdna`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dna }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to check DNA');
      }
  
      const result = await response.json(); // Lê o resultado da resposta
      console.log('Resultado da verificação de DNA:', result); // Exibe o resultado no console
  
      return result; // Retorna o resultado para uso futuro
    } catch (error) {
      console.error('Erro ao enviar DNA para a API:', error); // Captura e exibe erros
    }
  }
  
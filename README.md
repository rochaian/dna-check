# DNA Check - Frontend

O DNA Check é um aplicativo de frontend que permite aos usuários verificar sequências de DNA para padrões ou anomalias específicas. Este projeto é desenvolvido com [Next](https://nextjs.org/), utilizando [Tailwind CSS](https://tailwindcss.com/) para estilização e [TypeScript](https://www.typescriptlang.org/) para maior segurança de tipos.

Você pode testar o projeto acessando o link
[Frontend](https://dna-check.vercel.app/)
[Backend](https://dna-check-server.onrender.com)



## Configuração e Instalação

Para configurar o ambiente de desenvolvimento e instalar todas as dependências necessárias, siga estas etapas:

1. **Clone o Repositório**:
   Clone este repositório para seu ambiente local usando o comando:

   ```bash
   git clone https://github.com/rochaian/dna-check-frontend.git
   ```

2. **Navegue para a Pasta do Projeto**:
   ```bash
   cd dna-check-frontend
   ```

3. **Instale as Dependências**:
   Use npm para instalar as dependências necessárias para o projeto:

   ```bash
   npm install
   ```

## Desenvolvimento e Execução

Para iniciar o ambiente de desenvolvimento e visualizar o projeto, execute o seguinte comando:

```bash
npm run dev  # Inicia o servidor de desenvolvimento
```

Uma vez iniciado, o servidor de desenvolvimento deve estar disponível em `http://localhost:3000`. Abra esta URL no navegador para interagir com o projeto.

## Como usar ##

Ajuste o número de linhas e colunas, use as setas do teclado para navegar entre os campos de texto e insira caracteres representando as bases do DNA (A, T, C, G). Clique em "Check DNA" para verificar se há sequências de quatro letras iguais nas direções horizontais, verticais ou diagonais.
# 💳 Wallet App

Aplicação de gerenciamento de cartões digitais desenvolvida com Next.js 15, React 19 e TypeScript.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)

## 📋 Funcionalidades

- ✅ Visualizar cartões cadastrados
- ➕ Adicionar novos cartões
- ✏️ Editar informações dos cartões
- 🗑️ Excluir cartões
- 🎨 Personalizar cor do cartão
- 💳 Suporte para Visa, Mastercard e Amex
- 🔐 Tela de login simples

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+ instalado
- npm, yarn, pnpm ou bun

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd wallet
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Inicie o servidor JSON (Backend)**

Em um terminal, execute:
```bash
npm run json-server
```

Isso iniciará o json-server na porta `3001` e criará/monitorará o arquivo `db.json`.

4. **Inicie o aplicativo Next.js (Frontend)**

Em outro terminal, execute:
```bash
npm run dev
```

5. **Acesse a aplicação**

Abra seu navegador em [http://localhost:3000](http://localhost:3000)

## 📱 Como Usar

### Login
- Acesse a tela inicial
- Insira qualquer email e senha
- Clique em "Entrar" para acessar a carteira

### Gerenciar Cartões
- **Visualizar**: Os cartões aparecem na tela principal da carteira
- **Adicionar**: Clique no botão "+" no canto superior direito
- **Editar**: Clique em qualquer cartão para abrir o modal de edição
- **Excluir**: No modal de edição, clique em "Excluir"

## 🗂️ Estrutura do Projeto

```
wallet/
├── public/              # Imagens e assets estáticos
│   ├── bg.png          # Background da tela de login
│   ├── wbg.png         # Background da tela de carteira
│   └── logo.png        # Logo da aplicação
├── src/
│   ├── app/
│   │   ├── api/        # API Routes (alternativa ao json-server)
│   │   ├── wallet/     # Página da carteira
│   │   │   └── page.tsx
│   │   ├── page.tsx    # Página de login
│   │   ├── layout.tsx  # Layout principal
│   │   └── globals.css # Estilos globais
│   └── utils/
│       └── functions.js # Funções utilitárias
├── db.json             # Banco de dados JSON
├── package.json        # Dependências e scripts
└── tsconfig.json       # Configuração TypeScript
```

## 📦 Scripts Disponíveis

```bash
npm run dev          # Inicia o servidor de desenvolvimento Next.js
npm run build        # Cria build de produção
npm run start        # Inicia o servidor de produção
npm run lint         # Executa o linter
npm run json-server  # Inicia o json-server (backend)
```

## 🔧 Configuração do db.json

O arquivo `db.json` deve ter a seguinte estrutura:

```json
{
  "wallet": [
    {
      "id": 1,
      "name": "Nome do Titular",
      "number": "1234 5678 9012 3456",
      "expiry": "12/26",
      "color": "#690d9b",
      "brand": "visa"
    }
  ]
}
```

### Campos:
- `id`: Número único do cartão (obrigatório como número)
- `name`: Nome do titular
- `number`: Número do cartão
- `expiry`: Data de validade (MM/AA)
- `color`: Cor do cartão em hexadecimal
- `brand`: Bandeira (`visa`, `mastercard` ou `amex`)

## 🛠️ Tecnologias Utilizadas

- **Next.js 15.5.4** - Framework React
- **React 19.1.0** - Biblioteca UI
- **TypeScript 5** - Superset JavaScript tipado
- **Tailwind CSS 4** - Framework CSS utilitário
- **json-server 1.0.0** - API REST fake
- **Express 5.1.0** - Servidor HTTP (alternativa)

## ⚠️ Problemas Comuns

### Porta 3001 já em uso
Se você receber o erro `EADDRINUSE`:

**Windows:**
```powershell
# PowerShell (como Administrador)
netstat -ano | findstr :3001
taskkill /F /PID <PID>
```

**Linux/Mac:**
```bash
lsof -i :3001
kill -9 <PID>
```

### IDs como strings no db.json
Os IDs devem ser **números**, não strings:
```json
// ❌ Errado
"id": "1"

// ✅ Correto
"id": 1
```

## 🌐 Deploy

Para fazer deploy na Vercel:

1. Conecte seu repositório GitHub à Vercel
2. A Vercel detectará automaticamente o projeto Next.js
3. **Nota**: O json-server não funciona na Vercel. Use as API Routes em `src/app/api/` ou configure um banco de dados externo (Vercel KV, MongoDB, Supabase, etc.)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Guilherme França**

---

⭐ Se este projeto foi útil, deixe uma estrela!

# 📋 Cadastro de Casos de Teste

Sistema web construído em **Angular** para gerenciar **Casos de Teste**, **Clientes**, **Categorias** e **Responsáveis**. Ideal para organizar demandas de QA e acompanhar o status de testes em diferentes etapas do ciclo de desenvolvimento.

---

## 🚀 Funcionalidades

✅ Cadastro, edição e exclusão de:
- Clientes
- Categorias
- Responsáveis
- Casos de Teste

✅ Funcionalidades específicas:
- Filtro por Cliente, Categoria, Responsável, Estado e Impedimento
- Exportação de Casos de Teste para arquivo **Excel**
- Importação de Casos de Teste via planilha `.xlsx`
- Edição rápida de Estado e Impedimento no modo "Meus Testes"

---

## 🛠️ Tecnologias Utilizadas

- Angular 17+
- TypeScript
- HTML5 / CSS3
- PrimeNG (em algumas versões)
- XLSX (SheetJS) para importação/exportação
- FileSaver.js para download de arquivos
- Estrutura modular com `standalone components`

---

## 📂 Estrutura do Projeto

```bash
src/
├── app/
│   ├── components/
│   │   ├── cliente/
│   │   ├── categoria/
│   │   ├── responsavel/
│   │   ├── teste/
│   │   ├── meus-testes/
│   │   └── relatorio/
│   ├── models/
│   └── services/
└── assets/
```

---

## ▶️ Como Executar Localmente

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. **Instale as dependências**:
   ```bash
   cd cadastro-casos-teste
   npm install
   ```

3. **Execute o projeto**:
   ```bash
   ng serve
   ```

4. Acesse em:
   ```
   http://localhost:4200
   ```

---

## 📦 Gerar Build de Produção

```bash
ng build --configuration production
```

Os arquivos finais estarão na pasta `dist/`.

---

## 📁 Importação via Excel

- A planilha de importação deve conter as colunas:

| ID | Nome | Cliente | Categoria | Responsável | Estado | Impedimento | Data Criação | Data Finalização |
|----|------|---------|-----------|-------------|--------|-------------|---------------|------------------|

- Campos como Cliente, Categoria e Responsável devem corresponder exatamente aos nomes já cadastrados no sistema.

📷 **Exemplo de Importação:**
![Importação](./assets/exemplo-importacao.png)

---

## 📤 Exportação

- O botão **Exportar** está disponível na tela de Relatórios.
- Gera automaticamente uma planilha `.xlsx` com os testes filtrados.

📷 **Exemplo de Exportação:**
![Exportação](./assets/exemplo-exportacao.png)

---

## 🧪 Próximos Passos

- Autenticação de usuários
- Integração com backend em Java Spring Boot
- Validações automáticas nas planilhas
- Paginação nas tabelas
- Implementação de testes automatizados (Unit e E2E)

---

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Abra uma issue ou envie um pull request.

---

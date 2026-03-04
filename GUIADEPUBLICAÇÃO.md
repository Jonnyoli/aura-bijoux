# Guia de Publicação: GitHub & Vercel 🚀

Este guia vai ajudar-te a colocar a **Aura Bijoux** online, passo a passo, desde o teu computador até ao domínio oficial.

---

## 1. Preparação (Git)
Se ainda não tens o Git instalado, descarrega e instala em: [git-scm.com](https://git-scm.com/).

### No teu computador:
Abre o terminal na pasta do projeto (`WORK`) e executa:

```bash
# 1. Iniciar o repositório
git init

# 2. Adicionar todos os ficheiros
git add .

# 3. Criar a primeira "versão"
git commit -m "feat: aura bijoux initial launch v1.0"
```

---

## 2. No GitHub
1. Vai ao [github.com](https://github.com/) e faz login.
2. Clica no botão **"+"** (topo direito) -> **"New repository"**.
3. Nome: `aura-bijoux` (ou outro à tua escolha).
4. Mantém como **Public** ou **Private** (não marques "Initialize with README").
5. Clica em **"Create repository"**.

### Ligar o computador ao GitHub:
Copia as linhas que aparecem na página do repositório (exemplo):

```bash
git remote add origin https://github.com/O-TEU-USER/aura-bijoux.git
git branch -M main
git push -u origin main
```

---

## 3. No Vercel
1. Vai a [vercel.com](https://vercel.com/) e cria conta usando o teu **GitHub**.
2. Clica em **"Add New"** -> **"Project"**.
3. O Vercel vai mostrar os teus repositórios do GitHub. Escolhe o `aura-bijoux` e clica em **"Import"**.
4. **Framework Preset**: Seleciona **Vite** (geralmente é detetado automaticamente).
5. Clica em **"Deploy"**.

---

## ✅ Concluído!
Sempre que fizeres alterações no código e quiseres atualizar o site, basta fazer:

```bash
git add .
git commit -m "descrição da alteração"
git push
```
O Vercel atualizará o site **automaticamente** em poucos segundos! 🥂✨

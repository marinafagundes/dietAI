# DietaAI

Este projeto é um aplicativo React Native que gera dietas personalizadas com base nos dados do usuário. Ele se comunica com um backend para processar as informações e retornar um plano alimentar.

## 📋 Requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- Node.js (versão 16 ou superior)
- npm (Node Package Manager)
- Expo CLI (`npm install -g expo-cli`)

## 🚀 Instalação

### 1️⃣ Clonar o repositório

```sh
git clone <URL_DO_REPOSITORIO>
cd dietAI
```

### 2️⃣ Instalar dependências do mobile

```sh
cd mobile
npm install
```

### 3️⃣ Instalar dependências do backend

Acesse a pasta do backend e instale as dependências:

```sh
cd backend
npm install
```

### 4️⃣ Configurar variáveis de ambiente

#### Backend

Crie um arquivo `.env` na raiz do backend e adicione:

```sh
API_KEY=your_api_key_here
```

💡 **Atenção:**

- A API\_KEY pode ser obtida no [Google AI Studio](https://aistudio.google.com/). Após criar uma conta, vá até a seção de chaves de API e gere uma nova chave.

### 5️⃣ Ajustar a baseURL da API no mobile

O endereço da API está definido no arquivo `services/api.ts`, dentro da pasta `mobile`. Verifique e, se necessário, altere a `baseURL` para apontar para o backend corretamente.

```ts
import axios from "axios";

export const api = axios.create({
    baseURL: "http://SEU_IP_LOCAL:3333"
});
```

💡 **Atenção:** Substitua `SEU_IP_LOCAL` pelo IP da sua máquina na rede local.

## 🔥 Rodando o projeto

### Iniciar o backend

```sh
cd backend
npm run dev
```

### Iniciar o mobile

```sh
cd mobile
npx expo start
```

Isso abrirá o Expo DevTools no navegador. No seu celular, escaneie o QR Code com o aplicativo Expo Go (disponível na Play Store e App Store) para testar o app. Além disso, você também pode abrir o app em um:

- [Development Build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), uma sandbox limitada para testar apps Expo

## ❌ Possíveis Erros

1️⃣ **Erro 404 ao chamar a API**\
✅ Verifique se o backend está rodando corretamente.

2️⃣ **Erro de conexão com a API**\
✅ Certifique-se de que a `baseURL` no `api.ts` está correta e que o IP é acessível pela rede.

3️⃣ **Problemas com o Expo Go**\
✅ Tente limpar o cache do Expo:

```sh
npx expo start --clear
```

## 📌 Notas finais

- Este projeto utiliza `react-query` para chamadas assíncronas à API.
- O backend roda na porta `3333`, conforme definido no código-fonte (`host: "0.0.0.0", port: 3333`).
- Se precisar rodar em um emulador, use `adb reverse tcp:3333 tcp:3333` (para Android) ou mapeie o IP corretamente no iOS.
- Para conseguir uma API\_KEY do Gemini, acesse [Google AI Studio](https://aistudio.google.com/) e gere sua chave.

Caso tenha dúvidas, abra uma issue ou entre em contato com o time! 🚀


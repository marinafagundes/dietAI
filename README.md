# DietAI

Este projeto é um aplicativo React Native que gera dietas personalizadas com base nos dados do usuário. Ele se comunica com um backend e com a API do Gemini para processar as informações e retornar um plano alimentar.

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

#### Mobile

Crie um arquivo `.env` na raiz da pasta `mobile` com o seguinte conteúdo:

```env
EXPO_PUBLIC_API_URL=http://192.168.X.X:3333

```

💡 💡 **Atenção:** Substitua o valor de `EXPO_PUBLIC_API_URL` pelo IP da sua máquina na rede local, como `http://192.168.1.100:3333`.


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

## 🔐 Segurança e variáveis

Certifique-se de que os arquivos .env não sejam versionados. Eles já estão ignorados no .gitignore.

### Exemplos de arquivos .env
```sh
backend/.env.example

API_KEY=your_api_key_here
```
```sh
mobile/.env.example

EXPO_PUBLIC_API_URL=http://192.168.X.X:3333
```

## 📌 Notas finais

- O backend roda na porta 3333 com host: "0.0.0.0", acessível na rede local.
- O frontend utiliza axios e react-query para comunicação assíncrona com a API.
- Em emuladores Android: use adb reverse tcp:3333 tcp:3333 para redirecionar a porta.
- A API_KEY utilizada no backend deve ser gerada em Google AI Studio.

Para dúvidas, sugestões ou bugs, abra uma issue ou entre em contato com o time. 🚀




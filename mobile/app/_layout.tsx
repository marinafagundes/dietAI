/**
 * @file RootLayout.tsx
 * @description Componente principal que define a estrutura de navegação do aplicativo.
 */
import { Stack } from "expo-router";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

/**
 * RootLayout é o componente responsável por definir a estrutura de navegação do aplicativo.
 * Ele utiliza `expo-router` para gerenciar as telas e `react-query` para o gerenciamento de estados assíncronos.
 *
 * @returns {JSX.Element} Provedor do `QueryClient` e stack de navegação.
 */
export default function RootLayout() {
  // Instância do QueryClient para gerenciamento global de estado assíncrono
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        {/* Tela inicial do aplicativo */}
        <Stack.Screen 
          name="index" 
          options={{
            headerShown: false
          }}
        />

        {/* Tela do primeiro passo do processo */}
        <Stack.Screen 
          name="step/index" 
          options={{
            headerShown: false
          }}
        />

        {/* Tela de criação de dietas */}
        <Stack.Screen 
          name="create/index" 
          options={{
            headerShown: false
          }}
        />     

         {/* Tela de nutrição */}
        <Stack.Screen 
          name="nutrition/index" 
          options={{
            headerShown: false
          }}
        />      
      </Stack>
    </QueryClientProvider>
  );
}
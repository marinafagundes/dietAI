/**
 * @file api.ts
 * @description Configuração da instância do Axios para comunicação com a API do backend.
 * @module api
 */
import axios from "axios";

/**
 * Instância do Axios pré-configurada para realizar requisições à API.
 * 
 * A `baseURL` deve ser ajustada para o endereço correto do servidor backend.
 * No ambiente local, o IPv4 da máquina deve ser especificado para permitir a comunicação correta.
 * 
 * **Exemplo de uso:**
 * ```tsx
 * import { api } from './api';
 * 
 * async function fetchData() {
 *   try {
 *     const response = await api.get('/endpoint');
 *     console.log(response.data);
 *   } catch (error) {
 *     console.error("Erro ao buscar dados", error);
 *   }
 * }
 * ```
 */
export const api = axios.create({
     /**
     * URL base para todas as requisições da API.
     * Deve ser substituída pelo IP correto do servidor backend quando necessário.
     * 
     * Exemplo de requisição: `http://192.168.1.1:3333/endpoint`
     */
    baseURL: process.env.EXPO_PUBLIC_API_URL
})
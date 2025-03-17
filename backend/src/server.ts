/**
 * @file server.ts
 * @description Arquivo principal para configuração e inicialização do servidor Fastify.
 * 
 * Este arquivo é responsável por:
 * - Inicializar o servidor Fastify
 * - Configurar o CORS para permitir requisições de origens diferentes
 * - Carregar variáveis de ambiente utilizando dotenv
 * - Registrar as rotas da aplicação
 * - Definir um manipulador global de erros
 * - Iniciar o servidor na porta 3333
 */
import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv"; 
import { routes } from './routes'

/**
 * Inicializa a instância do Fastify.
 *
 * @constant {FastifyInstance} app - Instância do Fastify com logging ativado.
 */
const app = Fastify({logger: true})
/**
 * Carrega as variáveis de ambiente do arquivo `.env`.
 *
 * Isso permite o uso de variáveis externas sem necessidade de fixá-las no código-fonte.
 * O arquivo `.env` não foi disponibilizado no GitHub.
 * O desenvolvedor deve criar manualmente o arquivo `.env` na raiz do projeto e definir a variável `API_KEY`, obtida do Gemini.
 */
dotenv.config();

/**
 * Define um manipulador global para tratamento de erros da aplicação.
 *
 * @param {Error} error - O erro ocorrido.
 * @param {FastifyRequest} request - A requisição que gerou o erro.
 * @param {FastifyReply} reply - A resposta a ser enviada ao cliente.
 *
 * Retorna um código HTTP 400 (Bad Request) junto com uma mensagem de erro personalizada.
 */
app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({message: error.message})
})

/**
 * Função assíncrona para iniciar o servidor Fastify.
 *
 * Esta função:
 * - Registra os plugins necessários (CORS e rotas)
 * - Inicia o servidor na porta 3333 e o torna acessível para qualquer host
 * - Garante que qualquer erro crítico ao iniciar o servidor interrompa a execução
 */
const start = async() => { 
    /**
     * Registra o plugin CORS para permitir requisições de diferentes origens.
     *
     * Isso é útil para permitir que aplicações frontend hospedadas em domínios distintos
     * possam se comunicar com este backend sem restrições de mesma origem (Same-Origin Policy).
     */
    app.register(cors); 
    /**
     * Registra as rotas definidas no arquivo `routes.ts`.
     *
     * Essas rotas incluem endpoints para criação de planos nutricionais e um endpoint de teste.
     */
    app.register(routes); 

    try{
        /**
         * Inicia o servidor na porta 3333 e permite acessos de qualquer endereço IP.
         *
         * O host "0.0.0.0" garante que o servidor fique acessível tanto localmente
         * quanto externamente (por exemplo, em uma rede local ou via cloud).
         */
        await app.listen({ port: 3333, host: "0.0.0.0"})
        console.log('Servidor rodando no http://localhost:3333')
    }catch(err){
        /**
         * Em caso de erro crítico ao iniciar o servidor, a execução do processo é interrompida.
         *
         * Isso impede que o servidor continue rodando em um estado inconsistente.
         */
        console.log(err);
        process.exit(1); 
    }
}

/**
 * Chama a função `start` para iniciar a aplicação.
 */
start();
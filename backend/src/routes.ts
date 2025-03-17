/**
 * @file routes.ts
 * @description Define as rotas da aplicação utilizando o framework Fastify.
 * Contém endpoints para teste e para a criação de planos nutricionais dinâmicos.
 */
import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify'
import { CreateNutritionController } from './controllers/CreateNutritionController'

/**
 * Registra as rotas da aplicação no Fastify.
 * 
 * @param {FastifyInstance} fastify - Instância do Fastify.
 * @param {FastifyPluginOptions} options - Opções do plugin Fastify (pode ser ignorado se não utilizado).
 */
export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    /**
     * @route GET /teste
     * @description Endpoint de teste que retorna um plano nutricional fixo em formato JSON.
     * 
     * @param {FastifyRequest} request - Objeto da requisição Fastify.
     * @param {FastifyReply} reply - Objeto de resposta Fastify.
     * 
     * @returns {object} Retorna um JSON contendo um exemplo de plano nutricional fixo.
     */
    fastify.get("/teste", (request: FastifyRequest, reply: FastifyReply) =>{
        /**
         * Simulação de resposta contendo um plano nutricional em formato JSON.
         * O conteúdo da string inclui detalhes sobre refeições e suplementos.
         */
        let responseText = "```json\n{\n  \"nome\": \"Matheus\",\n  \"sexo\": \"Masculino\",\n  \"idade\": 28,\n  \"altura\": 1.80,\n  \"peso\": 74,\n  \"objetivo\": \"Hipertrofia\",\n  \"refeicoes\": [\n    {\n      \"horario\": \"08:00\",\n      \"nome\": \"Cafe da Manha\",\n      \"alimentos\": [\n        \"4 ovos inteiros\",\n        \"1 xicara de aveia\",\n        \"1 banana\",\n        \"1 colher de sopa de pasta de amendoim\"\n      ]\n    },\n    {\n      \"horario\": \"11:00\",\n      \"nome\": \"Lanche da Manha\",\n      \"alimentos\": [\n        \"1 scoop de whey protein\",\n        \"2 fatias de pao integral\",\n        \"100g de peito de frango desfiado\"\n      ]\n    },\n    {\n      \"horario\": \"14:00\",\n      \"nome\": \"Almoco\",\n      \"alimentos\": [\n        \"200g de arroz branco\",\n        \"200g de peito de frango grelhado\",\n        \"1 concha de feijao\",\n        \"Salada verde a vontade (alface, tomate, pepino)\"\n      ]\n    },\n    {\n      \"horario\": \"17:00\",\n      \"nome\": \"Pre-Treino\",\n      \"alimentos\": [\n        \"Batata doce (200g)\",\n        \"150g de carne vermelha magra\"\n      ]\n    },\n    {\n      \"horario\": \"20:00\",\n      \"nome\": \"Pos-Treino\",\n      \"alimentos\": [\n        \"1 scoop de whey protein\",\n        \"50g de dextrose\"\n      ]\n    },\n    {\n      \"horario\": \"22:00\",\n      \"nome\": \"Ceia\",\n      \"alimentos\": [\n        \"200g de queijo cottage\",\n        \"30g de castanhas\"\n      ]\n    }\n  ],\n  \"suplementos\": [\n    \"Whey Protein\",\n    \"Creatina\",\n    \"Beta Alanina\",\n    \"Multivitaminico\"\n  ]\n}\n```"

        try{
            /**
             * Processa a string JSON, removendo marcações de código e formatando corretamente.
             */
            let jsonString = responseText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim();
            let jsonObject = JSON.parse(jsonString)
            // Retorna o objeto JSON formatado como resposta.
            return reply.send({ data: jsonObject });
        }catch(err){
            console.log(err)
        }
        
        reply.send({ok: true})
    })

    /**
     * @route POST /create
     * @description Endpoint responsável pela criação de um plano nutricional personalizado.
     * Utiliza o `CreateNutritionController` para processar os dados enviados pelo usuário.
     * 
     * @param {FastifyRequest} request - Objeto da requisição Fastify contendo os dados do usuário.
     * @param {FastifyReply} reply - Objeto de resposta Fastify.
     * 
     * @returns {Promise<object>} Retorna um JSON contendo o plano nutricional gerado dinamicamente.
     */
    fastify.post("/create", async (request: FastifyRequest, reply: FastifyReply)=> {
        return new CreateNutritionController().handle(request, reply)
    })
}
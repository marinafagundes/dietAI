/**
 * @file CreateNutritionController.ts
 * @description Controlador responsável pelo processamento da criação de planos nutricionais com base nos dados do usuário.
 */
import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateNutritionService } from '../services/CreateNutritionService'

/**
 * Interface que define a estrutura dos dados necessários para a criação do plano nutricional.
 */
export interface DataProps{
    /** Nome do usuário */
    name: string;
    /** Peso do usuário em kg */
    weight: string;
    /** Altura do usuário em cm */
    height: string;
    /** Idade do usuário em anos */
    age: string;
    /** Gênero do usuário (ex: "masculino", "feminino", "outro") */
    gender: string;
    /** Objetivo do usuário (ex: "emagrecer", "hipertrofia") */
    objective: string;
    /** Nível de atividade física do usuário (ex: "sedentário", "moderado") */
    level: string;
}

/**
 * Controlador responsável por lidar com a criação de planos nutricionais.
 * Recebe os dados do usuário através de uma requisição HTTP, chama o serviço de criação de nutrição
 * e retorna a resposta para o cliente.
 */
class CreateNutritionController{
    /**
     * Manipula a requisição HTTP para criar um plano nutricional.
     * 
     * @param {FastifyRequest} request - Objeto da requisição contendo os dados do usuário no corpo da requisição.
     * @param {FastifyReply} reply - Objeto de resposta para envio dos dados ao cliente.
     * @returns {Promise<void>} Retorna uma promessa sem valor, apenas enviando a resposta ao cliente.
     */
    async handle(request: FastifyRequest, reply: FastifyReply){
        /**
         * Extração dos dados do corpo da requisição.
         * O objeto `request.body` deve estar estruturado conforme a interface `DataProps`.
         */
        const{ name, weight, height, age, gender, objective, level  } = request.body as DataProps;
        /**
         * Instancia o serviço responsável pela criação do plano nutricional.
         * Esse serviço contém a lógica de cálculo e estruturação do plano baseado nos dados do usuário.
         */
        const createNutrition = new CreateNutritionService();
        /**
         * Executa o serviço de criação do plano nutricional, fornecendo os dados extraídos da requisição.
         * O serviço retorna um objeto contendo as informações do plano gerado.
         */
        const nutrition = await createNutrition.execute({
            name, 
            weight, 
            height, 
            age, 
            gender, 
            objective, 
            level
        });
        /**
         * Envia a resposta para o cliente contendo o plano nutricional gerado.
         * O `reply.send()` é utilizado para devolver os dados processados ao usuário final.
         */
        reply.send(nutrition)
    }
}
/**
 * Exportação do controlador para ser utilizado em outras partes do projeto.
 * Isso permite que outras rotas ou módulos importem e utilizem essa funcionalidade.
 */
export { CreateNutritionController }
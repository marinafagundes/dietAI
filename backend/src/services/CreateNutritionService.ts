/**
 * @file CreateNutritionService.ts
 * @description Serviço responsável por gerar um plano nutricional personalizado utilizando a API Gemini.
 */
import { DataProps } from '../controllers/CreateNutritionController'
import { GoogleGenerativeAI } from '@google/generative-ai'

/**
 * Classe responsável pelo serviço de criação de planos nutricionais personalizados.
 * Utiliza a API Gemini para gerar recomendações de dieta com base nos dados do usuário.
 */
class CreateNutritionService {
    /**
     * Executa a geração do plano nutricional com base nas informações do usuário.
     * 
     * @param {DataProps} data - Objeto contendo os dados do usuário para personalização da dieta.
     * @param {string} data.name - Nome do usuário.
     * @param {string} data.weight - Peso do usuário em kg.
     * @param {string} data.height - Altura do usuário em cm.
     * @param {string} data.age - Idade do usuário em anos.
     * @param {string} data.gender - Gênero do usuário.
     * @param {string} data.objective - Objetivo do usuário (ex: "perda de peso", "ganho de massa muscular").
     * @param {string} data.level - Nível de atividade física do usuário.
     * 
     * @returns {Promise<object>} Retorna um objeto contendo a dieta personalizada gerada pela IA.
     * @throws {Error} Lança um erro caso a geração do plano nutricional falhe.
     */
    async execute({ name, weight, height, age, gender, objective, level }: DataProps){
        try{
            /**
             * Inicializa a API do Google Generative AI utilizando a chave de API armazenada nas variáveis de ambiente.
             */
            const genAI = new GoogleGenerativeAI(process.env.API_KEY!)
            const model = genAI.getGenerativeModel({model: "gemini-2.0-flash"})
            /**
             * Define o prompt detalhado que será enviado para a IA.
             * O prompt solicita um plano nutricional personalizado, garantindo que o retorno esteja em formato JSON.
             */
            const response = await model.generateContent(`Crie uma dieta completa para uma pessoa com nome: ${name} do sexo ${gender} com peso atual: ${weight}kg, altura: ${height}, idade: ${age} anos e com foco e objetivo em ${objective}, atualmente nível de atividade: ${level} e ignore qualquer outro parametro que não seja os passados, retorne em json com as respectivas propriedades, propriedade nome o nome da pessoa, propriedade sexo com sexo, propriedade idade, propriedade altura, propriedade peso, propriedade objetivo com o objetivo atual, propriedade refeições com uma array contendo dentro cada objeto sendo uma refeição da dieta e dentro de cada refeição a propriedade horário com horário da refeição, propriedade nome com nome e a propriedade alimentos com array contendo os alimentos dessa refeição e pode incluir uma propreidade como suplementos contendo array com sugestão de suplemento que é indicado para o sexo dessa pessoa e o objetivo dela e não retorne nenhuma observação alem das passadas no prompt, retorne em json e nenhuma propriedade pode ter acento.`)
            
            /**
             * Exibe a resposta bruta da API no console para fins de depuração.
             */
            console.log(JSON.stringify(response, null, 2));

            /**
             * Verifica se a resposta contém os dados esperados.
             * A API pode retornar diferentes estruturas, então essa verificação garante que os dados necessários foram fornecidos.
             */
            if(response.response && response.response.candidates){
                const jsonText = response.response.candidates[0]?.content.parts[0].text as string;
                /**
                 * Remove marcações de código da resposta para garantir que seja um JSON válido.
                 * Alguns modelos de IA podem retornar JSONs dentro de blocos de código (ex: ```json ... ```)
                 */
                let jsonString = jsonText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim();
                /**
                 * Converte a string formatada para um objeto JSON.
                 */
                let jsonObject = JSON.parse(jsonString)

                return { data: jsonObject }
            }

            /**
             * Lança um erro caso a resposta da IA não esteja no formato esperado.
             */
            throw new Error("Resposta inesperada da IA.");

        }catch(err){
            /**
             * Captura e exibe erros no console para facilitar a depuração.
             */
            console.error("Erro ao gerar o JSON: ", err)
            throw new Error("Falha ao criar o plano nutricional.")
        }
    }
}

/**
 * Exporta o serviço para ser utilizado por outros módulos do projeto.
 */
export { CreateNutritionService }
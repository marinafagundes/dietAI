/**
 * @file dataTypes.ts
 * @description Define as interfaces utilizadas para representar os dados do usuário, incluindo informações pessoais, refeições e suplementos.
 */

/**
 * Representa uma refeição contendo um horário, nome e os alimentos consumidos.
 */
interface RefeicoesProps{
    /**
     * Horário da refeição em formato de string (exemplo: "08:00", "12:30").
     */
    horario: string;
    /**
     * Nome da refeição (exemplo: "Café da Manhã", "Almoço", "Jantar").
     */
    nome: string;
    /**
     * Lista de alimentos consumidos nessa refeição.
     */
    alimentos: string[];
}

/**
 * Representa os dados de um usuário, incluindo informações pessoais, refeições e suplementos.
 */
export interface Data {
    /**
     * Nome do usuário.
     */
    nome: string;
    /**
     * Sexo do usuário (exemplo: "Masculino", "Feminino", "Outro").
     */
    sexo: string;
    /**
     * Idade do usuário, representada em anos.
     */
    idade: number;
    /**
     * Altura do usuário, representada em centímetros.
     */
    altura: number;
    /**
     * Peso do usuário, representado em quilogramas.
     */
    peso: number;
    /**
     * Objetivo do usuário, representado como um número.
     * Pode indicar diferentes metas, como perda de peso, ganho de massa muscular, etc.
     */
    objetivo: number;
    /**
     * Lista de refeições do usuário, cada uma contendo horário, nome e alimentos consumidos.
     */
    refeicoes: RefeicoesProps[];
    /**
     * Lista de suplementos consumidos pelo usuário.
     */
    suplementos: string[];
}
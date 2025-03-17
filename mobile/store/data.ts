/**
 * @file useDataStore.ts
 * @description Gerenciamento de estado global do usuário utilizando a biblioteca Zustand.
 * @module useDataStore
 */
import { create } from 'zustand'

/**
 * Tipo que representa os dados de um usuário no sistema.
 */
export type User = {
  /** Nome do usuário */
  name: string;
  /** Peso do usuário (representado como string) */
  weight: string;
  /** Idade do usuário (representado como string) */
  age: string;
  /** Altura do usuário (representado como string) */
  height: string;
  /** Nível de experiência ou condicionamento físico do usuário */
  level: string;
  /** Objetivo do usuário (exemplo: perder peso, ganhar massa muscular, etc.) */
  objective: string;
  /** Gênero do usuário */
  gender: string;
}

/**
 * Tipo que define o estado global e as funções de atualização do usuário.
 */
type DataState = {
  /** Estado do usuário armazenado globalmente */
  user: User;
  /**
   * Atualiza os dados da primeira etapa do formulário.
   * 
   * Modifica os atributos `name`, `age`, `height` e `weight` do usuário.
   * 
   * @param data - Dados da primeira página do formulário
   */
  setPageOne: (data: Omit<User, "gender" | "objective" | "level">) => void;
  /**
   * Atualiza os dados da segunda etapa do formulário.
   * 
   * Modifica os atributos `gender`, `objective` e `level` do usuário.
   * 
   * @param data - Dados da segunda página do formulário
   */
  setPageTwo: (data: Pick<User, "gender" | "objective" | "level">) => void;
}

/**
 * Hook personalizado para gerenciar o estado global do usuário.
 * 
 * Utiliza a biblioteca Zustand para armazenar e atualizar os dados do usuário 
 * de forma centralizada.
 * 
 * **Exemplo de uso:**
 * ```tsx
 * import { useDataStore } from './useDataStore';
 * 
 * function ExampleComponent() {
 *   const { user, setPageOne, setPageTwo } = useDataStore();
 *   
 *   return (
 *     <div>
 *       <h1>Nome: {user.name}</h1>
 *       <button onClick={() => setPageOne({ name: "João", age: "25", height: "175", weight: "70" })}>
 *         Atualizar Dados
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export const useDataStore = create<DataState>((set) => ({
  user: {
    name: "",
    age: "",
    height: "",
    weight: "",
    level: "",
    objective: "",
    gender: ""
  },

  setPageOne: (data) => set((state) => ({ user: {...state.user, ...data} }) ),
  setPageTwo: (data) => set((state) => ({ user: {...state.user, ...data} }) ),
}))
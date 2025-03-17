/**
 * @file Create.tsx
 * @description Componente responsável pela captura das informações sobre o usuário para finalizar a configuração da dieta.
 */
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
  
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from  'react-hook-form'

import { colors } from '../../constants/colors'
import { Header } from '../../components/header'

import { Select } from '../../components/input/select'
import { useDataStore } from '../../store/data'

import { router } from 'expo-router'

/**
 * Esquema de validação do formulário usando Zod.
 * Define os campos obrigatórios e suas restrições.
 */
const schema = z.object({
    gender: z.string().min(1, { message: "O sexo é obrigatório!"}),
    objective: z.string().min(1, { message: "O objetivo é obrigatório!"}),
    level: z.string().min(1, { message: "Selecione seu nível!"}),
})
  
/**
 * Tipo inferido a partir do esquema de validação.
 * Representa os dados do formulário.
 */
type FormData = z.infer<typeof schema>
  
/**
 * Componente da segunda etapa do formulário.
 * Captura informações sobre o sexo, nível de atividade física e objetivo do usuário.
 *
 * @returns {JSX.Element} Componente funcional de React Native.
 */
export default function Create() {
    // Configuração do formulário com react-hook-form e validação Zod
    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    // Função para armazenar os dados na store global
    const setPageTwo = useDataStore(state => state.setPageTwo)
  
    /**
     * Opções para o campo "Sexo".
     */
    const genderOptions = [
        { label: "Masculino", value: "masculino" },
        { label: "Feminino", value: "feminino" },
        { label: "Outro", value: "outro" }
    ]
  
    /**
     * Opções para o campo "Nível de atividade física".
     */
    const levelOptions = [
        { label: 'Sedentário (pouca ou nenhuma atividade física)', value: 'Sedentário' },
        { label: 'Levemente ativo (exercícios 1 a 3 vezes na semana)', value: 'Levemente ativo (exercícios 1 a 3 vezes na semana)' },
        { label: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)', value: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)' },
        { label: 'Altamente ativo (exercícios 5 a 7 dia por semana)', value: 'Altamente ativo (exercícios 5 a 7 dia por semana)' },
    ]
  
    /**
     * Opções para o campo "Objetivo".
     */
    const objectiveOptions = [
        { label: 'Emagrecer', value: 'emagrecer' },
        { label: 'Hipertrofia', value: 'Hipertrofia' },
        { label: 'Hipertrofia + Definição', value: 'Hipertrofia e Definição' },
        { label: 'Definição', value: 'Definição' },
    ]
  
    /**
     * Manipula o envio do formulário, armazenando os dados e redirecionando para a próxima etapa.
     * @param {FormData} data - Dados do formulário validados.
     */
    function handleCreate(data: FormData){
        setPageTwo({
            level: data.level,
            gender: data.gender,
            objective: data.objective
        })
  
        router.push("/nutrition")
    }
  
    return (
        <View style={styles.container}>
            {/* Cabeçalho do formulário com título e passo atual */}
            <Header
                step='Passo 2'
                title='Finalizando dieta'
            />
  
            <ScrollView style={styles.content}>
                <Text style={styles.label}>Sexo:</Text>
                <Select
                    control={control}
                    name="gender"
                    placeholder="Selecione seu sexo..."
                    error={errors.gender?.message}
                    options={genderOptions}
                />
    
                <Text style={styles.label}>Selecione seu nível de atividade física:</Text>
                <Select
                    control={control}
                    name="level"
                    placeholder="Selecione o nível de atividade física"
                    error={errors.level?.message}
                    options={levelOptions}
                />      
    
                <Text style={styles.label}>Selecione seu objetivo:</Text>
                <Select
                    control={control}
                    name="objective"
                    placeholder="Selecione o nível de atividade física"
                    error={errors.objective?.message}
                    options={objectiveOptions}
                />  
    
                {/* Botão para avançar para a próxima etapa */}
                <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </Pressable>               
    
            </ScrollView>
  
        </View>
    );
}
 
/**
 * Estilos da tela de captura das informações do usuário.
 */
const styles = StyleSheet.create({
    /**
     * Container principal da tela.
     */
    container:{
        flex:1,
        backgroundColor: colors.background
    },

    /**
     * Estilização dos rótulos dos selects.
     */
    label:{
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginBottom: 8, 
    },

    /**
     * Área de conteúdo onde os selects são exibidos.
     */
    content:{
        paddingLeft: 16,
        paddingRight: 16,
    },

    /**
     * Botão para avançar para a próxima etapa do formulário.
     */
    button:{
        backgroundColor: colors.blue,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },

    /**
     * Estilização do texto dentro do botão.
     */
    buttonText:{
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    }
})
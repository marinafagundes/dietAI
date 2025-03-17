/**
 * @file Step.tsx
 * @description Componente responsável pela captura das informações iniciais do usuário no processo de criação da dieta.
 */
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'

import { colors } from '../../constants/colors'
import { Header } from '../../components/header'
import { Input } from '../../components/input'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from  'react-hook-form'

import { router } from 'expo-router'
import { useDataStore } from '../../store/data'

/**
 * Esquema de validação do formulário usando Zod.
 * Define os campos obrigatórios e suas restrições.
 */
const schema = z.object({
    name: z.string().min(1, { message: "O nome é obrigatório!"}),
    weight: z.string().min(1, { message: "O peso é obrigatório!"}),
    age: z.string().min(1, { message: "A idade é obrigatória!"}),
    height: z.string().min(1, { message: "A altura é obrigatória!"})
})

/**
 * Tipo inferido a partir do esquema de validação.
 * Representa os dados do formulário.
 */
type FormData = z.infer<typeof schema>

/**
 * Componente da primeira etapa do formulário.
 * Captura os dados básicos do usuário e os armazena na store global antes de avançar.
 *
 * @returns {JSX.Element} Componente funcional de React Native.
 */
export default function Step(){
    // Configuração do formulário com react-hook-form e validação Zod
    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    // Função para armazenar os dados na store global
    const setPageOne = useDataStore(state => state.setPageOne)

     /**
     * Manipula o envio do formulário, armazenando os dados e redirecionando para a próxima etapa.
     * @param {FormData} data - Dados do formulário validados.
     */
    function handleCreate(data: FormData){
        console.log("Passando dados da página 1!");
        setPageOne({
            name: data.name,
            weight: data.weight,
            age: data.age,
            height: data.height
        })
        router.push("/create")
    }

    return(
        <View style={styles.container}>
            {/* Cabeçalho do formulário com título e passo atual */}
            <Header
                step='Passo 1'
                title='Vamos começar!'
            />

            <ScrollView style={styles.content}>
                <Text style={styles.label}>Nome:</Text>
                <Input
                    name="name"
                    control={control}
                    placeholder='Digite seu nome...'
                    error={errors.name?.message}
                    keyboardType='default'
                />

                <Text style={styles.label}>Seu peso atual:</Text>
                <Input
                    name="weight"
                    control={control}
                    placeholder='Ex.: 75.'
                    error={errors.weight?.message}
                    keyboardType='numeric'
                />

                <Text style={styles.label}>Sua altura atual:</Text>
                <Input
                    name="height"
                    control={control}
                    placeholder='Ex.: 1.80.'
                    error={errors.height?.message}
                    keyboardType='numeric'
                />

                <Text style={styles.label}>Sua idade atual:</Text>
                <Input
                    name="age"
                    control={control}
                    placeholder='Ex.: 25.'
                    error={errors.age?.message}
                    keyboardType='numeric'
                />

                {/* Botão para avançar para a próxima etapa */}
                <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </Pressable>
            </ScrollView>
        </View>
    )
}

/**
 * Estilos da tela de captura de informações iniciais do usuário.
 */
const styles = StyleSheet.create({
    /**
     * Container principal da tela, aplicando o fundo e organizando os elementos.
     */
    container: {
        flex: 1,
        backgroundColor: colors.background
    },

    /**
     * Área de conteúdo onde os inputs são exibidos.
     */
    content: {
        paddingLeft: 16,
        paddingRight: 16
    },

    /**
     * Estilização dos rótulos dos inputs.
     */
    label: {
        fontSize: 16,
        color: colors.white, 
        fontWeight: 'bold',
        marginBottom: 8
    },

    /**
     * Botão para avançar para a próxima etapa do formulário.
     */
    button: {
        backgroundColor: colors.blue,
        height: 44,
        borderRadius: 4, 
        justifyContent: 'center',
        alignItems: 'center', 
    },

    /**
     * Estilização do texto dentro do botão.
     */
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.white
    }
})
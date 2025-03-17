/**
 * @file Nutrition.tsx
 * @description Tela responsável por exibir o plano de dieta gerado com base nos dados do usuário.
 * A dieta inclui informações sobre refeições e suplementos, além da opção de compartilhamento.
 */
import { View, Text, StyleSheet, Pressable, ScrollView, Share } from 'react-native';

import { useDataStore } from '../../store/data'
import { api } from '../../services/api'
import { useQuery } from '@tanstack/react-query'
import { colors } from '../../constants/colors'
import { Data } from '../../types/data'
import { Link, router } from 'expo-router'
import { Ionicons, Feather } from '@expo/vector-icons'

/**
 * Interface para a resposta da API com os dados de nutrição do usuário.
 */
interface ResponseData {
    data: Data
}

/**
 * Componente responsável por exibir a dieta gerada para o usuário.
 * Obtém as informações armazenadas e permite compartilhar ou recarregar os dados.
 *
 * @returns {JSX.Element} Componente funcional de React Native.
 */
export default function Nutrition() {
    // Obtém os dados do usuário armazenados no DataStore
    const user = useDataStore(state => state.user)

    /**
     * Hook de consulta para buscar a dieta do usuário na API.
     *
     * @returns {Data | undefined} Dados da dieta gerada.
     */
    const { data, isFetching, error } = useQuery({
        queryKey: ["nutrition"],
        queryFn: async () => {
            try{
                if(!user){
                    throw new Error("Falha ao carregar nutrição")
                }

                // Envia os dados do usuário para gerar a dieta
                const response = await api.post<ResponseData>("/create", {
                    name: user.name,
                    age: user.age,
                    gender: user.gender,
                    height:  user.height,
                    weight: user.weight,
                    objective: user.objective,
                    level: user.level
                })

                return response.data.data

            }catch(err){
                console.log("Erro ao buscar a dieta:", err);
            }
        }
    })

    /**
     * Função para compartilhar a dieta gerada via outras aplicações.
     */
    async function handleShare(){
        try{
            if(data && Object.keys(data).length === 0) return;

            // Formata a mensagem para compartilhamento
            const supplements = `${data?.suplementos.map( item => ` ${item}`)}`
            const foods = `${data?.refeicoes.map( item => `\n- Nome: ${item.nome}\n- Horário: ${item.horario}\n- Alimentos: ${item.alimentos.map( alimento => ` ${alimento}` )}`)}`
            const message = `Dieta: ${data?.nome} - Objetivo: ${data?.objetivo}\n\n${foods}\n\n- Dica de Suplemento: ${supplements}`

            await Share.share({
                message: message
            })

        }catch(err){
            console.log("Erro ao compartilhar a dieta:", err);
        }
    }

    /**
     * Exibição de mensagens de carregamento ou erro.
     */
    if(isFetching){
        return(
            <View style={styles.loading}>
                <Text style={styles.loadingText}>Estamos gerando sua dieta!</Text>
                <Text style={styles.loadingText}>Consultando IA...</Text>
            </View>
        )
    }

    /**
     * Exibição de erro caso a requisição falhe.
     */
    if(error){
        return(
            <View style={styles.loading}>
                <Text style={styles.loadingText}>Falha ao gerar dieta!</Text>
                <Link href="/">
                <Text style={styles.loadingText}>Tente novamente</Text>
                </Link>
            </View>
        )
    }  

    return (
        <View style={styles.container}>
            {/* Cabeçalho da tela de nutrição */}
            <View style={styles.containerHeader}>
                <View style={styles.contentHeader}>
                    <Text style={styles.title}>Minha dieta</Text>

                    <Pressable style={styles.buttonShare} onPress={handleShare}>
                        <Text style={styles.buttonShareText}>Compartilhar</Text>
                    </Pressable>
                </View>
            </View>

            {/* Conteúdo da dieta */}
            <View style={{ paddingLeft: 16, paddingRight: 16, flex:1 }}>
                {data && Object.keys(data).length > 0 && (
                    <>
                    <Text style={styles.name}>Nome: {data.nome}</Text>
                    <Text style={styles.objective}>Foco: {data.objetivo}</Text>

                    <Text style={styles.label}>Refeições:</Text>
                    <ScrollView>
                        <View style={styles.foods}>
                            {data.refeicoes.map( (refeicao) => (
                                <View key={refeicao.nome} style={styles.food}>
                                    <View style={styles.foodHeader}>
                                        <Text style={styles.foodName}>{refeicao.nome}</Text>
                                        <Ionicons name="restaurant" size={16} color="#000" />
                                    </View>

                                    <View style={styles.foodContent}>
                                        <Feather name="clock" size={14} color="#000"/>
                                        <Text>Horário: {refeicao.horario}</Text>
                                    </View>

                                    <Text style={styles.foodText}>Alimentos:</Text>
                                    {refeicao.alimentos.map(alimento => (
                                        <Text key={alimento}>{alimento}</Text>
                                    ))}

                                </View>
                            ))}
                        </View>

                        <View style={styles.supplements}>
                            <Text style={styles.foodName}>Dica de suplementos:</Text>
                            {data.suplementos.map( item => (
                                <Text key={item}>{item}</Text>
                            ))}
                        </View>

                        <Pressable style={styles.button} onPress={ () => router.replace("/") }>
                            <Text style={styles.buttonText}>
                                Gerar nova dieta!
                            </Text>
                        </Pressable>
                    </ScrollView>

                    </>
                )}
            </View>

        </View>
    );
}

/** Container principal da tela */
const styles = StyleSheet.create({
    /**
     * Container para exibição do indicador de carregamento.
     */
    loading:{
        flex:1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center'
    },

    /**
     * Estilização do texto exibido durante o carregamento.
     */
    loadingText:{
        fontSize:18,
        color: colors.white,
        marginBottom: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },

    /**
     * Container principal da tela, aplicando o fundo e organizando os elementos.
     */
    container:{
        backgroundColor: colors.background,
        flex:1,
    },

    /**
     * Área do cabeçalho da tela, responsável por exibir informações principais.
     */
    containerHeader:{
        backgroundColor: colors.white,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        paddingTop: 60,
        paddingBottom: 20,
        marginBottom: 16,
    },

    /**
     * Estrutura do cabeçalho, organizando o título e os botões.
     */
    contentHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16
    },

    /**
     * Estilização do título exibido no cabeçalho.
     */
    title:{
        fontSize: 28,
        color: colors.background,
        fontWeight: 'bold'
    },

    /**
    * Botão para compartilhar informações da dieta.
    */
    buttonShare:{
        backgroundColor: colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 4
    },

    /**
     * Estilização do texto dentro do botão de compartilhamento.
     */
    buttonShareText:{
        color: colors.white,
        fontWeight: '500'
    },

    /**
     * Estilização do nome do usuário.
     */
    name:{
        fontSize: 20,
        color: colors.white,
        fontWeight: 'bold'
    },

    /**
     * Estilização do texto que exibe o objetivo do usuário.
     */
    objective:{
        color: colors.white,
        fontSize: 16,
        marginBottom: 24
    },

    /**
     * Estilização dos rótulos de seções ou categorias.
     */
    label:{
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    },

    /**
     * Container para a listagem de alimentos.
     */
    foods:{
        backgroundColor: colors.white,
        padding: 14,
        borderRadius: 8,
        marginTop: 8,
        gap: 8,
    },

    /**
     * Estilização individual de cada alimento na lista.
     */
    food:{
        backgroundColor: 'rgba(208, 208, 208, 0.40)',
        padding: 8,
        borderRadius: 4,
    },

    /**
     * Cabeçalho do item de alimento, contendo informações principais.
     */
    foodHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },

    /**
     * Estilização do nome do alimento.
     */
    foodName:{
        fontSize: 16,
        fontWeight: 'bold'
    },

    /**
     * Estrutura do conteúdo do alimento, organizando as informações adicionais.
     */
    foodContent:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    /**
     * Estilização do texto dentro da descrição dos alimentos.
     */
    foodText:{
        fontSize: 16,
        marginBottom: 4,
        marginTop: 14,
    },

    /**
     * Container para a listagem de suplementos.
     */
    supplements:{
        backgroundColor: colors.white,
        marginTop: 14,
        marginBottom: 14, 
        padding: 14,
        borderRadius: 8
    },

    /**
     * Container para a listagem de suplementos.
     */
    button:{
        backgroundColor: colors.blue,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 24,
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
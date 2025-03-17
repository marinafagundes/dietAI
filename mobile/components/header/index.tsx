/**
 * @file Header.tsx
 * @description Componente de cabeçalho para a aplicação, exibindo o título e o progresso do processo.
 */
import { View, Text, StyleSheet, Pressable, SafeAreaView, Platform, StatusBar } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { colors } from '../../constants/colors'
import { router } from 'expo-router'

/**
 * Interface que define as propriedades do componente Header.
 */
interface HeaderProps{
    /**
     * Indica o passo atual do processo.
     */
    step: string;
    /**
     * Título exibido no cabeçalho.
     */
    title: string;
}

/**
 * Componente de cabeçalho reutilizável que inclui um botão de voltar, 
 * um indicador de progresso e um título.
 *
 * @param {HeaderProps} props - Propriedades do componente.
 * @returns {JSX.Element} - Componente de cabeçalho renderizado.
 */
export function Header({step, title}: HeaderProps){
  return(
    <SafeAreaView style={styles.container}>
        <View style={styles.content}>
            {/* Linha superior com botão de voltar e indicador de progresso */}
            <View style={styles.row}>
                <Pressable onPress={ () => router.back()}>
                    <Feather name="arrow-left" size={24} color='#000' />
                </Pressable>

                <Text style={styles.text}>
                    {step} <Feather name="loader" size={16} color='#000' />
                </Text>
            </View>

            {/* Título principal do cabeçalho */}
            <Text style={styles.title}>
                {title}
            </Text>
        </View>
    </SafeAreaView>
  )
}

/**
 * Estilos utilizados no componente Header.
 */
const styles = StyleSheet.create({
    /**
     * Container principal do cabeçalho, incluindo padding para suportar o notch em dispositivos iOS.
     */
    container:{
      backgroundColor: colors.white,
      borderBottomRightRadius: 14,
      borderBottomLeftRadius: 14,
      marginBottom: 14,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 34 : 34
    },

    /**
     * Área interna do cabeçalho contendo os elementos principais.
     */
    content:{
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 34,
      borderBottomRightRadius: 14,
      borderBottomLeftRadius: 14,
    },

    /**
     * Estilização da linha superior contendo o botão de voltar e o indicador de progresso.
     */
    row:{
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center'
    },

    /**
     * Estilização do texto que exibe o progresso do processo.
     */
    text:{
      fontSize:18,
    },

    /**
     * Estilização do título principal do cabeçalho.
     */
    title:{
      fontSize: 30,
      fontWeight: 'bold',
      color: colors.background
    }
  })
/**
 * @file Index.tsx
 * @description Tela inicial do aplicativo, exibindo o logotipo, título, descrição e um botão para iniciar a geração de dieta.
 */
import { View, Text, Image, StyleSheet, Pressable} from 'react-native'
import { colors } from '../constants/colors'
import { Link } from 'expo-router'

/**
 * Componente principal da tela inicial.
 * Apresenta a identidade visual da aplicação e um botão para iniciar a criação de dieta personalizada.
 *
 * @returns {JSX.Element} - Componente renderizado da tela inicial.
 */
export default function Index(){
  return(
    <View style={styles.container}>
      {/* Logotipo da aplicação */}
      <Image
        source={require('../assets/images/logo.png')}
      />

      {/* Título da aplicação com estilização */}
      <Text style={styles.title}>
        Diet<Text style={{ color: colors.white }}>AI</Text>
      </Text>

    {/* Descrição da aplicação */}
      <Text style={styles.text}>
        Sua dieta personalizada com inteligência artificial!
      </Text>

    {/* Botão para avançar para a tela de criação de dieta */}
      <Link href="/step" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>
            Gerar dieta
          </Text>
        </Pressable>
      </Link>
    </View>
  )
}

/**
 * Estilos da tela inicial.
 */
const styles = StyleSheet.create({
  /**
   * Container principal da tela, centralizando os elementos e aplicando o fundo.
   */
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    paddingLeft: 16,
    paddingRight: 16
  },

  /**
   * Estilo do título da aplicação, destacando a marca "DietAI".
   */
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.green
  },

  /**
   * Estilo da descrição da aplicação, com largura fixa e alinhamento centralizado.
   */
  text: {
    fontSize: 16,
    color: colors.white, 
    width: 240,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8
  },

  /**
   * Estilização do botão de navegação para a criação de dieta.
   */
  button: {
    backgroundColor: colors.blue,
    width: '100%',
    height: 40,
    borderRadius: 4, 
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: 34
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
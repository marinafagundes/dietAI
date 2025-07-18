/**
 * @file Input.tsx
 * @description Componente de campo de entrada customizado para formulários, baseado no React Hook Form.
 */
import { View,StyleSheet, Text, TextInput, KeyboardTypeOptions } from 'react-native';
import { Controller } from 'react-hook-form'
import { colors } from '../../constants/colors'

/**
 * Interface que define as propriedades do componente Input.
 */
interface InputProps{
    /**
     * Nome do campo no formulário.
     */
    readonly name: string;
    /**
     * Controle do React Hook Form para manipulação do estado do campo.
     */
    readonly control: any;
    /**
     * Texto exibido dentro do campo de entrada quando ele está vazio.
     */
    readonly placeholder?: string;
    /**
     * Regras de validação do campo, conforme definidas no React Hook Form.
     */
    readonly rules?: object;
    /**
     * Mensagem de erro exibida caso a validação do campo falhe.
     */
    readonly error?: string;
    /**
     * Tipo de teclado exibido ao usuário (numérico, padrão, e-mail, etc.).
     */
    readonly keyboardType: KeyboardTypeOptions;
    /**
     * ID para testes.
     */
    readonly testID?: string;
  }

/**
 * Componente de campo de entrada customizado para formulários, baseado no React Hook Form.
 *
 * @param {InputProps} props - Propriedades do componente.
 * @returns {JSX.Element} - Elemento JSX representando o campo de entrada.
 */
export function Input({name, control, placeholder, rules, error, keyboardType, testID}: InputProps) {
 return (
    <View style={styles.container}>
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value }}) => (
                <TextInput
                style={styles.input}
                    placeholder={ placeholder }
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                    keyboardType='default'
                    testID={testID}
                />
            )}
        />

        {/* Exibição da mensagem de erro, se houver */}
        { error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

/**
 * Estilos utilizados no componente Input.
 */
const styles = StyleSheet.create({
    /**
     * Container principal do campo de entrada.
     */
    container: {
        marginBottom: 16,
    },

    /**
     * Estilização do campo de entrada de texto.
     */
    input: {
        height: 44,
        backgroundColor: colors.white,
        paddingHorizontal: 10, 
        borderRadius: 4
    },

    /**
     * Texto de erro exibido abaixo do campo de entrada.
     */
    errorText: {
        color: colors.red, 
        marginTop: 4
    }
})
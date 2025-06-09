/**
 * @file Select.tsx
 * @description Componente de seleção customizado para formulários, baseado no React Hook Form.
 */
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Modal } from 'react-native';

import { Controller } from 'react-hook-form'
import { colors } from '../../constants/colors'
import { Feather} from '@expo/vector-icons'
import { useState } from 'react'
  
/**
 * Interface que define a estrutura das opções disponíveis no seletor.
 */
interface OptionsProps{
    /**
     * Texto exibido para o usuário.
     */
    label: string; 
    /**
     * Valor associado à opção (pode ser string ou número).
     */
    value: string | number;
}
  
/**
 * Interface que define as propriedades do componente Select.
 */
interface SelectProps{
    /**
     * Nome do campo no formulário.
     */
    name: string; 
    /**
     * Controle do React Hook Form para manipulação do estado do campo.
     */
    control: any; 
    /**
     * Texto exibido quando nenhum valor está selecionado.
     */
    placeholder?: string; 
    /**
     * Mensagem de erro a ser exibida caso a validação do campo falhe.
     */
    error?: string; 
    /**
     * Lista de opções disponíveis para seleção.
     */
    options: OptionsProps[] 
    /**
     * ID para testes.
     */
    testID?: string;
}

/**
 * Componente de seleção customizado para formulários, baseado no React Hook Form.
 *
 * @param {SelectProps} props - Propriedades do componente.
 * @returns {JSX.Element} - Elemento JSX representando o seletor customizado.
 */
export function Select({ name, control, placeholder, error, options, testID }: SelectProps) {
    /**
     * Estado responsável por controlar a visibilidade do modal de seleção.
     */
    const [visible, setVisible] = useState(false); 
  
  
    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name={name}
  
                render={({ field: { onChange, onBlur, value }}) => (
                    <>
                        {/* Botão de abertura do seletor */}
                        <TouchableOpacity testID={testID} style={styles.select} onPress={() => setVisible(true)}>
                            <Text>
                                {value ? options.find(option => option.value === value)?.label : placeholder }
                            </Text>
                            <Feather name="arrow-down" size={16} color="#000"/>
                        </TouchableOpacity>
    
                        {/* Modal para exibição das opções */}
                        <Modal
                            visible={visible}
                            animationType="fade"
                            transparent={true}
                            onRequestClose={() => setVisible(false) }
                        > 
                            {/* Área externa do modal, fecha ao tocar fora */}
                            <TouchableOpacity
                                style={styles.modalContainer}
                                activeOpacity={1}
                                onPress={ () => setVisible(false) }
                            >
                                
                                {/* Conteúdo interno do modal */}
                                <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                                    <FlatList
                                        contentContainerStyle={{ gap: 4 }}
                                        data={options}
                                        keyExtractor={(item) => item.value.toString() }
                                        renderItem={ ({ item }) => (
                                            <TouchableOpacity 
                                                style={styles.option}
                                                onPress={() => {
                                                onChange(item.value)  
                                                setVisible(false)
                                                }}
                                            >
                                                <Text>{item.label}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </TouchableOpacity>
    
                            </TouchableOpacity>
                        </Modal>
                    </>
                )}
            />
  
            {/* Exibição da mensagem de erro, se houver */}
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}
  
/**
 * Estilos utilizados no componente Select.
 */
const styles = StyleSheet.create({
    /**
     * Container principal do seletor.
     */
    container:{
        marginBottom: 16
    },

    /**
     * Texto de erro exibido abaixo do seletor.
     */
    errorText:{
        color: colors.red,
        marginTop: 4
    },

    /**
     * Estilização do botão de seleção.
     */
    select:{
        flexDirection: 'row',
        height: 44,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 4
    },

    /**
     * Estilização da área externa do modal (fundo escuro).
     */
    modalContainer:{
        backgroundColor: 'rgba(0,0,0, 0.5)',
        flex:1,
        justifyContent: 'center'
    },

    /**
     * Estilização da área interna do modal (onde as opções aparecem).
     */
    modalContent:{
        backgroundColor: colors.white, 
        marginHorizontal: 10,
        borderRadius: 8,
        padding: 20
    },

    /**
     * Estilização de cada opção dentro do seletor.
     */
    option:{
        paddingVertical: 14,
        backgroundColor: 'rgba(208, 208, 208, 0.40)',
        borderRadius: 4,
        paddingHorizontal: 8
    }
})
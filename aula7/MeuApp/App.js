import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import Checkbox from 'expo-checkbox';
import { RadioButton, Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  // 1. Estados para os campos de texto
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  
  // 2. Estados para seleções
  const [sexo, setSexo] = useState('Masculino');
  const [termos, setTermos] = useState(false);
  const [email, setEmail] = useState(false);

  // 3. Estados da lista
  const [contatos, setContatos] = useState([]);
  const [proximoId, setProximoId] = useState(1);

  // 4. Função acionada pelo botão Salvar
  function adicionarContato() {
    if (nome.trim() === '') {
      Alert.alert('Aviso', 'O campo Nome é obrigatório!');
      return;
    }
    
    // Validação do termo obrigatório
    if (!termos) {
      Alert.alert('Aviso', 'Você precisa aceitar os Termos para continuar.');
      return;
    }

    // Cria objeto contato com todos os campos
    const novo = { 
      id: proximoId, 
      nome, 
      cpf, 
      telefone, 
      endereco, 
      sexo, 
      termos, 
      email 
    };

    setContatos(contatos.concat(novo));
    setProximoId(proximoId + 1);
    
    // Limpa os campos após salvar
    setNome('');
    setCpf('');
    setTelefone('');
    setEndereco('');
    setSexo('Masculino');
    setTermos(false);
    setEmail(false);
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.titulo}>Cadastro de Contatos</Text>

        <ScrollView style={styles.formScroll}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />

          <MaskedTextInput
            style={styles.input}
            mask="999.999.999-99"
            placeholder="CPF"
            value={cpf}
            onChangeText={(text, rawText) => setCpf(text)}
            keyboardType="numeric"
          />

          <MaskedTextInput
            style={styles.input}
            mask="(99) 99999-9999"
            placeholder="Telefone"
            value={telefone}
            onChangeText={(text, rawText) => setTelefone(text)}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Endereço"
            value={endereco}
            onChangeText={setEndereco}
          />

          {/* Radio Buttons para Sexo */}
          <RadioButton.Group onValueChange={novoValor => setSexo(novoValor)} value={sexo}>
            <View style={styles.radioContainer}>
              <View style={styles.radioOption}>
                <RadioButton value="Masculino" />
                <Text>Masculino</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="Feminino" />
                <Text>Feminino</Text>
              </View>
            </View>
          </RadioButton.Group>

          {/* Checkboxes */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={termos}
              onValueChange={setTermos}
              color={termos ? '#4630EB' : undefined}
            />
            <Text style={styles.checkboxLabel}>Aceitar Termos (obrigatório)</Text>
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox
              value={email}
              onValueChange={setEmail}
              color={email ? '#4630EB' : undefined}
            />
            <Text style={styles.checkboxLabel}>Receber informações por e-mail</Text>
          </View>

          <View style={styles.botaoContainer}>
            <Button title="SALVAR" onPress={adicionarContato} />
          </View>
        </ScrollView>

        {/* Lista rolável de contatos */}
        <ScrollView style={styles.lista}>
          {contatos.map(contato => (
            <View key={contato.id} style={styles.cardItem}>
              <Text style={styles.itemTextoPrincipal}>{contato.id} - {contato.nome}</Text>
              <Text style={styles.itemTexto}>CPF: {contato.cpf || 'Não informado'}</Text>
              <Text style={styles.itemTexto}>Telefone: {contato.telefone || 'Não informado'}</Text>
              <Text style={styles.itemTexto}>Endereço: {contato.endereco || 'Não informado'}</Text>
              <Text style={styles.itemTexto}>Sexo: {contato.sexo}</Text>
              <Text style={styles.itemTexto}>{contato.termos ? 'Aceitou termos' : 'Não aceitou termos'}</Text>
              <Text style={styles.itemTexto}>{contato.email ? 'Quer receber e-mail' : 'Não quer receber e-mail'}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: '#fff'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  formScroll: {
    maxHeight: '60%', 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center'
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  checkboxLabel: {
    marginLeft: 8
  },
  botaoContainer: {
    marginTop: 10,
    marginBottom: 20
  },
  lista: {
    flex: 1,
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 10
  },
  cardItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee'
  },
  itemTextoPrincipal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  itemTexto: {
    fontSize: 14,
    color: '#333',
    marginVertical: 2
  }
});
import { useState } from 'react';
import {AsyncStorage} from 'react-native-async-storage/async-storage';
import { FlatList ,StyleSheet, Text, TextInput, TouchableOpacity, View, A } from "react-native";

 
 
export default function App() {
 
  const[nomeProduto, setNomeProduto] = useState('')
  const[precoProduto, setPrecoProduto] = useState('')
  const[listProdutos,setListProdutos] = useState ([])
  async function salvar(){
    let produtos= []
    let tempProdutos = []

    tempProdutos = JSON.parse(await AsyncStorage.getItem("Produtos"))
    tempProdutos.map(item=>{
      produtos.push(item)
    })
 produtos.push({nome:nomeProduto, preco:precoProduto})

 await AsyncStorage.setItem("Produtos", JSON.stringify(produtos))
 alert('PRODUTO CADASTRADO')

 }

 async function buscarDasdos(){
  const p = await AsyncStorage.getItem("Produtos")
  console.log(JSON(p))
  setListProdutos(JSON.parse(p))
 }
  return (
    <View style={styles.container}>
      <Text>Cadastro</Text>
      <TextInput placeholder="Digite o nome do produto" style={styles.input} value={nomeProduto} onChangeText={(value)=> setNomeProduto(value)} />
      <TextInput placeholder="Digite o preço do produto" style={styles.input} value={precoProduto} onChangeText={(value)=> setPrecoProduto(value)}/>
 
      <TouchableOpacity style={styles.btn} onPress={salvar}>
        <Text style={{color: '#fff', fontSize: 12}}>CADASTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={buscarDasdos}>
        <Text style={{color: '#fff', fontSize: 12}}>Buscar Dados</Text>
      </TouchableOpacity>

      <FlatList
          data = {listProdutos}
          renderItem={({item})=>{
            return(
              <Text>{item.nome}</Text>
            )
          }}
      />

    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 10
  },
  input: {
    borderWidth: 1,
    width: 300,
    height: 30,
    borderRadius: 5,
    paddingLeft: 5
  },
  btn: {
    borderWidth: 1,
    width: 200,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: '#000',
    alignItems:'center'
  },
});
 
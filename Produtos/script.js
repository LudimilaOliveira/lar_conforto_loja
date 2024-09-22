import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyDDrt3OIaT7tonBq8sVZeQMCSRWrkBcSoc",
    authDomain: "lar-e-conforto.firebaseapp.com",
    databaseURL: "https://lar-e-conforto-default-rtdb.firebaseio.com",
    projectId: "lar-e-conforto",
    storageBucket: "lar-e-conforto.appspot.com",
    messagingSenderId: "123899527520",
    appId: "1:123899527520:web:e0df87567fb7a017715e05"
  };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 import { getDatabase, ref, child, get, set, update, remove } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";


 const db = getDatabase();

//  CAMPOS DE ENTRADAS DOS VALORES DO CADASTRO DE PRODUTOS
 let codigo = document.getElementById('codigo');
 let produto =document.getElementById('produto');
 let categoria =document.getElementById('categoria');
 let quantidade =document.getElementById('quantidade');
 let valor =document.getElementById('valor');

//CAMPO DE PESQUISA E ATUALIZAÇÃO DOS PRODUTOS
 let idProduto = document.getElementById('idProduto');

//RESULTADOS DAS PESQUISAS
 let dadoProduto = document.getElementById('dadoProduto');
 let dadoCategoria = document.getElementById('dadoCategoria');
 let dadoQuantidade = document.getElementById('dadoQuantidade');
 let dadoValor = document.getElementById('dadoValor');

//BOTÕES DOS CAMPOS DE PESQUISA
 let cadastrarProduto = document.getElementById('cadastrarProduto');
 let buscarProduto = document.getElementById('buscarProduto');
 let atualizarProduto = document.getElementById('atualizarProduto');
 let deletarProduto = document.getElementById('deletarProduto');

//ADICIONAR PRODUTO
 function AddProduto(){
    set(ref(db,'Produto/'+codigo.value),{
        codigo: codigo.value,
        produto: produto.value,
        categoria: categoria.value,
        quantidade: quantidade.value,
        valor: valor.value
    }).then(()=>{
        codigo.value = ''
        produto.value=''
        categoria.value=''
        quantidade.value=''
        valor.value=''
        alert("Produto Cadastrado!");
    }).catch((error)=>{
        console.log(error);
        alert('Produto Não Cadastrado!');
    })

 }

 //FUNCÃO PARA PESQUISA DE PRODUTOS COM BASE NO CÓDIGO DO PRODUTO => idProduto
 function PesquisarProduto(){
    const dbRef = ref(db);
    get(child(dbRef,'Produto/'+idProduto.value)).then((snapshot)=>{
        if(snapshot.exists()){
            dadoProduto.value = snapshot.val().produto;
            dadoCategoria.value = snapshot.val().categoria;
            dadoQuantidade.value = snapshot.val().quantidade;
            dadoValor.value = ('R$ ')+parseFloat (snapshot.val().valor).toFixed(2);
            alert('Produto Localizado!')
        }else{
            alert("O produto não existe");
        }
    }).then(()=>{
        alert('Leitura Realizada!')
    }).catch((e)=>{
        alert('Algo deu errado!')
        console.log(e)
    })
 }

 //FUNÇÃO PARA ATUALIZAÇÃO DAS INFORMAÇÕES ACERCA DO PRODUTO
function AtualizarProdutos(){
    update(ref(db,'Produto/'+idProduto.value),{
        produto:dadoProduto.value,
        categoria:dadoCategoria.value,
        quantidade:dadoQuantidade.value,
        valor:dadoValor.value
    }).then(()=>{
        alert('Produto Atualizado!');
    }).catch((e)=>{
        alert('Algo deu errado!')
        console.log(e)
    })
}

//FUNÇÃO PARA DELETAR PRODUTO
function DeletarProdutos(){
    remove(ref(db,'Produto/'+idProduto.value)).
    then(()=>{
        idProduto.value=''
        dadoProduto.value=''
        dadoCategoria.value=''
        dadoQuantidade.value=''
        dadoValor.value=''
        alert('Produto Deletado!')
    })
}

//MÉTODOS PARA UTILIZAÇÃO DAS FUNÇÕES COM BASE NAS AÇÕES DOS BOTÕES
cadastrarProduto.addEventListener('click',AddProduto);
buscarProduto.addEventListener('click',PesquisarProduto);
atualizarProduto.addEventListener('click',AtualizarProdutos);
deletarProduto.addEventListener('click',DeletarProdutos);
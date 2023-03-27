const timestamp = (new Date()).getTime()
const publicKey = '700a1447f14a1fca653f59c29d8e474b'
const privateKey = '62c6fdc3e7fc1a94c94731a624d9412831ad13b7'
const hash = timestamp + privateKey + publicKey
const hashMd5 = MD5.generate(hash)
let saida = ''


console.log("Fiz a requisicão, agora tenho que esperar ...")
const promise = fetch(`https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&ts=${timestamp}&hash=${hashMd5}`)


promise.then(response => {
    console.log(response)
    console.log("A requisicão foi feita, agora vou buscar as respostas que eu quero")

    response.json().then(res => {
        console.log("Tudo bem! Seguem suas respostas")
        dados = res.data.results
        dados12 = res.data.results
        dados.map((item, index) => (Nomes(item, index)))
    })


}, error => {
    console.log('Erro: ' + error)
});

function Nomes(item, index) {
    let personagem1 = document.getElementById('personagem')
    let nome = item.name
    saida = saida +
        '<div class="linha">' +
        '<img src="' + item.thumbnail.path + '.' + item.thumbnail.extension + '">' +
        '<div class="description">' + nome + '</div>'
        + '<button id="botao" onclick="abrirmodal(' + index + ')"> Detalhes</button>' +
        '</div>'

    personagem1.innerHTML = saida
}

function fecharmodal() {
    let modal = document.getElementById('marcio')
    modal.style.display = 'none'

}

function abrirmodal(index) {
    let modal = document.getElementById('marcio')
    modal.style.display='flex'
    // Aqui estou pegando na listagem o item da posiçao recebida pelo parametro
    const itemAtual = dados[index]
    console.log('itemAtual', itemAtual)
    let pessoas1 = [] 
    let pessoas =[]
    for (let p of itemAtual.comics.items) {
        pessoas1.push(
            `${p.name}`

        )
    }
    for (let p of itemAtual.stories.items) {
        pessoas.push
        `${p.name}`
    }
    
    modal.innerHTML = `
    
        <div class="modaldentro">
           <h4>Heroi: ${itemAtual.name}</h4>
           <h4>comics</h4>
            <p>${pessoas1}</p>
            <h4>Stories</h4>
            <p>${pessoas}</p>
            <button class="btn" onclick="fecharmodal()">&times</button>
        </div>
    
    `;
}






    

   

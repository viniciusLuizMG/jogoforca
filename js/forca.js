let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavras = [];
let jogoAutomatico = true;

carregaListaAutomatica();

criarPalavraSecreta();
function criarPalavraSecreta(){
    const indexPalavra = parseInt(Math.random() * palavras.length)
    
    palavraSecretaCategoria = palavras[indexPalavra].categoria;
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    

    // console.log(palavraSecretaSorteada);
}

montarPalavraNaTela();
function montarPalavraNaTela(){
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";
    
    for(i = 0; i < palavraSecretaSorteada.length; i++){  
        if(listaDinamica[i] == undefined){
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                listaDinamica[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }     
        }
        else{
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }    
        }
    }   
}

function verificaLetraEscolhida(letra){
    document.getElementById("tecla-" + letra).disabled = true;
    if(tentativas > 0)
    {
        mudarStyleLetra("tecla-" + letra, false);
        comparalistas(letra);
        montarPalavraNaTela();
    }    
}

function mudarStyleLetra(tecla, condicao){
    if(condicao == false)
    {
        document.getElementById(tecla).style.background = "#C71585";
        document.getElementById(tecla).style.color = "#ffffff";
    }
    else{
        document.getElementById(tecla).style.background = "#008000";
        document.getElementById(tecla).style.color = "#ffffff";
    }

    
}

function comparalistas(letra){
    const pos = palavraSecretaSorteada.indexOf(letra)
    if(pos < 0){
        tentativas--
        carregaImagemForca();

        if(tentativas == 0){
            abreModal("OPS!", "Não foi dessa vez ... A palavra secreta era <br>" + palavraSecretaSorteada);
            piscarBotaoJogarNovamente(true);
        }
    }
    else{
        mudarStyleLetra("tecla-" + letra, true);
        for(i = 0; i < palavraSecretaSorteada.length; i++){
            if(palavraSecretaSorteada[i] == letra){
                listaDinamica[i] = letra;
            }
        }
    }
    
    let vitoria = true;
    for(i = 0; i < palavraSecretaSorteada.length; i++){
        if(palavraSecretaSorteada[i] != listaDinamica[i]){
            vitoria = false;
        }
    }

    if(vitoria == true)
    {
        abreModal("PARABÉNS!", "Você venceu...");
        tentativas = 0;
        piscarBotaoJogarNovamente(true);
    }
}


//***************************************************/
//           teste de letras automaticas 
//***************************************************/


// Dicionário de mapeamento de letras para considerar acentos
const mapeamentoAcentos = {
    "A": ["A", "Á", "Â", "Ã", "À"],
    "E": ["E", "É", "Ê", "È"],
    "I": ["I", "Í", "Î", "Ì"],
    "O": ["O", "Ó", "Ô", "Õ", "Ò"],
    "U": ["U", "Ú", "Û", "Ù"],
    "C": ["C", "Ç"]
};

function comparalistas(letra) {
    // Substitui a letra para uma das letras mapeadas, se houver
    let letrasPossiveis = mapeamentoAcentos[letra] || [letra];

    // Verifica se alguma das letras mapeadas existe na palavra
    let letraEncontrada = false;
    letrasPossiveis.forEach(letraMapeada => {
        if (palavraSecretaSorteada.includes(letraMapeada)) {
            letraEncontrada = true;
            mudarStyleLetra("tecla-" + letra, true);

            // Substitui cada ocorrência encontrada na lista dinâmica
            for (let i = 0; i < palavraSecretaSorteada.length; i++) {
                if (palavraSecretaSorteada[i] === letraMapeada) {
                    listaDinamica[i] = letraMapeada;
                }
            }
        }
    });

    // Se nenhuma letra mapeada foi encontrada, reduz tentativas e atualiza a imagem
    if (!letraEncontrada) {
        tentativas--;
        carregaImagemForca();
        if (tentativas === 0) {
            abreModal("OPS!", "Não foi dessa vez ... A palavra secreta era <br>" + palavraSecretaSorteada);
            piscarBotaoJogarNovamente(true);
        }
    }

    // Verifica vitória
    let vitoria = true;
    for (let i = 0; i < palavraSecretaSorteada.length; i++) {
        if (palavraSecretaSorteada[i] !== listaDinamica[i]) {
            vitoria = false;
            break;
        }
    }

    if (vitoria) {
        abreModal("PARABÉNS!", "Você venceu...");
        tentativas = 0;
        piscarBotaoJogarNovamente(true);
    }
}














async function atraso(tempo){
    return new Promise(x => setTimeout(x, tempo))     
}

function carregaImagemForca(){
    switch(tentativas){
        case 5:
            document.getElementById("imagem").style.background  = "url('./img/forca01.png')";
            break;
        case 4:
            document.getElementById("imagem").style.background  = "url('./img/forca02.png')";
            break;
        case 3:
            document.getElementById("imagem").style.background  = "url('./img/forca03.png')";
            break;
        case 2:
            document.getElementById("imagem").style.background  = "url('./img/forca04.png')";
            break;
        case 1:
            document.getElementById("imagem").style.background  = "url('./img/forca05.png')";
            break;
        case 0:
            document.getElementById("imagem").style.background  = "url('./img/forca06.png')";
            break;
        default:
            document.getElementById("imagem").style.background  = "url('./img/forca.png')";
            break;
    }
}

function abreModal(titulo, mensagem){
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    });
}

let bntReiniciar = document.querySelector("#btnReiniciar")
bntReiniciar.addEventListener("click", function(){
    jogarNovamente = false;
    location.reload();
});

function listaAutomatica(){ // ativa o modo manual
    if (jogoAutomatico == true) {
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-play-circle'></i>"
        palavras = [];
        jogoAutomatico = false;

        document.getElementById("abreModalAddPalavra").style.display = "block";
        document.getElementById("status").innerHTML = "Modo Manual";
    }
    else if(jogoAutomatico == false){ // ativa o modo automático
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-pause-circle'></i>"
        jogoAutomatico = true;

        document.getElementById("abreModalAddPalavra").style.display = "none";
        document.getElementById("status").innerHTML = "Modo Automático";
        
    }
}

const modal = document.getElementById("modal-alerta");

const btnAbreModal = document.getElementById("abreModalAddPalavra");
btnAbreModal.onclick = function(){
    modal.style.display = "block";
}

const btnFechaModal = document.getElementById("fechaModal");
btnFechaModal.onclick = function(){ 
    modal.style.display = "none";
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = ""; 
}

window.onclick = function(){ 
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value = ""; 
    }  
}

function carregaListaAutomatica(){
    palavras = [
        // palavra001 = {
        //     nome: "IRLANDA",
        //     categoria:"LUGARES"
        // },
    
        palavra001 = {
            nome: "ACTÍNIO",
            categoria: "Elemento radioativo, usado em medicina."
        },
        palavra002 = {
            nome: "ALUMÍNIO",
            categoria: "Metal leve, amplamente utilizado em embalagens."
        },
        palavra003 = {
            nome: "AMERICÍCIO",
            categoria: "Usado em detectores de fumaça."
        },
        palavra004 = {
            nome: "ANTIMÔNIO",
            categoria: "Usado em ligas metálicas e semicondutores."
        },
        palavra005 = {
            nome: "ARGÔNIO",
            categoria: "Gás nobre, usado em lâmpadas."
        },
        palavra006 = {
            nome: "ARSÊNICO",
            categoria: "Usado em pesticidas e compostos químicos."
        },
        palavra007 = {
            nome: "ASTATO",
            categoria: "Elemento raro e radioativo, pouco usado."
        },
        palavra008 = {
            nome: "BÁRIO",
            categoria: "Usado em radiografias e fogos de artifício."
        },
        palavra009 = {
            nome: "BERÍLIO",
            categoria: "Usado em ligas e materiais aeroespaciais."
        },
        palavra010 = {
            nome: "BISMUTO",
            categoria: "Usado em medicamentos para problemas digestivos."
        },
        palavra011 = {
            nome: "BÓRON",
            categoria: "Usado em vidros e detergentes."
        },
        palavra012 = {
            nome: "BROMO",
            categoria: "Usado em desinfetantes e fotografia."
        },
        palavra013 = {
            nome: "CÁDMIO",
            categoria: "Usado em baterias e revestimentos."
        },
        palavra014 = {
            nome: "CÁLCIO",
            categoria: "Essencial para ossos e dentes."
        },
        palavra015 = {
            nome: "CALIFÓRNIO",
            categoria: "Usado em pesquisas científicas."
        },
        palavra016 = {
            nome: "CARBONO",
            categoria: "Base da química orgânica, encontrado em todos os seres vivos."
        },
        palavra017 = {
            nome: "CÉRIO",
            categoria: "Usado em polidores e produção de vidro."
        },
        palavra018 = {
            nome: "CÉSIO",
            categoria: "Usado em relógios atômicos."
        },
        palavra019 = {
            nome: "CHUMBO",
            categoria: "Usado em baterias e proteção contra radiação."
        },
        palavra020 = {
            nome: "CLORO",
            categoria: "Usado em desinfetantes e água potável."
        },
        palavra021 = {
            nome: "CÓBRE",
            categoria: "Usado em fiação elétrica e moedas."
        },
        palavra022 = {
            nome: "CROMO",
            categoria: "Usado em ligas metálicas e resistência à corrosão."
        },
        palavra023 = {
            nome: "CÚRIO",
            categoria: "Usado em pesquisas científicas e fontes de energia."
        },
        palavra024 = {
            nome: "DARMSTÁDIO",
            categoria: "Elemento sintético com pouco uso."
        },
        palavra025 = {
            nome: "DISPRÓSIO",
            categoria: "Usado em ligas de ímãs."
        },
        palavra026 = {
            nome: "DUBNIUM",
            categoria: "Elemento sintético com uso em pesquisas."
        },
        palavra027 = {
            nome: "ÉRBIO",
            categoria: "Usado em fibras ópticas e lasers."
        },
        palavra028 = {
            nome: "ESCÂNDIO",
            categoria: "Usado em ligas metálicas."
        },
        palavra029 = {
            nome: "ESTÂNIO",
            categoria: "Usado em ligas e eletrônicos."
        },
        palavra030 = {
            nome: "ESTATINA",
            categoria: "Elemento radioativo e raro."
        },
        palavra031 = {
            nome: "FERRO",
            categoria: "Metal comum, usado na construção e fabricação de aço."
        },
        palavra032 = {
            nome: "FÓSFORO",
            categoria: "Essencial para a vida, encontrado no DNA."
        },
        palavra033 = {
            nome: "FRÂNCIO",
            categoria: "Elemento altamente radioativo e raro."
        },
        palavra034 = {
            nome: "GÁLIO",
            categoria: "Usado em LEDs e termômetros."
        },
        palavra035 = {
            nome: "GÁDOLINIO",
            categoria: "Usado em equipamentos de ressonância magnética."
        },
        palavra036 = {
            nome: "HÁFNIO",
            categoria: "Usado em reatores nucleares e ligas."
        },
        palavra037 = {
            nome: "HELIUM",
            categoria: "Gás nobre, usado em balões e criogenia."
        },
        palavra038 = {
            nome: "HIDROGÊNIO",
            categoria: "O elemento mais leve e abundante do universo."
        },
        palavra039 = {
            nome: "HÓLMIO",
            categoria: "Usado em lasers e ímãs."
        },
        palavra040 = {
            nome: "ÍNDIO",
            categoria: "Usado em telas de LCD."
        },
        palavra041 = {
            nome: "IÓDIO",
            categoria: "Usado em medicina e desinfetantes."
        },
        palavra042 = {
            nome: "IRÍDIO",
            categoria: "Usado em joias e equipamentos científicos."
        },
        palavra043 = {
            nome: "KRIPTON",
            categoria: "Gás nobre usado em iluminação."
        },
        palavra044 = {
            nome: "LANTÂNIO",
            categoria: "Usado em ímãs e catalisadores."
        },
        palavra045 = {
            nome: "LÍTIO",
            categoria: "Usado em baterias recarregáveis."
        },
        palavra046 = {
            nome: "MAGNÉSIO",
            categoria: "Essencial para o metabolismo humano."
        },
        palavra047 = {
            nome: "MANGANÊS",
            categoria: "Usado na produção de aço."
        },
        palavra048 = {
            nome: "MERCÚRIO",
            categoria: "Único metal líquido à temperatura ambiente."
        },
        palavra049 = {
            nome: "MOLIBDÊNIO",
            categoria: "Usado em ligas de aço."
        },
        palavra050 = {
            nome: "NÉON",
            categoria: "Gás nobre usado em sinais luminosos."
        },
        palavra051 = {
            nome: "NÍQUEL",
            categoria: "Usado em ligas metálicas e baterias."
        },
        palavra052 = {
            nome: "NITROGÊNIO",
            categoria: "Componente principal do ar."
        },
        palavra053 = {
            nome: "NOBÉLIO",
            categoria: "Elemento radioativo com uso em pesquisa."
        },
        palavra054 = {
            nome: "OXIGÊNIO",
            categoria: "Essencial para a respiração."
        },
        palavra055 = {
            nome: "OURO",
            categoria: "Metal precioso, símbolo de riqueza."
        },
        palavra056 = {
            nome: "PALÁDIO",
            categoria: "Usado em catalisadores e joias."
        },
        palavra057 = {
            nome: "PLATINA",
            categoria: "Metal precioso usado em joias e catalisadores."
        },
        palavra058 = {
            nome: "POLÔNIO",
            categoria: "Elemento radioativo usado em pesquisas."
        },
        palavra059 = {
            nome: "POTÁSSIO",
            categoria: "Essencial para a função celular."
        },
        palavra060 = {
            nome: "PRATA",
            categoria: "Metal nobre, conhecido pela condutividade elétrica."
        },
        palavra061 = {
            nome: "RÁDIO",
            categoria: "Elemento radioativo usado em tratamentos."
        },
        palavra062 = {
            nome: "RÁDON",
            categoria: "Gás radioativo."
        },
        palavra063 = {
            nome: "RÉNIO",
            categoria: "Usado em motores a jato."
        },
        palavra064 = {
            nome: "RÓDIO",
            categoria: "Usado em joias e catalisadores."
        },
        palavra065 = {
            nome: "RUBÍDIO",
            categoria: "Usado em relógios atômicos."
        },
        palavra066 = {
            nome: "SÓDIO",
            categoria: "Usado no sal de cozinha."
        },
        palavra067 = {
            nome: "SELÊNIO",
            categoria: "Essencial para a função celular."
        },
        palavra068 = {
            nome: "SILÍCIO",
            categoria: "Usado em eletrônicos e semicondutores."
        },
        palavra069 = {
            nome: "TÂNTALO",
            categoria: "Usado em eletrônicos e capacitores."
        },
        palavra070 = {
            nome: "TÁLIO",
            categoria: "Usado em medicina e eletrônica."
        },
        palavra071 = {
            nome: "TÉCNICIO",
            categoria: "Elemento sintético usado em medicina."
        },
        palavra072 = {
            nome: "TÉRBIO",
            categoria: "Usado em fósforos e dispositivos ópticos."
        },
        palavra073 = {
            nome: "TITÂNIO",
            categoria: "Usado em próteses e ligas metálicas."
        },
        palavra074 = {
            nome: "URÂNIO",
            categoria: "Elemento radioativo usado em energia nuclear."
        },
        palavra075 = {
            nome: "VANÁDIO",
            categoria: "Usado em ligas de aço."
        },
        palavra076 = {
            nome: "XÊNON",
            categoria: "Gás nobre usado em lâmpadas de flash."
        },
        palavra077 = {
            nome: "ZINCO",
            categoria: "Usado em galvanização e ligas metálicas."
        },
        palavra078 = {
            nome: "ZIRCÔNIO",
            categoria: "Usado em reatores nucleares."
        }
        
    ];
}

function adicionarPalavra(){
    let addPalavra = document.getElementById("addPalavra").value.toUpperCase();
    let addCategoria = document.getElementById("addCategoria").value.toUpperCase();

    if (isNullOrWhiteSpace(addPalavra) || isNullOrWhiteSpace(addCategoria) || addPalavra.length < 3 || addCategoria.length < 3) {
        abreModal("ATENÇÃO"," Palavra e/ou Categoria inválidos");
        return;
    }

    let palavra = {
        nome: addPalavra,
        categoria: addCategoria
    }

    palavras.push(palavra);  
    sortear();
    
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = "";
}

function isNullOrWhiteSpace(input){
    return !input || !input.trim();
}

function sortear(){
    if(jogoAutomatico == true){
        location.reload();  
    }
    else{
        if(palavras.length > 0){
            listaDinamica=[];
            criarPalavraSecreta();
            montarPalavraNaTela();
            resetaTeclas();
            tentativas = 6;
            piscarBotaoJogarNovamente(false);
        }
    }
}

function resetaTeclas(){
    let teclas = document.querySelectorAll(".teclas > button")
    teclas.forEach((x) =>{
        x.style.background = "#FFFFFF";
        x.style.color = "#8B008B";
        x.disabled = false;
    });
}


async function piscarBotaoJogarNovamente(querJogar){
    if(querJogar){
        document.getElementById("jogarNovamente").style.display = "block";
    }
    else{
        document.getElementById("jogarNovamente").style.display = "none";
    }
}



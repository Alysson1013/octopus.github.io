function toggle(enable) {
    document.getElementById("txtDado").disabled = enable;
    document.getElementById("txtDado").placeholder =
        "Caso tenha selecionado seu arquivo, preencha o restante dos campos. Caso não, recarregue a página para reabilitar a área de texto.";
}
$('#manual').on('click', function () {
    $('section.tela1').hide();
    $('section.tela2').show();
});
$('#proximo').on('click', function () {
    $('section.tela2').hide();
    $('section.tela3').show();
});
$('#calcular').on('click', function () {
    $('section.tela3').hide();
    $('section.tela4').show();
});
$('#mostrar-tabela').on('click', function () {
    $('canvas.grafico').hide();
    $('div.Quant').hide();
    $('div.mmm-dv').hide();
    $('div.table-responsive').show();
});
$('#mostrar-grafico').on('click', function () {
    $('canvas.grafico').show();
    $('div.Quant').hide();
    $('div.table-responsive').hide();
    $('div.mmm-dv').hide();
});
$('#mostrar-mmm').on('click', function () {
    $('div.mmm-dv').show();
    $('canvas.grafico').hide();
    $('div.Quant').hide();
    $('div.table-responsive').hide();
});
$('#mostrar-separatriz').on('click', function () {
    $('canvas.grafico').hide();
    $('div.Quant').show();
    $('div.table-responsive').hide();
    $('div.mmm-dv').hide();
});
$('#nominal').on('click', function () {
    $('h5.texto-hierarquia').hide();
    $('input.hierarquia').hide();
});
$('#ordinal').on('click', function () {
    $('h5.texto-hierarquia').show();
    $('input.hierarquia').show();
});
$('#discreta').on('click', function () {
    $('h5.texto-hierarquia').hide();
    $('input.hierarquia').hide();
});
$('#continua').on('click', function () {
    $('h5.texto-hierarquia').hide();
    $('input.hierarquia').hide();
});
$('#input-excel').on('click', function () {
    $('section.tela1').hide();
    $('section.tela2').show();
});
var hs = []
var i = 0
var acum = 0 //Gera as porcantagens
var numDigitados = [] //Organiza aordem
var ic = 0 //Intervalo de Classe
var amplitude = 0
var min = 1000000000000
var max = 0
var obj = {}
let obj2 = {}
var k = 0
var vet = []
var ict = 0
var pa = document.getElementsByName('pa')
var TipoT = document.getElementsByName('TipoT')
let VetColor = []
var vetQ = []
var str
var comp = []
var left
var cG = 0
var confirm = true
var test //pra comparação
var texto = '' //para receber o ;
var continua = '' //Para gerar a cor do Grafico continuo
var colunas = 0
var inserirM = document.getElementById("inserirM")
var pnT = []


function DesvioPadrao(vetMedias, total, obj) {
    let pDv = document.getElementById("DV")
    let cDv = document.getElementById("cDV")

    let vetAcum = [] //vetor que acumula os dados para multiplicação
    let DV = 0 // Desvio padrão
    if (pa[1].checked == true) { //redução de 1 necessário para o calculo da amostra
        total -= 1
    }

    if (TipoT[2].checked) {
        var mediaV = (vetMedias.reduce((prev, elem) => prev + elem, 0)) / total //Media para calculo de variancia
        for (let i = 0; i < numDigitados.length; i++) {
            let aux = numDigitados[i] - mediaV //subtrai os valores pela media da variancia
            aux = Math.pow(aux, 2)
            aux = aux * obj[numDigitados[i]] //faz a potencia ao quadrado
            vetAcum.push(Number(aux.toFixed(2))) //O vetor recebe os dados
        }
        ////console.log(vetMedias)
        ////console.log(total)
        ////console.log(`Esse aqui ${mediaV}`)
    } else {
        console.log(vetMedias)
        let i = 0
        let vetAux = []
        for (let prop in obj) {
            vetAux[i] = vetMedias[i] * obj[prop]
            i++
        }
        var mediaV = (vetAux.reduce((prev, elem) => prev + elem, 0)) / total
        // //////console.log(vetMedias)
        // //////console.log(total)
        // //////console.log(`Esse aqui ${mediaV}`)
        i = 0
        for (let prop in obj) {
            let aux = Number(vetMedias[i]) - Number(mediaV) //subtrai os valores pela media da variancia
            aux = (Math.pow(aux, 2) * Number(obj[prop])) //faz a potencia ao quadrado
            vetAcum.push(Number(aux.toFixed(2))) //O vetor recebe os dados
            i++
        }


    }

    DV = (vetAcum.reduce((prev, elem) => prev + elem, 0)) / total //Acumula os dados em uma variavel e divide polo total como manda a formula
    DV = Math.sqrt(DV) //faz a raiz dos dados

    pDv.innerHTML += `<span> ${DV.toFixed(2)}</span>`
    cDv.innerHTML += `<span> ${((DV / mediaV) * 100).toFixed(2)}%</span>`

}

function testeQ() {
    if (TipoT[3].checked == true) {
        let NumQ = document.getElementById("NumQ")
        let TipoQ = document.getElementsByName("TipoQ")
        if (TipoQ[1].selected) {
            NumQ.innerHTML = ""
            NumQ.innerHTML += `<option value="Nulo">Selecione</option>`
            formulasQuatiletc(4)
        }
        if (TipoQ[2].selected) {
            NumQ.innerHTML = ""
            NumQ.innerHTML += `<option value="Nulo">Selecione</option>`
            formulasQuatiletc(5)
        }
        if (TipoQ[3].selected) {
            NumQ.innerHTML = ""
            NumQ.innerHTML += `<option value="Nulo">Selecione</option>`
            formulasQuatiletc(10)
        }
        if (TipoQ[4].selected) {
            NumQ.innerHTML = ""
            NumQ.innerHTML += `<option value="Nulo">Selecione</option>`
            formulasQuatiletc(100)
        }
    } else {
        let NumQ = document.getElementById("NumQ")
        let TipoQ = document.getElementsByName("TipoQ")
        if (TipoQ[1].selected) {
            NumQ.innerHTML = ""
            NumQ.innerHTML += `<option value="Nulo">Selecione</option>`
            inserirOpcoes(4)
        }
        if (TipoQ[2].selected) {
            NumQ.innerHTML = ""
            NumQ.innerHTML += `<option value="Nulo">Selecione</option>`
            inserirOpcoes(5)
        }
        if (TipoQ[3].selected) {
            NumQ.innerHTML = ""
            NumQ.innerHTML += `<option value="Nulo">Selecione</option>`
            inserirOpcoes(10)
        }
        if (TipoQ[4].selected) {
            NumQ.innerHTML = ""
            NumQ.innerHTML += `<option value="Nulo">Selecione</option>`
            inserirOpcoes(100)
        }
    }
}


let intervaloDeClasse = {} // separa o valor entre X I--- y arredondado
let valoresTopo = {} // limites maiores
let valoresMenores = {} // limites menores linhas +- 700

const FormulaMedina = (facTotal, facLinhaAnterior, frequenciaLinhaAtual, h, valorMenorLimite) => {
    let part1 = (((facTotal) - facLinhaAnterior) / frequenciaLinhaAtual)
    let valorMediana = ((part1 * h) + valorMenorLimite)
    // //////console.log({ facTotal, facLinhaAnterior, frequenciaLinhaAtual, h, valorMenorLimite })
    return (valorMediana)
};

const valoresRetirados = (limite1) => {
    let facTotal = 0
    let multipli = 0
    for (let prop in obj) { //Calculo de mediana
        multipli += (obj[prop] * intervaloDeClasse[prop]) // recebe valores a serem multiplicado
        facTotal += obj[prop] // recontagem do valor de fac
    };

    let linhaMedia = 0 // p ara calculo de mediana
    let h = ic

    let x = 0 // limite top
    let y = 0 // limite baixo
    let facLinhaAnterior = 0 // fac da linha anterior
    let valorMenorLimite = 0 // menor xI--y, pega valor de X
    let frequenciaLinhaAtual = 0 // seleciona a frequencia da linha atual
    let modaFIC = -2 // maior fic entre so fic
    let moda = 0 // localização moda no vertor
    let facLimitado = 0
    let auxFac = 0
    for (let prop in obj) { // para selecionar a linha  de mediana
        x += obj[prop]
        //  //////console.log(prop, ' prop')
        for (let i = y; i <= x; i += 0.01) { // passar de 1 em 1 
            //  //////console.log((i).toFixed(2), '//q', ((facTotal * limite1)))
            if (((i).toFixed(1)) == ((facTotal * limite1).toFixed(1))) { // comapra em buscar da linha de mediana
                facLimitado = i.toFixed(0)
                valorMenorLimite = valoresMenores[prop]
                facLinhaAnterior = auxFac
                frequenciaLinhaAtual = obj[prop]
                linhaMedia = prop //linha mediana localizada
                auxFac[facLimitado] = prop
            };
        };
        y += obj[prop]
        if (x != auxFac) {
            auxFac = x
            //////console.log(auxFac, '//', x)
        }

        if (modaFIC <= obj[prop]) { //procurando maior FIC para calculo de moda
            modaFIC = obj[prop]
            moda = prop
        }

    };

    ////console.log(auxFac)
    //////console.log(limite1 , ' : ' , {facLimitado, facLinhaAnterior, frequenciaLinhaAtual,h, valorMenorLimite})
    let teste = FormulaMedina(facLimitado, facLinhaAnterior, frequenciaLinhaAtual, h, valorMenorLimite)

    return ((teste).toFixed(0))


};


const encontraValor = (TipoQ, NumQ) => { // para encontrar a % a ser calculada
    for (let i = 0; i <= 4; i++) {
        if (TipoQ[i].selected && NumQ.value != "Nulo") {
            let dividendo = 0
            switch (i) { // selecionar qual das 4 opções
                case 0:
                    dividendo = null;
                    break;
                case 1:
                    dividendo = 4;
                    break;
                case 2:
                    dividendo = 5;
                    break;
                case 3:
                    dividendo = 10;
                    break;
                case 4:
                    dividendo = 100;
                    break;
            };
            if (dividendo == null) {
                return 0
            } else {
                return ((NumQ.value / dividendo)) //retornar o valor já em %
            };

        };
    };
};
const execuçãoQ = () => {
    if (TipoT[3].checked == true) { // decil e os krai para quantitativa
        NumQ = document.getElementById("NumQ")
        QuantP = document.getElementById("QuantP")
        let TipoQ = document.getElementsByName("TipoQ")

        if (NumQ.value != null) {
            let valor = encontraValor(TipoQ, NumQ); // para encontrar a % a ser calculada
            let exe = valoresRetirados(valor)

            if (exe != Infinity && exe != undefined) {
                QuantP.innerHTML = exe
            }
        };
    } else {
        NumQ = document.getElementById("NumQ")
        QuantP = document.getElementById("QuantP")
        let TipoQ = document.getElementsByName("TipoQ")
        let indice = 0
        var Ql = NumQ.value
        if (TipoQ[1].selected && NumQ.value != "Nulo") Ql *= 25
        if (TipoQ[2].selected && NumQ.value != "Nulo") Ql *= 20
        if (TipoQ[3].selected && NumQ.value != "Nulo") Ql *= 10

        indice = (Ql * (colunas - 1)) / 100
        QuantP.innerHTML = ` ${str[Math.floor(indice)]}`
    }
};

const formulasQuatiletc = (limite) => {
    for (let i = 0; i < limite; i++) {
        NumQ.innerHTML += `<option value=${i + 1}>${i + 1} </option>`
    }
}

function processamento() {
    var valores = {} // auxliar
    for (let prop in test) {
        valores[prop] = test[prop]
        if (test[prop] == "	") {
            valores[prop] = ';'
        }
    }
    for (let prop in valores) {
        texto += valores[prop]

    }
}
$('#input-excel').change(function (e) {
    confirm = false
    var reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);

    reader.onload = function (e) {
        var data = new Uint8Array(reader.result);
        var wb = XLSX.read(data, {
            type: 'array'
        });

        test = XLSX.write(wb, {
            sheet: 0,
            type: 'binary',
            bookType: 'txt'
        });
        let b = ''
        test = test.split('\n')

        test = test.filter(n => n != "")
        for(let prop in test){
            b += test[prop] + ';' 
        }
        b = b.substring(0,(b.length - 1))

        texto = b
    }

});

function calcular(idTabela) {

    if (confirm == false) {
        str = texto
    } else {
        str = document.getElementById('txtDado').value
        if (str) {} else { // para retornar caso os dados digitados forem vazios
            return // retorna caso vazio
        };
    };
    // ////console.log(str, 'antes split')
    comp = str.split(";")
    str = str.split(";")
    // ////console.log(comp, 'dps do split')
    //Upload

    while (cG < comp.length) { //insere dados na tabela separados por ';' pelo número de vezes igual a quantidade de elementos do vetor

        if (TipoT[0].checked == true || TipoT[1].checked == true) { //processamento caso a primeira ou a segunda opção seja selecionada
            left = comp[cG] //Responsável por pegar os valores do vetor
            var leftC = String(left) //Converção para texto
            if (obj[leftC]) {
                obj[leftC]++ //Caso o elemento ja tenha sido recebido a propriedade do obejeto recebe +1
            } else {
                obj[leftC] = 1 //Caso o elemento não tenha sido adicionado a ele  
            }
            acum++
            //////console.log('OBJ ! : ', obj)
        }
        if (TipoT[2].checked == true) { // processamento caso a terceira opção seja selecionada

            var left = comp[cG] //Responsável por pegar os valores do vetor
            var leftC = Number(left) //Converte para número
            var teste = isNaN(leftC) //Caso o usuário digite um elemento que não seja um número
            if (teste == true) {
                if (teste == true) {
                    alert('Insira os dados novamente!')
                    document.getElementById('txtDado').value = ''
                    obj = {}
                    break;
                }
            } else {
                if (obj[leftC]) {
                    obj[leftC]++ //Caso o elemento ja tenha sido recebido a propriedade do obejeto recebe +1
                } else {
                    obj[leftC] = 1 //Caso o elemento não tenha sido adicionado a ele 
                }
            }
            acum++
        }
        if (TipoT[3].checked == true) { //processamento caso a terceira seja selecionada

            var left = comp[cG] //Responsável por pegar os valores do vetor
            var leftC = Number(left) //Converte para número
            var teste = isNaN(leftC) //Caso o usuário digite um elemento que não seja um número
            if (teste == true) {
                if (teste == true) {
                    alert('Insira os dados novamente!')
                    document.getElementById('txtDado').value = ''
                    obj = {}
                    break;
                }
            } else {
                acum++
                if (obj2[leftC]) {
                    obj2[leftC]++ //Caso o elemento ja tenha sido recebido a propriedade do obejeto recebe +1
                } else {
                    obj2[leftC] = 1 //Caso o elemento não tenha sido adicionado a ele 
                }
                if (leftC > max) { //Verifica se é o maior número
                    max = leftC
                }
                if (leftC < min) { //Verifica se é o menor número
                    min = leftC
                }
                amplitude = max - min //Calculo da amplitude
                k = Math.sqrt(acum) //arredonda o valor
                k = Math.trunc(k) //remove as casas decimais
                if (amplitude % k != 0) { //verifica se o número divide por 'k' e retorna um número inteiro
                    amplitude++ //caso a divisão não retorne um número inteiro 
                    if (amplitude % k != 0) { //Verifica se o resultado da divisão é um valor inteiro
                        amplitude = amplitude - 2 // caso não seja um inteiro, o valor perde dois números
                    }
                    max
                }
                ic = amplitude / k //valor do intervalo de classe
                //  ////console.log(ic)
                vet[acum] = leftC //Vetor para gerar gráfico

            };
        };
        cG++
    };
    //FimUpload
    let vetD = []
    let vetE = []
    var Variedade = document.getElementById('txtVariedade')
    let semFre = {}
    if (TipoT[3].checked == true) { //Processamento para gerar a tabéla caso a tabela Quantitativa Contínua
        for (let passo = min; passo < (max + 1); passo) { // determina o passo que ira percorrer os vetores
            semFre[passo] = false
            for (let j = ((passo.toFixed(0)) - 10); j <= (passo + ic); j++) {
                for (let prop in obj2) {
                    if (j == prop) { // seleciona dados para processamentos

                        if (j >= passo && j <= (passo + ic - 0.001)) { // pega só valores entre valorAtual l-- max
                            if (obj[`${passo.toFixed(0)}--${(passo + ic).toFixed(0)}`]) { // testa se obj já criado
                                obj[`${passo.toFixed(0)}--${(passo + ic).toFixed(0)}`] += obj2[prop] // crescenta valores dentro dos parametros
                                intervaloDeClasse[`${passo.toFixed(0)}--${(passo + ic).toFixed(0)}`] = ((passo + passo + ic) / 2).toFixed(0) // seleciona media de intervalo de classe
                                valoresTopo[`${passo.toFixed(0)}--${(passo + ic).toFixed(0)}`] = passo + ic //pega valor topo
                                valoresMenores[`${passo.toFixed(0)}--${(passo + ic).toFixed(0)}`] = passo
                            } else {
                                obj[`${passo.toFixed(0)}--${(passo + ic).toFixed(0)}`] = obj2[prop]; // cria novo valor dentro do obj
                                intervaloDeClasse[`${passo.toFixed(0)}--${(passo + ic).toFixed(0)}`] = ((passo + passo + ic) / 2).toFixed(0)
                                valoresTopo[`${passo.toFixed(0)}--${(passo + ic).toFixed(0)}`] = passo + ic //pega valor topo
                                valoresMenores[`${passo.toFixed(0)}--${(passo + ic).toFixed(0)}`] = passo // valores topo linhas anteres
                                semFre[passo] = true
                            };
                        }
                        break

                    }
                    /*
                    1;1;2;2;3;3;3;4;5;6;7;7;8;9;10;11;12;13;14;15;16;3;2;7;8
                     */
                }

            };
            if (semFre[passo] == false) { // se não a valores nesse passo, apareçera na tabela como 0
                obj[`${passo.toFixed(0)}--${(passo + ic).toFixed(0)}`] = 0
                intervaloDeClasse[`${passo.toFixed(0)}--${(passo + ic).toFixed(0)}`] = ((passo + passo + ic) / 2).toFixed(0)
            };
            vetD.push(Math.trunc(Number(passo)))
            vetE.push(Math.trunc(Number(passo + ic)))
            passo += ic
        };
        ////console.log(semFre)
        // ////console.log(obj)
        //////console.log({ vetD, vetE })
        vetD = vetD.filter((elem, i) => vetD.indexOf(elem) === i)
        vetE = vetE.filter((elem, i) => vetE.indexOf(elem) === i)

        let facTotal = 0
        let multipli = 0
        for (let prop in obj) { //Calculo de mediana
            multipli += (obj[prop] * intervaloDeClasse[prop]) // recebe valores a serem multiplicado
            facTotal += obj[prop] // recontagem do valor de fac
        };

        let linhaMedia = 0 // p ara calculo de mediana
        let h = ic
        let x = 0 // limite top
        let y = 0 // limite baixo
        let facLinhaAnterior = 0 // fac da linha anterior
        let valorMenorLimite = 0 // menor xI--y, pega valor de X
        let frequenciaLinhaAtual = 0 // seleciona a frequencia da linha atual
        let modaFIC = -2 // maior fic entre so fic
        let moda = 0 // localização moda no vertor
        let test = {}
        for (let prop in obj) { // para selecionar a linha  de mediana
            x += obj[prop]
            for (let i = y; i <= x; i++) { // passar de 1 em 1 
                if (i == ((facTotal * 0.5).toFixed(0))) { // comapra em buscar da linha de mediana
                    valorMenorLimite = valoresMenores[prop]
                    facLinhaAnterior = y
                    frequenciaLinhaAtual = obj[prop]

                    linhaMedia = prop //linha mediana localizada
                };
            };
            y += obj[prop]

            if (modaFIC <= obj[prop]) { //procurando maior FIC para calculo de moda
                modaFIC = obj[prop]
                moda = prop
            }

        };

        //calculo mediana
        valorMediana = FormulaMedina(facTotal, facLinhaAnterior, frequenciaLinhaAtual, h, valorMenorLimite)

        var pModa = document.getElementById("moda")
        var pMediana = document.getElementById("mediana")
        var pMedia = document.getElementById("media")

        pModa.innerHTML += '<span>' + intervaloDeClasse[moda] + '</span>'
        pMediana.innerHTML += '<span>' + ((valorMediana + 0).toFixed(2)) + '</span>'
        pMedia.innerHTML += '<span>' + ((multipli / facTotal).toFixed(0)) + '</span>' // inclui media no html


    };
    let i = 0


    // Organizar em ordem hierarquica
    if (TipoT[1].checked) {
        let vetPesos = []
        let hierarquia = document.getElementById("hierarquia").value
        let vetH = hierarquia.split(";")
        let vetOrd = []
        for (let i = 0; i < vetH.length; i++) {
            let objAux = {}
            objAux.nome = vetH[i]
            objAux.pesoN = i
            vetPesos.push(objAux) //vetor recebe as propriedades 
        }
        for (let i = 0; i < vetPesos.length; i++) {
            for (let l = 0; l < str.length; l++) {
                if (str[l] == vetPesos[i].nome) {
                    let objAux2 = {}
                    objAux2.nome = str[l]
                    objAux2.peso = vetPesos[i].pesoN
                    vetOrd.push(objAux2)
                }
            }
        }
        for (let l = 0; l < str.length; l++) {
            str[l] = vetOrd[l].nome
        }
        numDigitados = str.filter((elem, i) => str.indexOf(elem) === i)
    } else {
        for (let prop in obj) {
            numDigitados[i] = prop //vetor recebe as propriedades
            i++
        };
    }

    if (TipoT[0].selected) {
        str = quickSort(str)
    } else if (TipoT[2].checked || TipoT[3].checked || TipoT[0].checked) {
        numDigitados = quickSort(numDigitados)
    }


    i = 0
    let frac = 0
    for (let i in obj) {
        frac += obj[i]
    };
    var vetM = []
    // ////console.log('OBJ : ',obj)
    for (let prop in obj) { //Responsável por gerar as tabelas
        // TipoP    txtVariedade
        //   ////console.log('DENTRO DO OBJ')
        let x = document.getElementById('txtVariedade').value;
        var ti = document.getElementById('txtVariedade').value;
        document.getElementById('TipoP').innerHTML = x;
        var tabela = document.getElementById(idTabela);
        var numeroLinhas = tabela.rows.length;
        var linha = tabela.insertRow(numeroLinhas);
        var celula1 = linha.insertCell(0);
        var celula2 = linha.insertCell(1);
        var celula3 = linha.insertCell(2);
        var celula4 = linha.insertCell(3);
        var celula5 = linha.insertCell(4);
        let celula6 = linha.insertCell(5);

        if (TipoT[0].checked == true || TipoT[2].checked == true || TipoT[1].checked == true) {
            celula1.innerHTML = numDigitados[i] //Nome do dado
            celula2.innerHTML = obj[numDigitados[i]] //Frequencia
            celula3.innerHTML = `${((obj[numDigitados[i]] / acum) * 100).toFixed(2)}%` //Frequencia%
            // Processamento para 4 e quinta coluna
            colunas += obj[numDigitados[i]]
            celula4.innerHTML = colunas //frac
            celula5.innerHTML = ((colunas / frac) * 100).toFixed(0) + '%' //frac%
            pnT[i] = ((colunas / frac) * 100).toFixed(0)
            vetQ[i] = obj[numDigitados[i]]
            if (TipoT[2].checked == true) {
                //Pega a media dos valores
                vetM.push(numDigitados[i] * obj[numDigitados[i]])
            }
        } else {
            celula1.innerHTML = prop //Nome do dado
            celula2.innerHTML = obj[prop] //Frequencia
            celula3.innerHTML = `${((obj[prop] / acum) * 100).toFixed(2)}%` //Frequencia%
            //Processamento para 4 e quinta coluna
            colunas += obj[prop] //fac
            celula4.innerHTML = colunas //frac
            celula5.innerHTML = ((colunas / frac) * 100).toFixed(0) + '%' //frac%
            celula6.innerHTML = intervaloDeClasse[prop]
            pnT[i] = ((colunas / frac) * 100).toFixed(0)
            vetQ[i] = obj[prop]
            numDigitados[i] = prop
            console.log(`Esse ${vetD[i]} + esse ${vetE[i]}`)
            vetM.push((parseInt(Number(vetE[i]))) + (parseInt(Number(vetD[i]))) / 2)
            console.log(vetM[i])

        };
        i++
    };

    // ////console.log(`A media aqui ${vetM}`)
    if (TipoT[3].checked == true) {
        fillcolor = getRandomColor()
    }
    //Qualitativa Nominal
    if (TipoT[0].checked == true) {
        //Gerar Gráfico
        var ctx = document.getElementById("grafico")
        var chartGraph = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: numDigitados,
                datasets: [{
                    label: "Frequencia",
                    data: vetQ,
                    border: 6,
                    backgroundColor: [

                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                    ],
                }]
            },
            options: {
                responsive: true,
                animationSteps: 80,
                animationEasing: "easeOutQuart",
                //String - Point label font declaration
                pointLabelFontFamily: "Arial",
                //String - Point label font weight
                pointLabelFontStyle: "normal",
                //Number - Point label font size in pixels
                pointLabelFontSize: 20,
                //String - Point label font colour
                pointLabelFontColor: "black",
                maintainAspectRatio: false,
                title: {
                    text: ti,
                    display: true
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }

        })
        //Não tem Media
        var pMedia = document.getElementById("media")
        pMedia.innerHTML += `<span>Média inexistente.</span>`
        //Moda/O elemento com mais menções
        moda()
        //Mediana/Elemento Central
        mediana()
    }
    //Qualitativa Discreta
    else if (TipoT[2].checked == true) {
        //Gerar Gráfico
        var ctx = document.getElementById("grafico")
        var chartGraph = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: numDigitados,
                datasets: [{
                    label: "Frequencia",
                    data: vetQ,
                    border: 6,
                    backgroundColor: [
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                    ],
                }]
            },
            options: {
                responsive: true,
                animationSteps: 80,
                animationEasing: "easeOutQuart",
                //String - Point label font declaration
                pointLabelFontFamily: "Arial",
                //String - Point label font weight
                pointLabelFontStyle: "normal",
                //Number - Point label font size in pixels
                pointLabelFontSize: 20,
                //String - Point label font colour
                pointLabelFontColor: "black",
                maintainAspectRatio: false,
                title: {
                    text: ti,
                    display: true
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }

        })
        //Media
        media()
        //Moda/O elemento com mais menções
        moda()
        //Mediana/Elemento Central
        mediana()
        //Desvio Padrão
        //vetM é o vetor das médias
        //colunas o total de elementos inseridos
        DesvioPadrao(vetM, colunas, obj)
    }
    //Qualitativa Ordinal 
    else if (TipoT[1].checked) {
        //Gerar Gráfico
        var ctx = document.getElementById("grafico")
        var chartGraph = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: numDigitados,
                datasets: [{
                    label: "Frequencia",
                    data: vetQ,
                    border: 6,
                    backgroundColor: [

                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                        fillcolor = getRandomColor(), fillcolor = getRandomColor(),
                    ],
                }]
            },
            options: {
                responsive: true,
                animationSteps: 80,
                animationEasing: "easeOutQuart",
                //String - Point label font declaration
                pointLabelFontFamily: "Arial",
                //String - Point label font weight
                pointLabelFontStyle: "normal",
                //Number - Point label font size in pixels
                pointLabelFontSize: 20,
                //String - Point label font colour
                pointLabelFontColor: "black",
                maintainAspectRatio: false,
                title: {
                    text: ti,
                    display: true
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })
        //Média
        let mediaP = document.getElementById("media")
        mediaP.innerHTML += `<span>Não existe Média nesse caso.<span>`
        //Mediana
        mediana()
        //Moda
        moda()
    } else {
        var ctx = document.getElementById("grafico").getContext('2d')
        var chartGraph = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: numDigitados,
                datasets: [{
                    label: "Frequencia",
                    data: vetQ,
                    border: 6,
                    backgroundColor: [
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                        '#0000FF', '#0000FF',
                    ],
                }]
            },
            options: {
                responsive: true,
                title: {
                    text: ti,
                    display: true
                },
                scales: {
                    xAxes: [{
                        display: false,
                        barPercentage: 1.3,
                        ticks: {
                            max: 3,
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }, {
                        display: true,
                        ticks: {
                            autoSkip: false,
                            max: 4,
                        },
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })
        Converte(vetM)
        DesvioPadrao(vetM, colunas, obj)
    }

};

function getRandomColor() {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function saveAsPDF() {
    var doc = new jsPDF({
        unit: 'cm'
    });
    data = new Date();
    html2canvas(document.getElementById("print" /* div que tira foto*/ ), {
        onrendered: function (canvas) {
            var img = canvas.toDataURL();
            doc.addImage(img, 'JPEG', 1, 1, 19, 22); //posição no pdf
            doc.save("Relatorio - " + data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear() + ".pdf");
        }
    });
}

function media() {
    var pMedia = document.getElementById("media")
    Converte(str)
    let total = str.reduce((prev, elem) => prev + elem, 0)
    pMedia.innerHTML += `<span>${(total / str.length).toFixed(2)}</span>`
}

function moda() {
    var pModa = document.getElementById("moda")
    let i = 0
    let aux = 0
    let modas = []
    while (i <= numDigitados.length) {
        if (obj[numDigitados[i]] > aux) {
            aux = obj[numDigitados[i]]
        }
        i++
    }
    ////console.log(aux)
    i = 0
    while (i <= numDigitados.length) {
        if (obj[numDigitados[i]] >= aux && obj[numDigitados[i]] > 1) {
            modas.push(numDigitados[i])
        }
        i++
    }

    if (TestVetor(str)) {
        pModa.innerHTML += `<span> não existe</span>`
    } else if (moda.length > 1) {
        pModa.innerHTML += `<span> ${modas} </span>`
    } else {
        pModa.innerHTML += `<span> ${modas}</span>`
    }

}

function mediana() {
    var pMediana = document.getElementById("mediana")

    if (TipoT[2].checked || TipoT[0].checked) {
        ////console.log("Não caiu no if")
        Converte(str) //Converte pra número
        str = quickSort(str)
    }

    if (str.length % 2 == 0) {
        pMediana.innerHTML += `<span> ${str[(str.length / 2) - 1]} e ${str[str.length / 2]}</span>`
    } else {
        pMediana.innerHTML += `<span> ${str[(Math.round(str.length - 1) / 2)]}</span>`
    }
}

function Converte(str) {
    let i = 0
    if (TipoT[2].checked) {
        while (i < str.length) {
            str[i] = Number(str[i])
            i++
        }
    }
    return str
}

function TestVetor(vetor) {
    var filtrado = vetor.filter((elem, pos, vet) => {
        return vet.indexOf(elem) == pos;
    });
    return filtrado.length === 1 || filtrado.length === vetor.length;
}

function inserirOpcoes(limite) {
    for (let i = 0; i < limite; i++) {
        NumQ.innerHTML += `<option value=${i + 1}>${i + 1}</option>`
    }
}

function quickSort(vet) {
    if (vet.length === 0) return []
    if (vet.length === 1) return vet

    var pivot = vet[0]

    var head = vet.filter(n => n < pivot)
    var equal = vet.filter(n => n === pivot)
    var tail = vet.filter(n => n > pivot)

    return quickSort(head).concat(equal).concat(quickSort(tail))
}
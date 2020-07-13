$('#sumiu').on('click', function () {
    $('section.tela1').hide();
    $('section.tela2').show();
});
var vetObj = []
var a = 0
var b = 0
var x = []
var y = []
var Linha = []
var numE = 0
var aux = []



function calcular(valorImport = false, exel1, exel2) {
    let dadosX
    let dadosY

    if (valorImport == false) {

        dadosX = document.getElementById("dadosX").value
        dadosY = document.getElementById("dadosY").value

        console.log('1 aqui', {
            x,
            y
        })
    } else {
        console.log('2 aqui', {
            exel1,
            exel2
        })
        dadosX = exel1
        dadosY = exel2
    }

    x = dadosX.split(";")
    y = dadosY.split(";")

    x = x.map(n => n = Number(n)) //Converte pra número
    y = y.map(n => n = Number(n)) //Converte pra número
    console.log({
        x,
        y
    })





    let xy = []
    for (let i = 0; i < x.length; i++) xy.push(x[i] * y[i]) //vetor da multiplicação dos dados

    let xyT = xy.reduce((prev, elem) => prev + elem, 0) //total do vetor de multiplicação

    let x2 = x.map(n => n = Math.pow(n, 2)) //vetor dos dados ao quadrado de x
    let y2 = y.map(n => n = Math.pow(n, 2)) //vetor dos dados ao quadrado de y

    let x2T = x2.reduce((prev, elem) => prev + elem, 0) //total do vetor dos dados ao quadrado de x
    let y2T = y2.reduce((prev, elem) => prev + elem, 0) //total do vetor dos dados ao quadrado de y

    let xT = x.reduce((prev, elem) => prev + elem, 0) //A soma dos dados X
    let yT = y.reduce((prev, elem) => prev + elem, 0) //A soma dos dados Y

    let n = xy.length //número de observações de histórico
    let r = correlacao(xy, xT, yT, x2T, y2T, xyT, n)

    if (r > 0 && r < 0.3) {
        return alert('Correlação inexistente ou fraca')
    } else if (r >= 0.3 && r < 0.6) {
        return alert('Correlação fraca ou média')
    }

    //Variavel que recebe o número de elemento
    numE = xy.length


    //começando a regressão
    a = calcA(n, xyT, xT, yT, x2T).toFixed(2)
    console.log(a)
    b = calcB(n, xT, yT, a).toFixed(2)
    console.log(b)

    resultado1.innerHTML = `<p>${r}</p>`
    resultado2.innerHTML += `<p>y = ${a}x + ${b}</p>`

    //vetor para gerar gráfico
    for (let i = 0; i < xy.length; i++) {
        vetObj.push({
            x: x[i],
            y: y[i]
        })
    }

    //Gerando Gráfico
    Linha = dadosL()
    graphGenerator()

}

//formula do coficiente de Correlação
const correlacao = (xy, xT, yT, x2T, y2T, xyT, n) => (((n * xyT) - (xT * yT)) / (Math.sqrt((n * x2T) - Math.pow(xT, 2)) * Math.sqrt((n * y2T) - Math.pow(yT, 2)))).toFixed(2)

//formula de coficiente a
const calcA = (n, xyT, xT, yT, x2T) => ((n * xyT) - (xT * yT)) / ((n * x2T) - (Math.pow(xT, 2)))


//formula de coficiente b

const calcB = (n, xT, yT, a) => calcY(n, yT) - (a * calcX(n, xT))
const calcY = (n, yT) => yT / n
const calcX = (n, xT) => xT / n

//gerar Gráfico
function graphGenerator() {
    var ctx = document.getElementsByClassName("chart")

    var scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Dados',
                data: vetObj,
                borderColor: "rgba(6,204,6,0.85)",
                backgroundColor: "rgba(6,204,6,0.85)"
            }, {
                label: `Reta`,
                type: 'line',
                data: Linha,
                fill: false,
                borderColor: "rgba(0,235,0,0.85)",
                backgroundColor: "rgba(0,235,0,0.85)",
                showLine: true,
                pointRadius: 0
            }],

        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                }]
            }
        }
    });
}

//Insersão de dados

//A partir do eixo x
function inserirX() {
    let xAux = prompt("Digite o Valor a ser inserido")
    let yAux = Number(a * xAux) + Number(b)
    vetObj.push({
        x: xAux,
        y: yAux
    })

    x.push(xAux)
    y.push(yAux)

    Linha = dadosL()
    graphGenerator()

    let funcoes = document.getElementById("funcoes")
    funcoes.innerHTML = `
        <button onclick="desfazerT()">Desfazer Tudo</button>
        <button onclick="desfazer()">Desfazer</button>
    `
}

//No eixo y
function inserirY() {
    let yAux = prompt("Digite o Valor a ser inserido")
    let xAux = (yAux - b) / a
    vetObj.push({
        x: xAux,
        y: yAux
    })

    x.push(xAux)
    y.push(yAux)

    Linha = dadosL()
    graphGenerator()

    let funcoes = document.getElementById("funcoes")
    funcoes.innerHTML = `
        <button onclick="desfazerT()">Desfazer Tudo</button>
        <button onclick="desfazer()">Desfazer</button>
    `
}

//Dados do vetor do grafico de linha
function dadosL() {
    let maior = y.reduce((a, b) => Math.max(a, b))
    let menor = y.reduce((a, b) => Math.min(a, b))

    console.log(maior)
    console.log(menor)

    let dadosL = [{
        x: (menor - b) / a,
        y: menor
    }, {
        x: (maior - b) / a,
        y: maior
    }]

    return dadosL
}

function desfazer() {
    if (numE == vetObj.length) return alert("Impossivel realizar essa ação")
    else {
        aux = vetObj.pop()
        x.pop()
        y.pop()
        Linha = dadosL()
        graphGenerator()
    }
}

function desfazerT() {
    vetObj = vetObj.slice(0, numE)
    x = x.slice(0, numE)
    y = y.slice(0, numE)
    Linha = dadosL()
    graphGenerator()
}



$('#input-excel').change(function (e) {
    console.log('deus tem piedade 2')
    confirm = false
    let vetor1
    let vetor2
    var reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);

    reader.onload = function (e) {
        var data = new Uint8Array(reader.result);
        var wb = XLSX.read(data, {
            type: 'array',
        });
        console.log('pedroooos  a')

        let a = XLSX.write(wb, {
            sheet: 0,
            type: 'binary',
            bookType: 'txt',
        });
        console.log(a)
        // let b = a.split('\n')

        //  vetor1 = (b[0]).replace('	', ';')
        //  vetor1 = vetor1.replace('	', ';')
        //  vetor1 = vetor1.replace('	', ';')
        //  vetor1 = vetor1.replace('	', ';')
        //  vetor1 = vetor1.replace('	', ';')
        //  vetor1 = vetor1.replace('	', ';')
        //  vetor1 = vetor1.replace('	', ';')
        //  vetor1 = vetor1.replace('	', ';')
        //  vetor1 = vetor1.replace('	', ';')
        //  vetor1 = vetor1.replace('	', ';')
        //  vetor1 = vetor1.replace('	', ';')
        //  vetor2 = (b[1]).replace('	', ';')
        //  vetor2 = vetor2.replace('	', ';')
        //  vetor2 = vetor2.replace('	', ';')
        //  vetor2 = vetor2.replace('	', ';')
        //  vetor2 = vetor2.replace('	', ';')
        //  vetor2 = vetor2.replace('	', ';')
        //  vetor2 = vetor2.replace('	', ';')
        //  vetor2 = vetor2.replace('	', ';')
        //  vetor2 = vetor2.replace('	', ';')
        //  vetor2 = vetor2.replace('	', ';')
        //  vetor2 = vetor2.replace('	', ';')
        //  vetor2 = vetor2.replace('	', ';')
        $('section.tela1').hide();
        $('section.tela2').show();

        //calcular(true, vetor1, vetor2)
    }

});

// 2;22;1;1;2;5;6;7;8;0;4
// 2;3;51;3;3;53;1;41;2;42;1
$('#calcular').on('click', function () {
    $('section.tela1').hide();
    $('section.tela2').show();
});

//Função Principal
function calcular() {
    let min = document.getElementById("mimNumber").value
    let max = document.getElementById("maxNumber").value
    let TipoC = document.getElementsByName("TipoC")
    let res = document.getElementById("res")

    let dados = document.getElementById("dados").value
    let r = 0
    let r2 = 0
    let ic = max - min
    let dv = valorVariancia(ic)
    let media = valorMedio(max, min)
    let mediaD = 0
    let prob = 0
    if (TipoC[2].selected) {
        let vetAux = dados.split(";")
        r = Number(vetAux[0])
        r2 = Number(vetAux[1])
        if ((r > min && r < max) && (r2 > min && r2 < max)) {
            mediaD = r2 - r
            prob = densidade(max, min, mediaD)
        }
    } else {
        r = Number(dados)
        if (TipoC[3].selected) {
            mediaD = max - r
            prob = densidade(max, min, mediaD)
            console.log(prob)
        } else if ((TipoC[4].selected) && (r > min && r < max)) {
            mediaD = r - min
            prob = densidade(max, min, mediaD)
        }
    }





    /*  console.log(max)
     console.log(min)
     console.log(ic)
 
     console.log(prob)
     console.log(media)
     console.log(variancia)
  */
    res1.innerHTML = `<p>${(prob * 100).toFixed(2)}%</p>`
    res2.innerHTML = `<p>${media}</p>`
    res3.innerHTML = `<p>${dv.toFixed(2)}</p>`
    res4.innerHTML = `<p>${((dv.toFixed(2) / media) * 100).toFixed(2)}%</p>`

}

//Média
const valorMedio = (max, min) => (Number(max) + Number(min)) / 2
//Variancia
function valorVariancia(ic) {
    let divResult = (Math.pow(ic, 2)) / 12
    let result = Math.sqrt(divResult)
    return result
}

function densidade(max, min, mediaD) {
    result = (1 / (max - min)) * mediaD
    return result
}
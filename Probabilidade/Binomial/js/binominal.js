$('#calcular').on('click', function () {
    $('section.tela1').hide();
    $('section.tela2').show();
});

//Função principal
function calcular() {
    //Sucesso
    let p = document.getElementById("sucesso").value
    //Falha
    let q = document.getElementById("fracasso").value
    //amostra 
    let n = document.getElementById("amostra").value
    //Evento
    let k = document.getElementById("evento").value
    //Lançar dados no html
    let result = document.getElementById("result")

    //Divide os dados em um array
    let vetN = k.split(";")
    //converte ele em números
    vetN = vetN.map(n => n = Number(n))

    let vetRes = []
    for (let i = 0; i < vetN.length; i++) {
        vetRes[i] = formula(p, q, n, vetN[i])
    }

    let res = (vetRes.reduce((prev, elem) => prev + elem, 0)) * 100



    result1.innerHTML = `<p>${parseFloat(res).toFixed(2)}%<p>`
    result2.innerHTML = `<p>${n*p}</p>`
    result3.innerHTML = `<p>${Math.sqrt(n*p*q).toFixed(2)}</p>`
    result3.innerHTML = `<p>${((Math.sqrt(n*p*q).toFixed(2)/(n*p))).toFixed(2)}</p>`
    result4.innerHTML += `<p>${(((Math.sqrt(n*p*q).toFixed(2))/(n*p))*100).toFixed(2)}%</p>`


}

//Funções auxiliares

//Fatorial
const fatorial = (n) => n === 0 || n === 1 ? 1 : n * fatorial(n - 1)

//Analise Combinatoria
const analiseComp = (n, k) => fatorial(n) / (fatorial(k) * fatorial(Number(n) - Number(k)))

//Executa a formula
const formula = (p, q, n, k) => (analiseComp(n, k) * Math.pow(p, k)) * (Math.pow(q, (n - k)))
//Não esquecer do *100
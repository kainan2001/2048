const celulas = document.querySelectorAll('.celula')

const eventos = {
    ArrowUp: function () {
        moveUp()
        somarUp()
        moveUp()
        preencheCelula()

    },
    ArrowDown: function () {
        moveDown()
        somarDown()
        moveDown()
        preencheCelula()
    },
    ArrowLeft: function () {
        moveLeft()
        somarLeft()
        moveLeft()
        preencheCelula()
    },
    ArrowRight: function () {
        
        moveRight()
        somarRight()
        moveRight()
        preencheCelula()

    }
}

function gerarLinhas() {
    const elemento = document.querySelectorAll(".celula")
    const linhas = [[], [], [], []]
    let delta = 0
    elemento.forEach((celula, indice) => {
        if (celula.innerHTML != "") {
            linhas[delta].push(indice + 1)
        } else {
            linhas[delta].push('vazio')
        }
        if ((indice + 1) % 4 == 0) {
            delta++
        }
    })

    return linhas
}

function gerarIndiceLinhas() {
    const elemento = document.querySelectorAll(".celula")
    const linhas = [[], [], [], []]
    let delta = 0
    elemento.forEach((celula, indice) => {
        
            linhas[delta].push(indice + 1)

        if ((indice + 1) % 4 == 0) {
            delta++
        }
    })

    return linhas
}

function gerarColunas() {
    const elemento = document.querySelectorAll(".celula")
    const colunas = [[], [], [], []]
    let delta = 0
    for (let i = 0; i < 4; i++) {
        delta = i
        for (let j = 0; j < 4; j++) {
            if (elemento[delta].innerHTML == "") {
                colunas[i].push("vazio")
            } else {
                colunas[i].push(delta + 1)
            }
            delta += 4
        }
    }
    return colunas
}

function gerarIndiceColunas() {
    const elemento = document.querySelectorAll(".celula")
    const colunas = [[], [], [], []]
    let delta = 0
    for (let i = 0; i < 4; i++) {
        delta = i
        for (let j = 0; j < 4; j++) {
            colunas[i].push(delta + 1)
            delta += 4
        }
    }
    return colunas
}

function gerar2ou4() {
    const numero = Math.random() >= 0.9 ? 4 : 2
    return numero
}

function retornaCelulaVazia() {
    const elemento = document.querySelectorAll(".celula")
    const vazios = []
    elemento.forEach((celula, indice) => {
        if (celula.innerHTML == "") {
            vazios.push(indice + 1)
        }
    })
    const vazio = Math.floor(Math.random() * vazios.length)
    return vazios[vazio]
}

function preencheCelula() {
    const vazia = retornaCelulaVazia()
    const celula = document.querySelector(`.c${vazia}`)
    const div = document.createElement('div')
    div.style = ""
    div.classList.add('preenche')
    div.innerText = gerar2ou4()
    div.classList.add(`x${div.innerText}`)
    vazia && celula.appendChild(div)
}

function moveLeft() {
    const linhas = gerarLinhas()
    let contador = 0

    for (let i = 0; i < 4; i++) {
        for (let j = 3; j >= 0; j--) {
            if (linhas[i][j] == "vazio") {
                linhas[i].splice(j, 1)
                linhas[i].push("vazio")
            }
        }
    }

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (linhas[i][j] != "vazio") {
                celulas[contador].appendChild(celulas[linhas[i][j] - 1].firstChild)
            }
            contador++
        }
    }
}
function moveRight() {
    const linhas = gerarLinhas()
    let contador = 0

    for (let i = 0; i < 4; i++) {
        for (let j = 1; j <= 3; j++) {
            if (linhas[i][j] == "vazio") {
                linhas[i].splice(j, 1)
                linhas[i].unshift("vazio")
            }
        }
    }

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (linhas[i][j] != "vazio") {
                celulas[contador].appendChild(celulas[linhas[i][j] - 1].firstChild)
            }
            contador++
        }
    }
}
function moveUp() {
    const colunas = gerarColunas()
    let contador = 0

    for (let i = 0; i < 4; i++) {
        for (let j = 3; j >= 0; j--) {
            if (colunas[i][j] == "vazio") {
                colunas[i].splice(j, 1)
                colunas[i].push("vazio")
            }
        }
    }
    for (let i = 0; i < 4; i++) {
        contador = i
        for (let j = 0; j < 4; j++) {
            if (colunas[i][j] != "vazio") {
                celulas[contador].appendChild(celulas[colunas[i][j] - 1].firstChild)
            }
            contador += 4
        }
    }
}
function moveDown() {
    const colunas = gerarColunas()
    let contador = 0

    for (let i = 0; i < 4; i++) {
        for (let j = 1; j <= 3; j++) {
            if (colunas[i][j] == "vazio") {
                colunas[i].splice(j, 1)
                colunas[i].unshift("vazio")
            }
        }
    }

    for (let i = 0; i < 4; i++) {
        contador = i
        for (let j = 0; j < 4; j++) {
            if (colunas[i][j] != "vazio") {
                celulas[contador].appendChild(celulas[colunas[i][j] - 1].firstChild)
            }
            contador += 4
        }
    }
}

function somarRight() {
    const linhas = gerarIndiceLinhas()

    let soma
    let elemento1
    let elemento2
    let posicaoAtual

    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {

            posicaoAtual = linhas[i][j]-1

            //somando elementos
            elemento1 = celulas[posicaoAtual]
            elemento2 = celulas[posicaoAtual+1]
            soma = parseInt(elemento1.innerText) + parseInt(elemento2.innerText)

            if(elemento1.innerText == elemento2.innerText && elemento1.innerText != ""){
                //removendo tag html
                celulas[posicaoAtual].removeChild(elemento1.firstElementChild)
                //adicionando soma a tag
                elemento2.firstElementChild.innerText = soma
                //removendo classe antiga
                elemento2.firstElementChild.classList.remove(`x${elemento1.innerText}`)
                //adicionando classe nova
                elemento2.firstElementChild.classList.add(`x${soma}`)
            }
        }

    }
}

function somarLeft() {
    const linhas = gerarIndiceLinhas()

    let soma
    let elemento1
    let elemento2
    let posicaoAtual

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {

            posicaoAtual = linhas[i][j]-1

            //somando elementos
            elemento1 = celulas[posicaoAtual]
            elemento2 = celulas[posicaoAtual+1]
            soma = parseInt(elemento1.innerText) + parseInt(elemento2.innerText)

            if(elemento1.innerText == elemento2.innerText && elemento1.innerText != ""){
                //removendo tag html
                celulas[posicaoAtual].removeChild(elemento1.firstElementChild)
                //adicionando soma a tag
                elemento2.firstElementChild.innerText = soma
                //removendo classe antiga
                elemento2.firstElementChild.classList.remove(`x${elemento1.innerText}`)
                //adicionando classe nova
                elemento2.firstElementChild.classList.add(`x${soma}`)
            }
        }

    }
}

function somarUp() {
    const colunas = gerarIndiceColunas()

    let soma
    let elemento1
    let elemento2
    let posicaoAtual

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {

            posicaoAtual = colunas[i][j]-1

            //somando elementos
            elemento1 = celulas[posicaoAtual]
            elemento2 = celulas[posicaoAtual+4]
            soma = parseInt(elemento1.innerText) + parseInt(elemento2.innerText)

            if(elemento1.innerText == elemento2.innerText && elemento1.innerText != ""){
                //removendo tag html
                celulas[posicaoAtual].removeChild(elemento1.firstElementChild)
                //adicionando soma a tag
                elemento2.firstElementChild.innerText = soma
                //removendo classe antiga
                elemento2.firstElementChild.classList.remove(`x${elemento1.innerText}`)
                //adicionando classe nova
                elemento2.firstElementChild.classList.add(`x${soma}`)
            }
        }

    }
}

function somarDown() {
    const colunas = gerarIndiceColunas()
    let soma
    let elemento1
    let elemento2
    let posicaoAtual
    
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {

            posicaoAtual = colunas[i][j]-1

            //somando elementos
            elemento1 = celulas[posicaoAtual]
            elemento2 = celulas[posicaoAtual+4]
            soma = parseInt(elemento1.innerText) + parseInt(elemento2.innerText)

            if(elemento1.innerText == elemento2.innerText && elemento1.innerText != ""){
                //removendo tag html
                celulas[posicaoAtual].removeChild(elemento1.firstElementChild)
                //adicionando soma a tag
                elemento2.firstElementChild.innerText = soma
                //removendo classe antiga
                elemento2.firstElementChild.classList.remove(`x${elemento1.innerText}`)
                //adicionando classe nova
                elemento2.firstElementChild.classList.add(`x${soma}`)
            }
        }

    }
}

document.onkeyup = e => {
    new eventos[e.key]()
}

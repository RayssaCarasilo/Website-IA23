const elQuiz = document.querySelector(".quiz")
const elPergunta = elQuiz.querySelector(".pergunta")
const elAlternativas = elQuiz.querySelector(".alternativas")
const elContador = elQuiz.querySelector(".contador")
const elCorretas = elContador.querySelector(".corretas")
const elErradas = elContador.querySelector(".erradas")

const elModalFinish = document.querySelector(".modal-finishe")
const elContadorFinish = elModalFinish.querySelector(".contador")
const elCorretasFinish = elContadorFinish.querySelector(".corretas")
const elErradasFinish = elContadorFinish.querySelector(".erradas")

const questionNumberSpan = document.querySelector(".current-question");

async function main() {
  const requisicao = await fetch("quiz.json")
  const quiz = await requisicao.json()
  
  let nCorretas = 0
  let nErradas = 0
  let questaoAtual = 0
  let alternativaCorretaAtual

  elCorretas.innerHTML = nCorretas
  elErradas.innerHTML = nErradas

  function carregarQuestao(numeroDaQuestao) {
    const questao = quiz[numeroDaQuestao]
    alternativaCorretaAtual = questao.correta
    elPergunta.innerText = questao.pergunta
    elAlternativas.innerHTML = ""
    questao.alternativas.forEach(alt => {
      elAlternativas.innerHTML += `<button>${alt}</button>`
    })
  }


  elAlternativas.addEventListener("click", ev => {
    const botaoClicado = ev.target.closest("button")
    if (!botaoClicado) return

    const listaDeFilhos = [...elAlternativas.children]
    const alternativaCorretaClicada = listaDeFilhos.indexOf(botaoClicado)

    if (alternativaCorretaClicada == alternativaCorretaAtual) {
      nCorretas++
      elCorretas.innerHTML = nCorretas
      if (questaoAtual == quiz.length-1) {
        elCorretasFinish.innerHTML = nCorretas
        elErradasFinish.innerHTML = nErradas
        return elModalFinish.classList.add("open")
      }
      return carregarQuestao(++questaoAtual)
    }
    
    nErradas++
    elErradas.innerHTML = nErradas
  })

  carregarQuestao(questaoAtual)
}

main()

const modal = document.querySelector('.modal')
const close = modal.querySelector('.close')
const open = document.querySelector('button')

open.addEventListener('click', () => {
  modal.classList.add("opened")
})

close.addEventListener('click', () => {
  modal.classList.remove("opened")
})

modal.addEventListener('click', (evt) => {
  if (evt.target.classList.contains("modal")) {
    modal.classList.remove("opened")
  }
})
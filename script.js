// variaveis de controle de interface

let votoCandidato = document.querySelector(".text span");

let cargo = document.querySelector(".cadidato span");

let numeros = document.querySelector(".digito");

let descricao = document.querySelector(".informacoes-candidato");

let aviso = document.querySelector(".container-informações");

let imgCandidatos = document.querySelector(".container-candidato");


// Variaveis de controle de ambiente
let etapaAtual = 0;

let numeroDigitado = "";

let votoBranco = false;

let votos = [];

// funções
function comecarEtapa() {
  let etapa = etapas[etapaAtual];

  numeroDigitado = "";

  let numeroHtml = "";

  votoBranco = false;

  for (let i = 0; i < etapa.numeros; i++) {
    if (i === 0) {
      numeroHtml += '<div class="numero pisca"></div>';
    } else {
      numeroHtml += '<div class="numero"></div>';
    }
  }

  votoCandidato.style.display = "none";
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = "";
  aviso.style.display = "none";
  imgCandidatos.innerHTML = "";
  numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
  let etapa = etapas[etapaAtual];

  let candidato = etapa.candidatos.filter((item) => {
    if (item.numero == numeroDigitado) {
      return true;
    } else {
      return false;
    }
  });

  if (candidato.length > 0) {
    candidato = candidato[0];
    votoCandidato.style.display = "block";
    aviso.style.display = "block";
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
    let fotosHtml = "";

    for (let i in candidato.fotos) {
      if (candidato.fotos[i].small) {
        fotosHtml += `<div class="img-candidato small"><img src="./assets/${candidato.fotos[i].url}" alt="foto candidato batman">${candidato.fotos[i].legenda}</div>`;
      } else {
        fotosHtml += `<div class="img-candidato small"><img src="./assets/${candidato.fotos[i].url}" alt="foto candidato batman">${candidato.fotos[i].legenda}</div>`;
      }
    }

    imgCandidatos.innerHTML = fotosHtml;
  } else {
    votoCandidato.style.display = "block";
    aviso.style.display = "block";
    descricao.innerHTML = `<div class="aviso-grande pisca">VOTO NULO</div>`;
  }
}

function clicou(n) {
  let elNumero = document.querySelector(".numero.pisca");
  if (elNumero != null) {
    elNumero.innerHTML = n;
    numeroDigitado = `${numeroDigitado}${n}`;

    elNumero.classList.remove("pisca");
    if (elNumero.nextElementSibling !== null) {
      elNumero.nextElementSibling.classList.add("pisca");
    } else {
      atualizaInterface();
    }
  }
}

function branco() {
  if (numeroDigitado === "") {
    votoBranco = true;
    votoCandidato.style.display = "block";
    aviso.style.display = "block";
    numeros.innerHTML = "";
    descricao.innerHTML = `<div class="aviso-grande pisca">VOTO EM BRANCO</div>`;
  } else {
    alert("Não pode haver números digitados para votos em branco");
  }
}

function corrige() {
  comecarEtapa();
}

function confirma() {
  let etapa = etapas[etapaAtual];

  let votoConfirmado = false;

  if (votoBranco === true) {
    votoConfirmado = true;
    votos.push({
        etapa: etapas[etapaAtual].titulo,
        voto:'Branco'
    })
  } else if (numeroDigitado.length === etapa.numeros) {
    console.log(numeroDigitado);
    votoConfirmado = true;
    votos.push({
        etapa: etapas[etapaAtual].titulo,
        voto: numeroDigitado
    })
  }

  if (votoConfirmado) {
    etapaAtual++;
    if (etapas[etapaAtual] !== undefined) {
      comecarEtapa();
    }else {
        document.querySelector('.tela').innerHTML = '<div class="aviso-fim pisca">FIM</div>'
        console.log(votos)
    }
  }
}

comecarEtapa();

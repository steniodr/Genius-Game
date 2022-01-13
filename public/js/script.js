let order = [];
let clickedOrder = [];
let score = 0;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelectorAll('.blue');
const red = document.querySelectorAll('.red');
const green = document.querySelectorAll('.green');
const yellow = document.querySelectorAll('.yellow');

//cria ordem aletoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(order[i], elementColor, Number(i) + 1);
    }
}

//acende a proxima cor
let lightColor = (color, elements, number) => {
    number = number * 500;
    setTimeout(() => {
        for (let element of elements)
            element.classList.add('selected');
        soundColor(color);
    }, number - 250);
    setTimeout(() => {
        for (let element of elements)
            element.classList.remove('selected');
    }, number + 150);
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        // alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

//funcao para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    let elements = createColorElement(color)
    for (let element of elements)
        element.classList.add('selected');
    soundColor(color);

    setTimeout(() => {
        let elements = createColorElement(color)
        for (let element of elements)
            element.classList.remove('selected');
        checkOrder();
    },250);
}

//funcao que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//funcao para adicionar som
let soundColor = (color) => {
    if ((color == 0) || (color == 'green')) {
        let audio = new Audio('../sound/click-1.wav');
        audio.play();
        if (audio.currentTime > 0.5) {
            setTimeout(() => {
                audio.pause();
            }, 450);
        }
    } else if ((color == 1) || (color == 'red')) {
        let audio = new Audio('../sound/click-2.wav');
        audio.play();
        if (audio.currentTime > 0.5) {
            setTimeout(() => {
                audio.pause();
            }, 450);
        }
    } else if ((color == 2) || (color == 'yellow')) {
        let audio = new Audio('../sound/click-3.wav');
        audio.play();
        if (audio.currentTime > 0.5) {
            setTimeout(() => {
                audio.pause();
            }, 450);
        }
    } else if ((color == 3) || (color == 'blue')) {
        let audio = new Audio('../sound/click-4.wav');
        audio.play();
        if (audio.currentTime > 0.5) {
            setTimeout(() => {
                audio.pause();
            }, 450);
        }
    }
}

//função para iniciar musica de game over
let soundErrorPlay = () => {
    let audio = new Audio('../sound/game-over.wav');
    audio.play();
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    score++;

    document.getElementById('score').innerHTML = `SCORE [${score * 100}]`
    document.getElementById('level').innerHTML = `LEVEL [${score}]`
    shuffleOrder();
}

//funcao para game over
let gameOver = () => {
    //alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];
    Swal.fire({
        type: 'error',
        title: 'GAME OVER!',
        text: `Sua pontuação: ${score * 100}`,
        onOpen: () => {
            soundErrorPlay();
        },
        onClose: () => {
            document.location.reload(true);
        }
    });
}

//funcao de inicio do jogo
let playGame = (mode) => {
    document.querySelector('.info').style.display = 'none';
    document.querySelector('.aboutMe').style.display = 'none';

    if (mode == 'Padrão'){
        document.querySelector('.genius-default').style.display = 'grid';
        document.getElementById('button-default').style.display = 'none';
        document.getElementById('button-custom').style.display = 'none';

        document.body.classList.add('default');
    } else if (mode == 'Customizado'){
        document.querySelector('.genius-custom').style.display = 'grid';
        document.getElementById('button-default').style.display = 'none';
        document.getElementById('button-custom').style.display = 'none';

        document.body.classList.add('custom');
    }
    // alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
    
    score = 0;
    Swal.fire({
        title: `Bem vindo ao Genius [${mode}]!`,
        html: 'Iniciando novo jogo em <strong></strong> segundos.',
        type: "success",
        showConfirmButton: false,
        timer: 3000,
        closeOnClickOutside: false,
        onOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
                Swal.getContent().querySelector('strong')
                    .textContent = Math.ceil(Swal.getTimerLeft() / 1000)
            }, 100)
        },
        onClose: () => {
            clearInterval(timerInterval)
        }
    });

    setTimeout(() => {
        nextLevel();
    }, 4000);
}

//eventos de clique para as cores
for (let i in green){
    green[i].onclick = () => click(0);
}
for (let i in red){
    red[i].onclick = () => click(1);
}
for (let i in yellow){
    yellow[i].onclick = () => click(2);
}
for (let i in blue){
    blue[i].onclick = () => click(3);
}

let btnBackToTop = document.querySelector('[class="btn-back-to-top'),
    scrollDuration = 700;

window.onscroll = () => {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300)
        btnBackToTop.style.display = 'block';
    else
        btnBackToTop.style.display = 'none';
}

function backToTop() {
    (!window.requestAnimationFrame) ? window.scrollTo(0, 0): Util.scrollTo(0, scrollDuration);
}
// green.onclick = () => click(0);
// red.onclick = () => click(1);
// yellow.onclick = () => click(2);
// blue.onclick = () => click(3);

// //inicio do jogo
// playGame();
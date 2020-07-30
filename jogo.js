const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


const background = {
    source: sprites,
    spriteX: 390,             //sx, sy,          (Origem/ponto inicial)
    spriteY: 0,
    spriteWidth: 275,        //sWidth, sHeight, (Tamanho do recorte na Sprite)
    spriteHeight: 204,
    dx: 0,                 //dx, dy,          (Origem de inserção da imagem no canvas)
    dy: canvas.height - 204,
    dWidth: 275,             
    dHeight: 204,            //dWidth, dHeight  (Tamanho da imagem no canvas)

    render(){
        contexto.fillStyle = '#70c5ce';                     //cor do fundo
        contexto.fillRect(0,0,canvas.width,canvas.height)   //retangulo que preenche o fundo da tela
        
        contexto.drawImage(
            background.source,
            background.spriteX, background.spriteY,
            background.spriteWidth, background.spriteHeight,
            background.dx, background.dy,
            background.dWidth, background.dHeight,
        );
        contexto.drawImage(
            background.source,
            background.spriteX, background.spriteY,
            background.spriteWidth, background.spriteHeight,
            (background.dx+background.dWidth), background.dy,
            background.dWidth, background.dHeight,
        );
    }
}



const ground = {
    source: sprites,
    spriteX: 0,              //sx, sy,          (Origem/ponto inicial)
    spriteY: 610,
    spriteWidth: 224,        //sWidth, sHeight, (Tamanho do recorte na Sprite)
    spriteHeight: 112,
    dx: 0,                   //dx, dy,          (Origem de inserção da imagem no canvas)
    dy: canvas.height-112,
    dWidth: 224,             
    dHeight: 112,            //dWidth, dHeight  (Tamanho da imagem no canvas)

    render(){
        contexto.drawImage(
            ground.source,
            ground.spriteX, ground.spriteY,
            ground.spriteWidth, ground.spriteHeight,
            ground.dx, ground.dy,
            ground.dWidth, ground.dHeight,
        );

        contexto.drawImage(
            ground.source,
            ground.spriteX, ground.spriteY,
            ground.spriteWidth, ground.spriteHeight,
            (ground.dx + ground.dWidth), ground.dy,
            ground.dWidth, ground.dHeight,
        );
    }
}



const flappyBird = {
    source: sprites,
    spriteX: 0,             //sx, sy,          (Origem/ponto inicial)
    spriteY: 0,
    spriteWidth: 33,        //sWidth, sHeight, (Tamanho do recorte na Sprite)
    spriteHeight: 24,
    dx: 10,                 //dx, dy,          (Origem de inserção da imagem no canvas)
    dy: 50,
    dWidth: 33,             
    dHeight: 24,            //dWidth, dHeight  (Tamanho da imagem no canvas)

    render(){
        contexto.drawImage(
            flappyBird.source,
            flappyBird.spriteX, flappyBird.spriteY,
            flappyBird.spriteWidth, flappyBird.spriteHeight,
            flappyBird.dx, flappyBird.dy,
            flappyBird.dWidth, flappyBird.dHeight,
        );
    },

    gravidade: 0.25,
    velocidade: 0,
    update(){
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade,
        //console.log(flappyBird.velocidade)
        flappyBird.dy = flappyBird.dy + flappyBird.velocidade;
    }
}



const messageGetReady = {
    source: sprites,
    spriteX: 134,                   //sx, sy,          (Origem/ponto inicial)
    spriteY: 0,
    spriteWidth: 174,               //sWidth, sHeight, (Tamanho do recorte na Sprite)
    spriteHeight: 152,
    dx: (canvas.width/2)-174/2,     //dx, dy,          (Origem de inserção da imagem no canvas)
    dy: 50,
    dWidth: 174,             
    dHeight: 152,                   //dWidth, dHeight  (Tamanho da imagem no canvas)

    render(){
        contexto.drawImage(
            messageGetReady.source,
            messageGetReady.spriteX, messageGetReady.spriteY,
            messageGetReady.spriteWidth, messageGetReady.spriteHeight,
            messageGetReady.dx, messageGetReady.dy,
            messageGetReady.dWidth, messageGetReady.dHeight,
        );
    },
}

//atualiza modo de tela
let activeScreen = {}

function changeScreen(newScreen){
    activeScreen = newScreen
}
//cada tela vai ter funçoes update e render
const Screens = {
    INICIO:{
        render(){
            background.render()
            ground.render()
            flappyBird.render()
            messageGetReady.render()
        },  
        update(){

        },
        click(){
            changeScreen(Screens.JOGO)  
        }
    },

    JOGO:{
        render(){
            background.render()
            ground.render()
            flappyBird.render()
        },

        update(){
            flappyBird.update()
        }
    }
}


function loop(){
    
    activeScreen.render()
    activeScreen.update()
    
    requestAnimationFrame(loop);
}

window.addEventListener('click', function(){
    if(activeScreen.click){
        activeScreen.click()
    }
})
changeScreen(Screens.INICIO)
loop()
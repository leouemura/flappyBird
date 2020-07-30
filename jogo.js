const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


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

function loop(){
    background.render()
    ground.render()
    flappyBird.render()
    
    requestAnimationFrame(loop);
}
loop()
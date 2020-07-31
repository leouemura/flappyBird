let frames = 0;

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav'

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


function createGround(){
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
        
        update(){
            const groundSpeed = 1;
            const repeatGround = ground.dWidth/2
            const groundMovement = ground.dx - groundSpeed
            /*
            console.log('[ground.dx]',ground.dx)
            console.log('[repeatGround]',repeatGround)
            console.log('[groundMovement]',groundMovement % repeatGround)
            */
            ground.dx = groundMovement % repeatGround
        },
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
    return ground
}

//colisao do flappyBird com o chao
function collide(flappyBird, ground){
    const flappyBirdY = flappyBird.dHeight + flappyBird.dy
    const groundY = ground.dy;

    if(flappyBirdY>=groundY){
        return true
    }
    return false
}

//cria um flappyBird novo
function createFlappyBird(){
    const flappyBird = {
        source: sprites,
        //spriteX: 0,             //sx, sy,          (Origem/ponto inicial)
        //spriteY: 0,
        spriteWidth: 33,        //sWidth, sHeight, (Tamanho do recorte na Sprite)
        spriteHeight: 24,
        dx: 10,                 //dx, dy,          (Origem de inserção da imagem no canvas)
        dy: 50,
        dWidth: 33,             
        dHeight: 24,            //dWidth, dHeight  (Tamanho da imagem no canvas)
        
        pulo: 4.6,
        jump(){
            console.log('devo jumpar')
            console.log("Antes",flappyBird.velocidade)
            flappyBird.velocidade = -flappyBird.pulo
            console.log("Depois",flappyBird.velocidade)
        },
        
        gravidade: 0.25,
        velocidade: 0,
        update(){
            if(collide(flappyBird, global.ground)){
                console.log("Fez colisao")
                som_HIT.play()
                setTimeout(()=>{
                    changeScreen(Screens.INICIO)
                },500)
                return
            }
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade,
            //console.log(flappyBird.velocidade)
            flappyBird.dy = flappyBird.dy + flappyBird.velocidade;
        },
        
        //alternancia entre os movimentos (bater asa)
        movimentos:[
            { spriteX: 0, spriteY: 0, },    //asa pra cima
            { spriteX: 0, spriteY: 26, },    //asa pro meio
            { spriteX: 0, spriteY: 52, },    //asa pra baixo
            { spriteX: 0, spriteY: 26, },    //asa pro meio
        ],
        frameAtual: 0,
        updateFrame(){
            const frameInterval = 10;
            const passedInterval = frames % frameInterval === 0;
            console.log("passedInterval",passedInterval)

            if(passedInterval){
                const baseIncrement = 1;
                const increment = baseIncrement + flappyBird.frameAtual;
                const baseRepeat = flappyBird.movimentos.length;
                flappyBird.frameAtual = increment % baseRepeat
            }
        },
        render(){
            flappyBird.updateFrame()
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual]
            contexto.drawImage(
                flappyBird.source,
                spriteX, spriteY,
                flappyBird.spriteWidth, flappyBird.spriteHeight,
                flappyBird.dx, flappyBird.dy,
                flappyBird.dWidth, flappyBird.dHeight,
            );
        },
    
        
    }
    return flappyBird;
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

const global = {}
let activeScreen = {}

//atualiza modo de tela
function changeScreen(newScreen){
    activeScreen = newScreen

    if(activeScreen.initialize){
        Screens.INICIO.initialize()
    }
}
//telas de inicio e jogo
const Screens = {
    INICIO:{
        initialize(){
            global.flappyBird = createFlappyBird();
            global.ground = createGround();
        },
        render(){
            background.render()
            global.ground.render()
            global.flappyBird.render()
            messageGetReady.render()
        },  
        update(){
            global.ground.update()
        },
        click(){
            changeScreen(Screens.JOGO)  
        }
    },

    JOGO:{
        render(){
            background.render()
            global.ground.render()
            global.flappyBird.render()
        },
        click(){
            global.flappyBird.jump()
        },
        update(){
            global.flappyBird.update()
        }
    }
}

//renderiza o canvas
function loop(){
    
    activeScreen.render()
    activeScreen.update()
    
    frames = frames + 1
    requestAnimationFrame(loop);
}

window.addEventListener('click', function(){
    if(activeScreen.click){
        activeScreen.click()
    }
})
changeScreen(Screens.INICIO)
loop()
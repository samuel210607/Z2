var chica, chicaI, chicaM, chicaR, chicaT, chicaN;
var zombie, zombieI, zombieT; 
var arbol, arbolI, rama, ramaI;
var flecha, flechaI; 
var fondo, fondoI, perdiste, perdisteI;
var cura, curaI;
var contador;
contador = 5; 

var state ;
var play = 1;
var end = 0; 

var sueloI;
var piedra, piedraI;
var acido, mocoI;
var cuadrosF, cuadrosA, cuadrosR;
state = play;
  puntaje = 0;

  var mocoG, piedraG;
  var b;
  var cuadrosM
function preload(){
  chicaI = loadAnimation ("chica corriendo .gif");
  chicaM = loadAnimation ("chicamuerta.jpg");
  chicaR = loadAnimation ("chicaRB.png", "chicaRB2.png", "chicaRB3.png")
  chicaT = loadAnimation ("chicaTB.png");
  chicaN = loadAnimation ("chicaSB.png");
  zombieI = loadAnimation ("Z1.png", "Z2.png");
  zombieT = loadAnimation ("Z3 (1).png");
  fondoI = loadImage ("fondo2.jpg");
  perdisteI = loadAnimation ("perdiste.gif");
piedraI = loadImage ("piedra.png");
curaI = loadImage ("cura.png");
mocoI = loadImage ("moco.PNG")


} 
function setup() {
  createCanvas (935, 400);
  fondo = createSprite (467, 200);
  fondo.addImage (fondoI);
  fondo.scale = 2.2;

  perdiste = createSprite ( 467, 200);

  chica = createSprite (width-800, height-40);
  chica.addAnimation ("normal", chicaN);
  chica.addAnimation ("corriendo", chicaI);
  chica.addAnimation ("muerta", chicaM);
  chica.addAnimation ("reversa", chicaR);
  chica.addAnimation ("tirando", chicaT);

  chica.scale = 0.5;

  zombie = createSprite (850, 310)
  zombie.addAnimation ("corriendo", zombieI);
  zombie.scale = 0.3;
 zombie.setCollider ("rectangle", 0,90, 300,400);


  sueloI = createSprite (467, 400, 935, 5);
  sueloI.visible = false; 

  cura = createSprite (900, 360);
  cura.addImage (curaI);
  cura.scale =0.05;


  mocoG = createGroup ();
  piedraG = createGroup ();



}
function draw() {
    background (0);
  
    b = createEdgeSprites ();
 chica.bounce(b);

    if (state === play)
    {
        perdiste.visible = false;
  
      if (keyDown ("RIGHT_ARROW")){
      chica.changeAnimation ("corriendo", chicaI);
    chica.x = chica.x + 3;  
    chica.scale = 0.85;

    }
    else  {
      chica.changeAnimation ("normal", chicaN);
      chica.scale = 0.6;
    }

    if(keyDown ("LEFT_ARROW")){
      chica.changeAnimation ("reversa", chicaR);
      chica.x = chica.x - 3;  
      chica.scale = 0.6;
      }


    
        
    if (keyDown("space") && chica.y >= 330)
      {

   chica.velocityY = -12;
      
       }
    chica.velocityY = chica.velocityY + 0.8;
    // chica.collide (sueloI);
      
    if (keyIsDown(UP_ARROW) && frameCount % 10 === 0){
      chica.changeAnimation ("tirando", chicaT);
      chica.scale = 0.85;
        rock ();   
     }

if (zombie.x <= 700){
zombie.velocityX = 2;
} 
if (zombie.x >= 850) {
  zombie.velocityX = -2;

}
sustancia ();

      if (mocoG.isTouching (chica))
      {
      state = end;
    }
      if (zombie.isTouching (chica)){
        state = end;

      }
    }

    if (state === end){
      
      perdiste.addAnimation ("perdi", perdisteI);
      perdiste.scale = 1.3;
      perdiste.visible = true;

       fondo.visible = false;

     perdiste.depth = chica.depth;
       chica.depth = chica.depth+1;
       perdiste.depth = zombie.depth;
       zombie.depth = zombie.depth + 1;

       chica.changeAnimation ("muerta", chicaM);
       zombie.changeAnimation ("corriendo", zombieI);

    }
  if (mousePressedOver (perdiste)){
reset();
  }
       chica.collide (sueloI);
   drawSprites ();


}

 

function reset (){
state = play;
  perdiste.visible = false;
  fondo.visible = true;
  chica.changeAnimation ("corriendo", chicaI);
  zombie.changeAnimation ("corriendo", zombieI);
}

function sustancia()
{
  cuadrosM = Math.round(random(0, 1000));
      if (frameCount % cuadrosM === 0 )
      {
        zombie.addAnimation ("tirando", zombieT);
        zombie.changeAnimation ("tirando", zombieT);
        console.log ("zombie");
        acido = createSprite (zombie.x, zombie.y-40);
        acido.addImage (mocoI);
        acido.velocityX = -8;
        acido.scale = 0.05

        mocoG.add(acido);

      }

}

function rock ()
{
  if (frameCount % 10 === 0)
  {
    if (contador  )
    contador = contador - 1;
      piedra = createSprite (chica.x, chica.y-30)
      piedra.addImage (piedraI);
      piedra.velocityX = 5;
      piedra.scale = 0.3;
      piedraG.add (piedra);
  }
}
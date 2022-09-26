let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [homeScene, loadingScene, gameScene, gameScene2],
    title: 'World End Starts',
    backgroundColor: 'ffffff'
};

let game = new Phaser.Game(config);
//las variables que estan en gameScene
var player;
var monster;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var sparkles;
var musica;
var musicaoff;
var go;
var x;
var monsters;
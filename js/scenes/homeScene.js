class homeScene extends Phaser.Scene {
    constructor (){
        super('homeScene');
    }
    
    preload () {
//precarga de los archivos que aparecen en la pantalla del titulo
        this.load.image('fondo', 'images/fondo.png');
		this.load.image('logo', 'images/logo.png');
        this.load.image('rain', 'images/rain.png');
         
    }
    
    create (){
//fondo interactivo
        var bg = this.add.image(0, 0, 'fondo').setInteractive();
		bg.setOrigin(0, 0);
//logo
		this.add.image(400, 300, 'logo');

        var particles = this.add.particles('rain');
        
            var emitter = particles.createEmitter({
                x: 375,
                y: -100,
                speed: -500,
                velocityY: -1000, 
                lifespan: 10000,
                scale: { start: 1, end: 0 },
                alpha: { start: 1, end: 0},
                scale: 0.5,
                gravityY: 1100,
                frequency: 50,
                angle: { min: 180, max:-180 }
                
            });
//accion click 		 
		bg.on('pointerdown', function(){
			this.scene.start('loadingScene');
		}, this);
        
    }

}

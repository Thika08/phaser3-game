class loadingScene extends Phaser.Scene {
    constructor (){
        super('loadingScene');
    }
    
    preload () {
//creacion graficos para el loading
        var progressBar = this.add.graphics();
		var progressBox = this.add.graphics();
		 
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(240, 270, 320, 50);
		 
		var width = this.cameras.main.width;
		var height = this.cameras.main.height;
		var loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 50,
			text: 'Loading...',
			style: {
				font: '20px monospace',
				fill: '#ffffff'
			}
		});
		 
		loadingText.setOrigin(0.5, 0.5);
		 
		var percentText = this.make.text({
			x: width / 2,
			y: height / 2 - 5,
			text: '0%',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		 
		percentText.setOrigin(0.5, 0.5);
		 
		var assetText = this.make.text({
			x: width / 2,
			y: height / 2 + 50,
			text: '',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		 
		assetText.setOrigin(0.5, 0.5);
		 
		this.load.on('progress', function (value) {
			percentText.setText(parseInt(value * 100) + '%');
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(250, 280, 300 * value, 30);	
		});
		 
		this.load.on('fileprogress', function (file) {
			assetText.setText('Loading asset: ' + file.src);
		});
//una vez cargados los archivos se elimina lo creado para el loading
		this.load.on('complete', function () {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
			assetText.destroy();
		});

		//se precargan los archivos
	    this.load.audio('audio', 'audio/audio.mp3');
		this.load.audio('jump', 'audio/jump.mp3');
	    this.load.image('fondo', 'images/fondo.png');
	    this.load.image('ground', 'assets/platform.png');
	    this.load.image('sparkles', 'Sprites/sparkles.png');
	    this.load.image('monster', 'Sprites/shoot.png');
	    this.load.spritesheet('spritesheet', 'Sprites/spritesheet.png', { frameWidth: 32, frameHeight: 32 });
         
    }
    
    create (){

        this.scene.start('gameScene');
        
    }

}
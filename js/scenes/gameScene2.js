class gameScene2 extends Phaser.Scene {
    constructor (){
        super('gameScene2');
    }
    
    
    create (){

        //musica
        let audio = this.sound.add('audio', {loop: true});

        this.input.keyboard.on('keydown_A', () => {
            audio.play();
        })
        this.input.keyboard.on('keydown_M', () => {
            audio.stop();
        })

        this.jump = this.sound.add('jump');
        
      
        
        //el fondo
        this.add.image(400, 300, 'fondo');
        //añadir plataformas
        platforms = this.physics.add.staticGroup();

        platforms.create(400, 565, 'ground').setScale(2).refreshBody();

        platforms.create(530, 400, 'ground');
        platforms.create(150, 310, 'ground');
        platforms.create(750, 220, 'ground');
        platforms.create(150, 170, 'ground');

        //creamos al jugador
        player = this.physics.add.sprite(100, 450, 'spritesheet').setScale(1.75);
        player.setBounce(0.1);

        player.setCollideWorldBounds(true);
       
        //animaciones del sprite
        //anima izq
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('spritesheet',
            { start: 3, end: 5}),
            frameRate: 10,
            repeat: -1
        });
        //anima quieta
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'spritesheet', frame: 0 } ],
            frameRate: 10
        });
        //anima derecha
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('spritesheet',
            { start: 0, end: 2}),
            frameRate: 10,
            repeat: -1
        });

        //anima salto
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('spritesheet',
            { start: 8, end: 8}),
            frameRate: 10,
            repeat: 1
        });
        //anima disparo
        this.anims.create({
            key: 'shoot',
            frames: this.anims.generateFrameNumbers('spritesheet',
            { start: 13, end: 13}),
            frameRate: 10,
            repeat: 1
        });
        //activa el control del teclado
        cursors = this.input.keyboard.createCursorKeys();

       this.physics.add.collider(player, platforms);
       

        //sparkles
        sparkles = this.physics.add.group({
            key: 'sparkles',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        sparkles.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));

        });
       
        //monstruo
        monster = this.physics.add.group()

        //texto score
        scoreText = this.add.text(16, 16, 'SCORE: 120', { fontSize: '32px', fill: '#FF2400' });
        //texto musica
        musica = this.add.text (16, 40, 'music on press A', {fontSize: '16px', fill: '#FFFFFF' });
        musicaoff = this.add.text (16, 56, 'music off press M', {fontSize: '16px', fill: '#FFFFFF' });
        //collider sparkles
        this.physics.add.collider(sparkles, platforms);
        //collider monster
        this.physics.add.collider(monster, platforms);

        //overlap player y sparkles
        this.physics.add.overlap(player, sparkles, this.collectSparkles, null, this);
        //collider player y monstruo
        this.physics.add.collider(player, monster, this.hitMonster, null, this);

        
    }

    update()
    {
        if (gameOver)
        {
            return;
        }
//configuracion del teclado
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
            this.jump.play()
        }
    }
//recoger los sparkles
    collectSparkles (player, sparkle)
    {
        sparkle.disableBody(true, true);

        score += 10;
        scoreText.setText('SCORE: ' + score);

        if (sparkles.countActive(true) === 0)
        {
            sparkles.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
//en la segunda ronda aparece enemigo            
            x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            monsters = monster.create(x, 16, 'monster');
            monsters.setBounce(1);
            monsters.setCollideWorldBounds(true);
            monsters.setVelocity(Phaser.Math.Between(-200, 200), 20);
    
        }
    }
//monstruo/enemigo golpea al jugador    
    hitMonster (player, monster)
    {
        this.physics.pause();
        player.setTint('0xff0000');
        player.anims.play('turn');
        gameOver = true;
        go = this.add.text(282, 280, 'GAME OVER', { fontSize: '50px', fill: '#FF2400' });
    }
    
}
class Game extends Phaser.Scene {
    constructor() {
        super("game");
        this.my = {sprite: {}, text: {}};

        this.charX = game.config.width/2;
        this.charY = 60;

        this.projCooldown = 25;
        this.projCooldownCount = 0;

        this.enemySpeed = 1;
        this.lives = 3;
        this.score = 0;
    }

    preload() {
        this.load.setPath("./assets/");

        this.load.image("Pigeon1", "Pigeon1.png");
        this.load.image("Pigeon2", "Pigeon2.png");
        this.load.image("Pigeon3", "Pigeon3.png");
        this.load.image("proj", "mail.png");
        this.load.image("bullet", "bullet.png")

        this.load.image("BigBlue", "ship_0000.png");
        this.load.image("BigOrange", "ship_0001.png");
        this.load.image("BigGreen", "ship_0002.png");
        this.load.image("BigYellow", "ship_0003.png");
        this.load.image("SmallBlue", "ship_0004.png");
        this.load.image("SmallOrange", "ship_0005.png");
        this.load.image("SmallGreen", "ship_0006.png");
        this.load.image("SmallYellow", "ship_0007.png");

        this.load.image("FullHeart", "FullHeart.png");
        this.load.image("EmptyHeart", "EmptyHeart.png");

        this.load.audio("windshield1", "impactPunch_heavy_001.ogg");
        this.load.audio("windshield2", "impactPunch_heavy_002.ogg");
        this.load.audio("windshield3", "impactPunch_heavy_003.ogg");
        this.load.audio("mail", "Mail.ogg");
        this.load.audio("laser0", "laserSmall_000.ogg");
        this.load.audio("laser1", "laserSmall_001.ogg");
        this.load.audio("laser2", "laserSmall_002.ogg");
        this.load.audio("laser3", "laserSmall_003.ogg");
        this.load.audio("laser4", "laserSmall_004.ogg");
        this.load.audio("hurt", "explosionCrunch_000.ogg");
    }

    create() {
        this.enemySpeed += 0.5;

        this.projectiles = this.add.group();
        this.enemies = this.add.group();
        this.enemies2 = this.add.group();
        this.enemyBullets = this.add.group();

        this.my.sprite.char = this.add.sprite(this.charX, this.charY).play("idle");
        this.my.sprite.char.setScale(0.1);

        this.my.sprite.ship0 = this.enemies.create(game.config.width/2, game.config.height + 50, "BigBlue");
        this.my.sprite.ship0.setScale(3);

        this.my.sprite.ship1 = this.enemies.create(game.config.width/3, game.config.height + 150, "BigYellow");
        this.my.sprite.ship1.setScale(3);

        this.my.sprite.ship2 = this.enemies.create(2*game.config.width/3, game.config.height + 150, "BigYellow");
        this.my.sprite.ship2.setScale(3);
        
        this.my.sprite.ship3 = this.enemies.create(game.config.width/4, game.config.height + 250, "BigOrange");
        this.my.sprite.ship3.setScale(3);

        this.my.sprite.ship4 = this.enemies.create(3*game.config.width/4, game.config.height + 250, "BigOrange");
        this.my.sprite.ship4.setScale(3);

        this.my.sprite.ship5 = this.enemies2.create(game.config.width/4, game.config.height + 350, "SmallBlue");
        this.my.sprite.ship5.setScale(3);

        this.my.sprite.ship5 = this.enemies2.create(game.config.width/2, game.config.height + 350, "SmallOrange");
        this.my.sprite.ship5.setScale(3);

        this.my.sprite.ship5 = this.enemies2.create(3*game.config.width/4, game.config.height + 350, "SmallBlue");
        this.my.sprite.ship5.setScale(3);

        if(this.lives == 3){
            this.my.sprite.Heart1 = this.add.sprite(game.config.width - 30, game.config.height - 30, "FullHeart");
            this.my.sprite.Heart1.setScale(3);

            this.my.sprite.Heart2 = this.add.sprite(game.config.width - 30, game.config.height - 80, "FullHeart");
            this.my.sprite.Heart2.setScale(3);

            this.my.sprite.Heart3 = this.add.sprite(game.config.width - 30, game.config.height - 130, "FullHeart");
            this.my.sprite.Heart3.setScale(3);
        }
        else if(this.lives == 2){
            this.my.sprite.Heart1 = this.add.sprite(game.config.width - 30, game.config.height - 30, "FullHeart");
            this.my.sprite.Heart1.setScale(3);

            this.my.sprite.Heart2 = this.add.sprite(game.config.width - 30, game.config.height - 80, "FullHeart");
            this.my.sprite.Heart2.setScale(3);

            this.my.sprite.Heart3 = this.add.sprite(game.config.width - 30, game.config.height - 130, "EmptyHeart");
            this.my.sprite.Heart3.setScale(3);
        }
        else{
            this.my.sprite.Heart1 = this.add.sprite(game.config.width - 30, game.config.height - 30, "FullHeart");
            this.my.sprite.Heart1.setScale(3);

            this.my.sprite.Heart2 = this.add.sprite(game.config.width - 30, game.config.height - 80, "EmptyHeart");
            this.my.sprite.Heart2.setScale(3);

            this.my.sprite.Heart3 = this.add.sprite(game.config.width - 30, game.config.height - 130, "EmptyHeart");
            this.my.sprite.Heart3.setScale(3);
        }

        this.my.text.score = this.add.bitmapText(45, game.config.height - 30, "Blocks", this.score, ).setOrigin(0.5);

        this.idleMove = this.tweens.add({
            targets: this.my.sprite.char,
            y: {from: this.charY + 20, to: this.charY - 20, duration: 800},
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        for(let enemy of this.enemies.getChildren()){
            this.enemyMove = this.tweens.add({
                targets: enemy,
                x: {from: enemy.x + 50, to: enemy.x - 50, duration: 2000},
                scale: 2,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1
            });
        }

        for(let enemy of this.enemies2.getChildren()){
            this.enemy2Move = this.tweens.add({
                targets: enemy,
                x: {from: enemy.x, to: game.config.width/2, duration: 1000},
                scale: 2,
                ease: 'Expo.easeIn',
                yoyo: true,
                repeat: -1
            });
        }

        for(let enemy of this.enemies.getChildren()){
            this.enemyShoot = this.time.addEvent({
                delay: Math.random() * (6000 - 3000) + 3000,
                callback: this.enemyFire,
                callbackScope: this,
                args: [enemy],
                loop: true
            });
        }

        for(let enemy of this.enemies2.getChildren()){
            this.enemy2Shoot = this.time.addEvent({
                delay: Math.random() * (6000 - 3000) + 3000,
                callback: this.enemyFire,
                callbackScope: this,
                args: [enemy],
                loop: true
            });
        }

        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        this.projCooldownCount--;

        if(this.spaceKey.isDown){
            if(this.projCooldownCount <= 0){
                this.my.sprite.proj = this.projectiles.create(this.my.sprite.char.x, this.my.sprite.char.y + 25, "proj");
                this.my.sprite.proj.setScale(0.08);
                this.projCooldownCount = this.projCooldown;
                this.sound.play("mail", {
                    volume: 0.5
                });
            }
        }

        if(this.aKey.isDown){
            if(this.my.sprite.char.anims.currentAnim.key != "flap") this.my.sprite.char.play("flap");
            this.my.sprite.char.flipX = false;
            this.my.sprite.char.x -= 7;
            if(this.my.sprite.char.x <= 60) this.my.sprite.char.x = 60;
        }
        if(this.dKey.isDown){
            if(this.my.sprite.char.anims.currentAnim.key != "flap") this.my.sprite.char.play("flap");
            this.my.sprite.char.flipX = true;
            this.my.sprite.char.x += 7;
            if(this.my.sprite.char.x >= game.config.width - 70) this.my.sprite.char.x = game.config.width - 70;
        }
        if(!this.aKey.isDown && !this.dKey.isDown && this.my.sprite.char.anims.currentAnim.key != "idle"){
            this.my.sprite.char.play("idle");
        }

        for(let enemy of this.enemies.getChildren()){
            enemy.y -= this.enemySpeed;
            if(enemy.y < -50){
                this.sound.play("hurt", {
                    volume: 0.3
                });
                this.lives--;
                enemy.destroy();
            }
        }

        for(let enemy of this.enemies2.getChildren()){
            enemy.y -= this.enemySpeed;
            if(enemy.y < -50){
                this.sound.play("hurt", {
                    volume: 0.3
                });
                this.lives--;
                enemy.destroy();
            }
        }

        for(let bullet of this.enemyBullets.getChildren()){
            bullet.y -= this.enemySpeed + 5;
            if(bullet.y < -50){
                bullet.destroy();
            }
        }

        for(let projectile of this.projectiles.getChildren()){
            projectile.y += 10;
            if(projectile.y > game.config.height) projectile.destroy();

            for(let enemy of this.enemies.getChildren()){
                if(this.collides(projectile, enemy) && enemy.y <= game.config.height + 30){
                    this.score++;
                    this.my.text.score.setText(this.score);
                    projectile.destroy();
                    enemy.destroy();
                    this.sound.play(Phaser.Math.RND.pick(["windshield1", "windshield2", "windshield3"]), {
                        volume: 0.3
                    });
                }
            }

            for(let enemy of this.enemies2.getChildren()){
                if(this.collides(projectile, enemy) && enemy.y <= game.config.height + 30){
                    this.score++;
                    this.my.text.score.setText(this.score);
                    projectile.destroy();
                    enemy.destroy();
                    this.sound.play(Phaser.Math.RND.pick(["windshield1", "windshield2", "windshield3"]), {
                        volume: 0.3
                    });
                }
            }
        }

        for(let bullet of this.enemyBullets.getChildren()){
            if(this.collides(bullet, this.my.sprite.char)){
                bullet.destroy();
                this.sound.play("hurt", {
                    volume: 0.3
                });
                this.lives--;
            }
        }

        for(let enemy of this.enemies.getChildren()){
            if(this.collides(enemy, this.my.sprite.char)){
                enemy.destroy();
                this.sound.play("hurt", {
                    volume: 0.3
                });
                this.lives--;
            }
        }

        for(let enemy of this.enemies2.getChildren()){
            if(this.collides(enemy, this.my.sprite.char)){
                enemy.destroy();
                this.sound.play("hurt", {
                    volume: 0.3
                });
                this.lives--;
            }
        }

        if(this.lives == 3);
        else if(this.lives == 2){
            this.my.sprite.Heart3.destroy();
            this.my.sprite.Heart3 = this.add.sprite(game.config.width - 30, game.config.height - 130, "EmptyHeart");
            this.my.sprite.Heart3.setScale(3);
        }
        else if(this.lives == 1){
            this.my.sprite.Heart2.destroy();
            this.my.sprite.Heart2 = this.add.sprite(game.config.width - 30, game.config.height - 80, "EmptyHeart");
            this.my.sprite.Heart2.setScale(3);
        }
        else{
            this.finalScore = this.score;
            this.lives = 3;
            this.score = 0;
            this.projCooldownCount = 0;
            this.enemySpeed = 1.5
            this.scene.start("gameOver", {score: this.finalScore});
        }

        if(this.enemies.children.size + this.enemies2.children.size == 0){
            for(let bullet of this.enemyBullets.getChildren()){
                bullet.destroy();
            }
            this.my.text.score = this.add.bitmapText(game.config.width/2, game.config.height/2, "Blocks", "Next Wave Incoming", 48).setOrigin(0.5);
            
            this.nextWave = this.time.delayedCall(3000, this.resetScene, [], this);
        }
    }

    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

    resetScene(){
        this.scene.restart();
    }

    enemyFire(ship){
        for(let enemy of this.enemies.getChildren()){
            if(ship == enemy && ship.y <= game.config.height){
                this.my.sprite.bullet = this.enemyBullets.create(ship.x, ship.y - 40, "bullet");
                this.my.sprite.bullet.setScale(2);

                this.sound.play(Phaser.Math.RND.pick(["laser0", "laser1", "laser2", "laser3", "laser4"]), {
                    volume: 0.3
                });
            }
        }

        for(let enemy of this.enemies2.getChildren()){
            if(ship == enemy && ship.y <= game.config.height){
                this.my.sprite.bullet = this.enemyBullets.create(ship.x, ship.y - 40, "bullet");
                this.my.sprite.bullet.setScale(2);

                this.sound.play(Phaser.Math.RND.pick(["laser0", "laser1", "laser2", "laser3", "laser4"]), {
                    volume: 0.3
                });
            }
        }
    }
}
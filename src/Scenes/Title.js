class Title extends Phaser.Scene{
    constructor(){
        super("title");
        this.my = {sprite: {}, text: {}};
    }

    preload(){
        this.load.setPath("./assets/");

        this.load.image("Pigeon1", "Pigeon1.png");
        this.load.image("Pigeon2", "Pigeon2.png");
        this.load.image("Pigeon3", "Pigeon3.png");

        this.load.bitmapFont("Blocks", "KenneyBlocks_0.png", "KenneyBlocks.fnt");
    }

    create(){
        if (!this.anims.exists("idle")){
            this.anims.create({
                key: "idle",
                frames: [
                    {key: "Pigeon2"},
                    {key: "Pigeon1"},
                    {key: "Pigeon3"}, 
                    {key: "Pigeon1"}
                ],
                frameRate: 7,
                repeat: -1
            });
        }

        if(!this.anims.exists("flap")){
            this.anims.create({
                key: "flap",
                frames: [
                    {key: "Pigeon2"},
                    {key: "Pigeon3"},
                ],
                frameRate: 15,
                repeat: -1
            });
        }

        this.my.sprite.char = this.add.sprite(game.config.width/2, game.config.height/2).play("idle");
        this.my.sprite.char.setScale(0.2);

        this.idleMove = this.tweens.add({
            targets: this.my.sprite.char,
            y: {from: this.my.sprite.char.y + 20, to: this.my.sprite.char.y - 20, duration: 800},
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        this.my.text.titleText = this.add.bitmapText(game.config.width/2, game.config.height/2 - 150, "Blocks", "Defender Pigeon").setOrigin(0.5);
        this.my.text.instructText = this.add.bitmapText(game.config.width/2, game.config.height/2 + 150, "Blocks", "Press enter to play!", 32).setOrigin(0.5);

        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)){
            this.scene.start("instructions");
        }
    }
}
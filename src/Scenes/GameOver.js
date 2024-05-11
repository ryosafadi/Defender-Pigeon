class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOver");
        this.my = {sprite: {}, text: {}};
    }

    init(data){
        this.finalScore = data.score;
    }

    preload(){
        this.load.setPath("./assets/");
    }

    create(){
        this.my.text.titleText = this.add.bitmapText(game.config.width/2, game.config.height/2 - 50, "Blocks", "Game Over!").setOrigin(0.5);
        this.my.text.finalScore = this.add.bitmapText(game.config.width/2, game.config.height/2 + 50, "Blocks", "Final Score: " + this.finalScore, 48).setOrigin(0.5);

        this.my.text.titleText = this.add.bitmapText(game.config.width/2, game.config.height/2 + 150, "Blocks", "Press enter to play again", 32).setOrigin(0.5);
        this.my.text.titleText = this.add.bitmapText(game.config.width/2, game.config.height/2 + 200, "Blocks", "Press escape to see credits", 32).setOrigin(0.5);

        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.escKey)){
            this.scene.start("credits");
        }

        if (Phaser.Input.Keyboard.JustDown(this.enterKey)){
            this.scene.start("title");
        }
    }
}
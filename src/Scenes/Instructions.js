class Instructions extends Phaser.Scene{
    constructor(){
        super("instructions");
        this.my = {text: {}};
    }

    preload(){
        this.load.setPath("./assets/");
    }

    create(){
        this.my.text.instructHeader = this.add.bitmapText(game.config.width/2, game.config.width/2 - 80, "Blocks", "Instructions").setOrigin(0.5);

        let style = { 
            fontSize: 24,
            color: 'Black',
            fontFamily: 'Arial',
            align: "left",
            wordWrap: { width: game.config.width - 50, useAdvancedWrap: true }
        };

        this.my.text.instructText = this.add.text(30, game.config.height/2 - 60, "You are a carrier pigeon who has been tasked with defending your master's base in an emergency situation. Use your envelopes to hit the enemy planes' windshields and blind them! Avoid the enemy planes and their bullets, and don't let them get past you! Use A and D to move left and right and SPACE to drop some mail.", style);
        
        this.my.text.playText = this.add.bitmapText(game.config.width/2, game.config.height/2 + 150, "Blocks", "Press enter to begin!", 32).setOrigin(0.5);
        
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)){
            this.scene.start("game");
        }
    }
}
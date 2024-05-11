class Credits extends Phaser.Scene{
    constructor(){
        super("credits");
        this.my = {text: {}};
    }

    preload(){
        this.load.setPath("./assets/");
    }

    create(){
        this.my.text.titleText = this.add.bitmapText(game.config.width/2, game.config.height/2 - 120, "Blocks", "Credits", 64).setOrigin(0.5);

        this.my.text.titleText = this.add.bitmapText(game.config.width/2, game.config.height/2 - 50, "Blocks", "Kenney Assets", 32).setOrigin(0.5);
        this.my.text.titleText = this.add.bitmapText(game.config.width/2, game.config.height/2, "Blocks", "https://pop-shop-packs.itch.io/", 32).setOrigin(0.5);
        this.my.text.titleText = this.add.bitmapText(game.config.width/2, game.config.height/2 + 50, "Blocks", "https://ryangamin-dev.itch.io/", 32).setOrigin(0.5);
    }

    update(){
        
    }
}
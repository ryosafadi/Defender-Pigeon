"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 650,
    height: 720,
    backgroundColor: "#bae6ff",
    scene: [Title, Instructions, Game, GameOver, Credits],
    fps: { forceSetTimeOut: true, target: 30 }
}

const game = new Phaser.Game(config);
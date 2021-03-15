import "phaser";
import Loading from "./scenes/loading";

export default class Main extends Phaser.Scene {
  g: Phaser.GameObjects.Graphics;
  icon: Phaser.GameObjects.Sprite;
  warn: Phaser.GameObjects.Sprite;

  constructor() {
    super("main");
  }

  preload() {
    console.log("preload");
    // this.load.image("logo", "assets/phaser3-logo.png");
    // this.load.image("libs", "assets/libs.png");
    // this.load.glsl("bundle", "assets/plasma-bundle.glsl.js");
    // this.load.glsl("stars", "assets/starfields.glsl.js");
  }

  create() {
    this.g = this.add.graphics();

    this.icon = this.add.sprite(200, 200, "database");
    this.icon.setInteractive();
    this.input.setDraggable(this.icon);

    this.warn = this.add.sprite(200, 200, "server_web");
    this.warn.setInteractive();
    this.input.setDraggable(this.warn);

    this.input.on("drag", (pointer, gob, dragX, dragY) => {
      gob.x = dragX;
      gob.y = dragY;
    });

    // this.input.on("drag", (pointer, gob, dragX, dragY) => {
    //   gob.x = dragX;
    //   gob.y = dragY;
    // });

    // this.tweens.add({
    //   targets: database,
    //   y: 350,
    //   duration: 1500,
    //   ease: "Sine.inOut",
    //   yoyo: true,
    //   repeat: -1,
    // });
  }

  update() {
    this.g.clear();
    this.g.lineStyle(12, 0xffffff, 1);
    this.g.lineBetween(this.icon.x, this.icon.y, this.warn.x, this.warn.y);
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#125555",
  width: 800,
  height: 600,
  scene: [Loading, Main],
};

const game = new Phaser.Game(config);

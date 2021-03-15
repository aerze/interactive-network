import "phaser";
import Loading from "./scenes/loading";

export default class Main extends Phaser.Scene {
  g: Phaser.GameObjects.Graphics;
  icon: Phaser.GameObjects.Sprite;
  warn: Phaser.GameObjects.Sprite;
  line: Phaser.Curves.Line;
  path: Phaser.Curves.Path;
  follower: any;

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
    this.follower = { t: 0, vec: new Phaser.Math.Vector2() };

    this.path = this.add.path(0, 0);
    this.line = new Phaser.Curves.Line([100, 100, 500, 200]);
    this.path.add(this.line);

    // user_blue

    this.tweens.add({
      targets: this.follower,
      t: 1,
      ease: "Linear",
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });

    this.icon = this.add.sprite(200, 200, "database");
    this.icon.setInteractive();
    this.input.setDraggable(this.icon);

    this.warn = this.add.sprite(500, 200, "server_web");
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
    this.line.p0.set(this.icon.x, this.icon.y);
    this.line.p1.set(this.warn.x, this.warn.y);

    this.g.clear();
    this.g.lineStyle(12, 0xffffff, 1);

    this.path.draw(this.g);

    this.path.getPoint(this.follower.t, this.follower.vec);

    this.g.fillStyle(0xff0000, 1);
    this.g.fillRect(this.follower.vec.x - 10, this.follower.vec.y - 10, 20, 20);
    // this.g.lineBetween(this.icon.x, this.icon.y, this.warn.x, this.warn.y);
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

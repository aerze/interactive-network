import "phaser";
import Loading from "./scenes/loading";
import { Icon } from "./game-objects/Icon";

export default class Main extends Phaser.Scene {
  g: Phaser.GameObjects.Graphics;
  icon1: Icon;
  icon2: Icon;

  icons: Icon[] = [];
  lines: { p0: Icon; p1: Icon; line: Phaser.Curves.Line }[] = [];
  tween: Phaser.Tweens.Tween;

  line: Phaser.Curves.Line;
  path: Phaser.Curves.Path;
  follower: any;

  constructor() {
    super("main");
  }

  create() {
    this.g = this.add.graphics();
    this.follower = { t: 0, vec: new Phaser.Math.Vector2() };

    this.path = this.add.path(0, 0);
    // this.line = new Phaser.Curves.Line([100, 100, 500, 200]);
    // this.path.add(this.line);

    this.tween = this.tweens.add({
      targets: this.follower,
      t: 1,
      ease: "Linear",
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });

    this.icon1 = new Icon({ type: "server_web" }, this, 200, 200);
    this.add.existing(this.icon1);
    this.icons.push(this.icon1);

    this.input.on(Phaser.Input.Events.DRAG, (pointer, gob, dragX, dragY) => {
      gob.x = dragX;
      gob.y = dragY;
    });

    this.input.on(Phaser.Input.Events.POINTER_DOWN, (pointer) => {
      if (this.input.getDragState(pointer) > 0) return;
      const icon = new Icon({ type: "vpn" }, this, pointer.x, pointer.y);
      const lastIcon = this.icons[this.icons.length - 1];

      this.add.existing(icon);
      this.icons.push(icon);
      const line = new Phaser.Curves.Line([lastIcon.x, lastIcon.y, icon.x, icon.y]);
      this.path.add(line);

      this.lines.push({
        p0: lastIcon,
        p1: icon,
        line: line,
      });

      this.tween.duration = this.lines.length * 800;
    });
  }

  update() {
    if (!this.lines.length) return;

    this.lines.forEach(({ p0, p1, line }) => {
      line.p0.set(p0.x, p0.y);
      line.p1.set(p1.x, p1.y);
    });

    this.g.clear();
    this.g.lineStyle(12, 0xffffff, 1);

    this.path.draw(this.g);

    this.path.getPoint(this.follower.t, this.follower.vec);

    this.g.fillStyle(0xff0000, 1);
    this.g.fillRect(this.follower.vec.x - 12, this.follower.vec.y - 12, 24, 24);
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

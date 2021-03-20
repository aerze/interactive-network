import "phaser";
import Loading from "./scenes/loading";
import { Device } from "./game-objects/Device";
import { DeviceManager } from "./device-manager";
import { ModeManager } from "./mode-manager";

export enum ToolModes {
  PLAY,
  EDIT_DEVICES,
  EDIT_PATHS,
}

export class Main extends Phaser.Scene {
  deviceManager: DeviceManager;
  modeManager: ModeManager;

  // g: Phaser.GameObjects.Graphics;
  // mode: ToolModes = ToolModes.EDIT_DEVICES;
  // label: Phaser.GameObjects.Text;

  // icons: Device[] = [];
  // lines: { p0: Device; p1: Device; line: Phaser.Curves.Line }[] = [];
  // tween: Phaser.Tweens.Tween;

  // line: Phaser.Curves.Line;
  // path: Phaser.Curves.Path;
  // follower: any;

  constructor() {
    super("main");
    this.deviceManager = new DeviceManager(this);
    this.modeManager = new ModeManager(this, this.deviceManager);
  }

  create() {
    this.deviceManager.create();
    this.modeManager.create();
    // this.g = this.add.graphics();
    // this.path = this.add.path(0, 0);
    // this.follower = { t: 0, vec: new Phaser.Math.Vector2() };

    // this.tween = this.tweens.add({
    //   targets: this.follower,
    //   t: 1,
    //   ease: "Linear",
    //   duration: 1000,
    //   yoyo: true,
    //   repeat: -1,
    // });

    // const icon = this.deviceManager.addDevice({ type: "user_green_architect", x: 200, y: 200 });
    // this.icons.push(icon);

    // this.input.on(Phaser.Input.Events.DRAG, (pointer, gob, dragX, dragY) => {
    //   gob.x = dragX;
    //   gob.y = dragY;
    //   console.log(gob);
    // });

    // this.input.on(Phaser.Input.Events.POINTER_DOWN, (pointer) => {
    //   if (this.input.getDragState(pointer) > 0) return;
    //   const { x, y } = pointer;
    //   const icon = this.deviceManager.addDevice({ type: "vpn", x, y });
    // const lastIcon = this.icons[this.icons.length - 1];

    // this.icons.push(icon);
    // const line = new Phaser.Curves.Line([lastIcon.x, lastIcon.y, icon.x, icon.y]);
    // this.path.add(line);

    // this.lines.push({
    //   p0: lastIcon,
    //   p1: icon,
    //   line: line,
    // });

    // this.tween.duration = this.lines.length * 800;
    // });
  }

  update() {
    this.deviceManager.update();
    this.modeManager.update();

    // this.label.setText(ToolModes[this.mode]);

    // if (!this.lines.length) return;

    // this.lines.forEach(({ p0, p1, line }) => {
    //   line.p0.set(p0.x, p0.y);
    //   line.p1.set(p1.x, p1.y);
    // });

    // this.g.clear();
    // this.g.lineStyle(6, 0x000000, 1);

    // this.path.draw(this.g);
    // this.path.getPoint(this.follower.t, this.follower.vec);

    // this.g.fillStyle(0x00ff00, 1);
    // this.g.fillRect(this.follower.vec.x - 12, this.follower.vec.y - 12, 24, 24);
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

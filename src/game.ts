import "phaser";
import Loading from "./scenes/loading";
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
  // follower: any;

  constructor() {
    super("main");
    this.deviceManager = new DeviceManager(this);
    this.modeManager = new ModeManager(this, this.deviceManager);
  }

  create() {
    this.game.canvas.oncontextmenu = (e) => (e.preventDefault(), false);
    this.deviceManager.create();
    this.modeManager.create();

    // this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
    // this.tween = this.tweens.add({
    //   targets: this.follower,
    //   t: 1,
    //   ease: "Linear",
    //   duration: 1000,
    //   yoyo: true,
    //   repeat: -1,
    // });
  }

  update() {
    this.deviceManager.update();
    this.modeManager.update();

    // this.path.getPoint(this.follower.t, this.follower.vec);
    // this.g.fillStyle(0x00ff00, 1);
    // this.g.fillRect(this.follower.vec.x - 12, this.follower.vec.y - 12, 24, 24);
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

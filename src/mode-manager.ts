import { DeviceManager } from "./device-manager";
import { BaseMode } from "./modes/base-mode";
import { DeviceMode } from "./modes/device-mode";
import { LinkMode } from "./modes/link-mode";
import { PlayMode } from "./modes/play-mode";
import { RuleMode } from "./modes/rule-mode";

export enum Modes {
  PLAY_MODE,
  DEVICE_MODE,
  LINK_MODE,
  RULE_MODE,
}

export class ModeManager {
  scene: Phaser.Scene;
  deviceManager: DeviceManager;

  mode: Modes;
  modeMap: Map<Modes, BaseMode>;
  label: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, deviceManager: DeviceManager) {
    this.scene = scene;
    this.deviceManager = deviceManager;

    this.mode = Modes.DEVICE_MODE;
    this.modeMap = new Map([
      [Modes.PLAY_MODE, new PlayMode(scene, deviceManager)],
      [Modes.DEVICE_MODE, new DeviceMode(scene, deviceManager)],
      [Modes.LINK_MODE, new LinkMode(scene, deviceManager)],
      [Modes.RULE_MODE, new RuleMode(scene, deviceManager)],
    ]);
  }

  handleModeToggle = () => {
    const lastKey = this.mode;
    const nextKey = this.mode === 3 ? 0 : this.mode + 1;
    this.mode = nextKey;

    const lastMode = this.modeMap.get(lastKey);
    const nextMode = this.modeMap.get(nextKey);

    lastMode.destroy();
    nextMode.create();
  };

  create() {
    this.label = this.scene.add.text(500, 0, "", {
      color: "#ffffff",
      fontSize: "24px",
      fontFamily: "monospace",
    });

    const eKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    eKey.on("down", this.handleModeToggle);

    const mode = this.modeMap.get(this.mode);
    mode.create();
  }

  update() {
    this.label.setText(Modes[this.mode]);
  }
}

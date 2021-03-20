import { Modes } from "../mode-manager";
import { DeviceManager } from "../device-manager";

export class BaseMode {
  type: Modes;
  scene: Phaser.Scene;
  deviceManager: DeviceManager;

  constructor(scene: Phaser.Scene, deviceManger: DeviceManager) {
    this.scene = scene;
    this.deviceManager = deviceManger;
  }

  log(...args) {
    console.log(this.constructor.name, ...args);
  }

  create(): void {}
  update(): void {}
  destroy(): void {}
}

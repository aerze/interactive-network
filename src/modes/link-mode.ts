import { Device } from "../game-objects/Device";
import { BaseMode } from "./base-mode";

/**
 * Link Mode
 * √ connect two devices
 * - delete link
 */
export class LinkMode extends BaseMode {
  device1: Device;
  device2: Device;

  handleGameObjectDown(pointer: Phaser.Input.Pointer, device: Device, event: Phaser.Types.Input.EventData) {
    if (device.name !== "device") return;

    if (!this.device1) {
      this.device1 = device;
      return;
    }

    if (!this.device2) {
      this.device2 = device;
      this.deviceManager.addLink(this.device1, this.device2);

      console.log(this.deviceManager.links);
      this.device1 = null;
      this.device2 = null;
      return;
    }
  }

  create() {
    this.scene.input.on(Phaser.Input.Events.GAMEOBJECT_DOWN, this.handleGameObjectDown, this);
  }

  destroy() {
    this.scene.input.off(Phaser.Input.Events.GAMEOBJECT_DOWN, this.handleGameObjectDown, this);
  }
}

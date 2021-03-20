import { BaseDevice } from "../devices/base-device";
import { BaseMode } from "./base-mode";

/**
 * Link Mode
 * √ connect two devices
 * √ delete link
 */
export class LinkMode extends BaseMode {
  device1: BaseDevice;
  device2: BaseDevice;
  removeDevice1: BaseDevice;
  removeDevice2: BaseDevice;

  resetAdd() {
    this.device1 = null;
    this.device2 = null;
  }

  resetRemove() {
    this.removeDevice1 = null;
    this.removeDevice2 = null;
  }

  handleGameObjectDown(pointer: Phaser.Input.Pointer, device: BaseDevice, event: Phaser.Types.Input.EventData) {
    if (device.name !== "device") return;

    if (pointer.leftButtonDown()) {
      console.log("left");
      this.resetRemove();
      if (!this.device1) {
        this.device1 = device;
        return;
      }

      if (!this.device2) {
        this.device2 = device;
        this.deviceManager.addLink(this.device1, this.device2);
        this.resetAdd();
        return;
      }
    } else if (pointer.rightButtonDown()) {
      console.log("right");
      this.resetAdd();

      if (!this.removeDevice1) {
        this.removeDevice1 = device;
        return;
      }

      if (!this.removeDevice2) {
        console.log("remove");
        this.removeDevice2 = device;

        const link = this.deviceManager.findLink(this.removeDevice1, this.removeDevice2);
        this.deviceManager.removeLink(link);
        this.resetRemove();
        return;
      }
    }
  }

  create() {
    this.scene.input.on(Phaser.Input.Events.GAMEOBJECT_DOWN, this.handleGameObjectDown, this);
  }

  destroy() {
    this.scene.input.off(Phaser.Input.Events.GAMEOBJECT_DOWN, this.handleGameObjectDown, this);
  }
}

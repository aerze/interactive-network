import { BaseDevice } from "../devices/base-device";
import { BaseMode } from "./base-mode";

/**
 * Device Mode
 * √ place devices
 * √ drag and move devices
 * - select which device to place
 * √ delete a device and all related links
 */
export class DeviceMode extends BaseMode {
  deviceType: string = "server_proxy";

  handleDrag(pointer: Phaser.Input.Pointer, gob: Phaser.GameObjects.Container, dragX: number, dragY: number) {
    // ignore non device items
    if (gob.name !== "device") return;
    gob.x = dragX;
    gob.y = dragY;
  }

  handleGameObjectDown(pointer: Phaser.Input.Pointer, device: BaseDevice, event: Phaser.Types.Input.EventData) {
    if (device.name !== "device") return;
    event.stopPropagation();
    if (pointer.rightButtonDown()) {
      this.deviceManager.removeDevice(device);
    }
  }

  handlePointerDown(pointer: Phaser.Input.Pointer) {
    // ignore if dragging
    if (this.scene.input.getDragState(pointer) > 0) return;
    const { x, y } = pointer;
    this.deviceManager.addDevice({ type: this.deviceType, x, y });
  }

  create() {
    this.scene.input.on(Phaser.Input.Events.DRAG, this.handleDrag, this);
    this.scene.input.on(Phaser.Input.Events.GAMEOBJECT_DOWN, this.handleGameObjectDown, this);
    this.scene.input.on(Phaser.Input.Events.POINTER_DOWN, this.handlePointerDown, this);
  }

  destroy() {
    this.scene.input.off(Phaser.Input.Events.DRAG, this.handleDrag, this);
    this.scene.input.off(Phaser.Input.Events.GAMEOBJECT_DOWN, this.handleGameObjectDown, this);
    this.scene.input.off(Phaser.Input.Events.POINTER_DOWN, this.handlePointerDown, this);
  }
}

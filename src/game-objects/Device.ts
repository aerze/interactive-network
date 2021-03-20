import "phaser";
import { DeviceManager } from "../device-manager";

export interface IDeviceOptions {
  type: string;
  size?: Phaser.Math.Vector2;
  x?: number;
  y?: number;
}

export class Device extends Phaser.GameObjects.Container {
  static ID_COUNTER = 100;
  static HOVER_TINT: number = 0x444499;
  static defaultOptions: IDeviceOptions = {
    type: "warning",
    size: new Phaser.Math.Vector2(60, 60),
    x: 0,
    y: 0,
  };

  static TextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    color: "#ffffff",
    fontSize: "24px",
    fontFamily: "monospace",
  };

  id: string;
  deviceManager: DeviceManager;
  icon: Phaser.GameObjects.Sprite;
  text: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, deviceManager: DeviceManager, options: IDeviceOptions) {
    // fill out options
    const opts = { ...Device.defaultOptions, ...options };

    super(scene, options.x, options.y);
    this.id = (Device.ID_COUNTER++).toString();
    this.name = "device";
    this.deviceManager = deviceManager;

    this.setPosition(options.x, options.y);

    // create other game objects
    this.icon = scene.add.sprite(0, 0, opts.type);

    const textOffset = this.icon.height / 2;
    this.text = scene.add.text(0, textOffset, opts.type, Device.TextStyle);
    this.text.setOrigin();

    // add objects to container
    this.add(this.icon);
    this.add(this.text);

    // set size to enable input
    this.setSize(this.icon.width, this.icon.height);

    // enable input
    this.setInteractive();

    // enable dragging in scene
    scene.input.setDraggable(this);

    this.on("pointerover", () => {
      this.icon.setTint(Device.HOVER_TINT);
    });

    this.on("pointerout", () => {
      this.icon.clearTint();
    });
  }

  handleIncomingPacket(packet, sourceDevice) {
    // this.devices = [{ target, soruce: this }];
  }

  handleOutgoingPacket(packet, targetDevice) {}

  handleKill() {}
}

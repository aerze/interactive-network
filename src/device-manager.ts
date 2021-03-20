import { BaseDevice, IDeviceOptions } from "./devices/base-device";

export interface ILinkOptions {
  source: BaseDevice;
  target: BaseDevice;
}

export class Link {
  static makeId(source: BaseDevice, target: BaseDevice) {
    return `${source.id}:${target.id}`;
  }

  scene: Phaser.Scene;
  deviceManager: DeviceManager;

  id: string;
  source: BaseDevice;
  target: BaseDevice;
  path: Phaser.Curves.Path;
  line: Phaser.Curves.Line;

  constructor(scene: Phaser.Scene, deviceManager: DeviceManager, { source, target }: ILinkOptions) {
    this.scene = scene;
    this.deviceManager = deviceManager;

    this.id = Link.makeId(source, target);
    this.source = source;
    this.target = target;

    // create
    this.path = this.scene.add.path(0, 0);
    this.line = new Phaser.Curves.Line([source.x, source.y, target.x, target.y]);
    this.path.add(this.line);
  }

  update() {
    this.line.p0.set(this.source.x, this.source.y);
    this.line.p1.set(this.target.x, this.target.y);
    this.path.draw(this.deviceManager.graphics);
  }

  destroy() {
    this.path.destroy();
    this.line = null;
  }

  hasDevice(device: BaseDevice) {
    return this.source === device || this.target === device;
  }
}

export class DeviceManager {
  scene: Phaser.Scene;

  graphics: Phaser.GameObjects.Graphics;
  links: Map<string, Link>;
  devices: Map<string, BaseDevice>;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.devices = new Map();
    this.links = new Map();
  }

  addDevice(options: IDeviceOptions) {
    const device = new BaseDevice(this.scene, this, options);
    this.devices.set(device.id, device);
    this.scene.add.existing(device);
    return device;
  }

  removeDevice(device: BaseDevice) {
    this.devices.delete(device.id);
    this.links.forEach((link) => {
      if (link.hasDevice(device)) {
        this.removeLink(link);
      }
    });
    device.destroy();
  }

  addLink(sourceDevice: BaseDevice | string, targetDevice: BaseDevice | string) {
    const source = typeof sourceDevice === "string" ? this.devices.get(sourceDevice) : sourceDevice;
    const target = typeof targetDevice === "string" ? this.devices.get(targetDevice) : targetDevice;
    if (!source || !target) return;

    const id = Link.makeId(source, target);
    if (this.links.has(id)) return;

    const link = new Link(this.scene, this, { source, target });
    this.links.set(link.id, link);
  }

  findLink(device1, device2) {
    const link1 = this.links.get(Link.makeId(device1, device2));
    if (link1) return link1;
    const link2 = this.links.get(Link.makeId(device2, device1));
    if (link2) return link2;
    return null;
  }

  removeLink(link) {
    this.links.delete(link.id);
    link.destroy();
  }

  create() {
    this.graphics = this.scene.add.graphics();
  }

  update() {
    this.graphics.clear();
    this.graphics.lineStyle(6, 0xffffff, 1);
    this.links.forEach((link) => link.update());
  }
}

import "phaser";

export interface IIconOptions {
  type: string;
  size?: Phaser.Math.Vector2;
}

export const defaultIconOptions: IIconOptions = {
  type: "warning",
  size: new Phaser.Math.Vector2(120, 120),
};

export class Icon extends Phaser.GameObjects.Container {
  static TextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    color: "#ffffff",
    fontSize: "24px",
    fontFamily: "monospace",
  };

  static Tint: number = 0x444499;

  icon: Phaser.GameObjects.Sprite;
  text: Phaser.GameObjects.Text;

  constructor(options: IIconOptions, scene: Phaser.Scene, x?: number, y?: number) {
    super(scene, x, y);

    this.setPosition(x, y);

    // fill out options
    const opts = { ...defaultIconOptions, ...options };

    // create other game objects
    this.icon = scene.add.sprite(0, 0, opts.type);

    const textOffset = this.icon.height / 2;
    this.text = scene.add.text(0, textOffset, opts.type, Icon.TextStyle);
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
      this.icon.setTint(Icon.Tint);
    });

    this.on("pointerout", () => {
      this.icon.clearTint();
    });
  }
}

import "phaser";
import iconList from "../icon-list";

export default class Loading extends Phaser.Scene {
  constructor() {
    super("loading");
  }

  preload() {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width, height } = this.cameras.main;
    const style = { font: "18px monospace", color: "#ffffff" };

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "loading..",
      style,
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: `0%`,
      style,
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style,
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", (value) => {
      percentText.setText(`${Math.floor(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on("filecomplete", (file) => {
      assetText.setText(`loading: ${file}`);
    });

    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();

      setTimeout(() => {
        this.scene.start("main");
      }, 1000);
    });

    this.load.image("logo", "assets/phaser3-logo.png");
    this.load.image("libs", "assets/libs.png");
    this.load.glsl("bundle", "assets/plasma-bundle.glsl.js");
    this.load.glsl("stars", "assets/starfields.glsl.js");

    const svgSizeConfig = { width: 120, height: 120 };
    console.groupCollapsed("icon names");
    for (const icon of iconList) {
      console.log(icon.name);
      this.load.svg(icon.name, `assets/icons/${icon.filename}`, svgSizeConfig);
    }
    console.groupEnd();
  }

  create() {
    const logo = this.add.image(400, 300, "logo");
  }
}

import { Component } from "../component/Component";
import { Text } from "../component/Text";
import { Rect } from "../component/Rect";
import { Ani } from "./Ani";
import { customAni } from "./AniCreator";
import * as d3 from "d3";
export interface ProgressOptions {
  position?: { x: number; y: number };
  aniTime?: [number, number];
}
export class Progress extends Ani {
  ani: Ani;
  shape = { width: 200, height: 24 };
  radius: number = 6;
  padding: number = 3;
  color: string = "#FFF";
  lineWidth: number = 2;
  aniTime = [0, 3];
  position = { x: 0, y: 0 };
  center = { x: 0, y: 0 };
  constructor(options?: ProgressOptions) {
    super();
    if (options) {
      if (options.position) this.position = options.position;
      if (options.aniTime) this.aniTime = options.aniTime;
    }
    const border0 = new Rect({
      shape: {
        width: this.shape.width,
        height: this.shape.height,
      },
      center: { x: this.shape.width / 2, y: this.shape.height / 2 },
      alpha: 1,
      radius: this.radius,
      fillStyle: "#0006",
      strokeStyle: this.color,
      lineWidth: this.lineWidth,
    });
    const border1 = new Rect({
      shape: {
        width: this.shape.width * 1.75,
        height: this.shape.height,
      },
      center: {
        x: (this.shape.width * 1.75) / 2,
        y: this.shape.height / 2,
      },
      alpha: 1,
      radius: this.radius,
      fillStyle: "#0006",
      strokeStyle: this.color,
      lineWidth: this.lineWidth,
    });
    const bar0 = new Rect({
      position: { x: this.padding, y: this.padding },
      center: { x: this.shape.width / 2, y: this.shape.height / 2 },
      shape: { width: 0, height: this.shape.height - this.padding * 2 },
      radius: this.radius,
      fillStyle: this.color,
    });
    const bar1 = new Rect({
      position: { x: this.padding, y: this.padding },
      center: { x: (this.shape.width / 2) * 1.75, y: this.shape.height / 2 },
      shape: {
        width: (this.shape.width - this.padding * 2) * 1.75,
        height: this.shape.height - this.padding * 2,
      },
      radius: this.radius,
      fillStyle: this.color,
    });

    const start = new Component({ position: this.position });
    start.children.push(border0);
    start.children.push(bar0);
    const end = new Component({ position: this.position });
    end.children.push(border1);
    end.children.push(bar1);

    const borderFinished = new Rect({
      shape: {
        width: this.shape.width * 2,
        height: this.shape.height * 2,
      },
      center: {
        x: (this.shape.width * 2) / 2,
        y: (this.shape.height * 2) / 2,
      },
      alpha: 0,
      radius: this.radius,
      fillStyle: "#0006",
      strokeStyle: "#27C",
      lineWidth: this.lineWidth,
    });
    const bar2 = new Rect({
      center: { x: this.shape.width / 2, y: this.shape.height / 2 },
      position: { x: this.padding, y: this.padding },
      shape: {
        width: this.shape.width - this.padding * 2,
        height: this.shape.height - this.padding * 2,
      },
      alpha: 0.0,
      radius: this.radius,
      fillStyle: "#27C",
    });
    const final = new Component({ position: this.position, alpha: 1 });
    final.children.push(borderFinished);
    final.children.push(bar2);

    const objCopy = Object.assign({}, final);
    objCopy.alpha = 0;
    this.ani = customAni(this.aniTime[0])
      .keyFrame(start)
      .duration(this.aniTime[1], d3.easePolyOut.exponent(5))
      .keyFrame(end)
      .duration(0.25)
      .keyFrame(final)
      .duration(0.5)
      .keyFrame(final)
      .duration(0.2)
      .keyFrame(objCopy);
  }
  getComponent(sec: number) {
    return this.ani.getComponent(sec);
  }
}

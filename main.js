const initCanvas = (canvas, draw) => {
  const context = canvas.getContext("2d");
  let loop = true;
  let ti = 0;
  const redraw = t => {
    if (!loop) return;
    const dt = t - ti;
    ti = t;
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw(context, dt / 1000);
    requestAnimationFrame(redraw);
  };
  redraw(0);
  return () => {
    loop = false;
  };
};

class Thing {
  constructor(x, y, size = 10) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.velocity = 5 + 15 * Math.random();
    this.direction = 360 * Math.random();
  }

  update(dt) {
    this.x += dt * this.velocity * Math.cos(this.direction);
    this.y += dt * this.velocity * Math.sin(this.direction);
  }

  draw(ctx) {
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

const things = new Array(10)
  .fill(0)
  .map(() => new Thing(700 * Math.random(), 400 * Math.random()));

let t = 0;
const draw = (ctx, dt) => {
  t += dt;

  ctx.fillStyle = "#000000";
  things.forEach(thing => {
    thing.update(dt);
    thing.draw(ctx);
  });

  ctx.font = "22px sans-serif";
  ctx.fillStyle = "#FF0000";
  ctx.fillText(`${things.length} cubes`, 8, 16);
};

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  initCanvas(canvas, draw);

  const button = document.getElementById("button");
  button.onclick = () => {
    things.push(new Thing(700 * Math.random(), 400 * Math.random()));
  };
});

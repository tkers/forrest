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
  constructor(x, y, width = 10, height = 10) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocity = 5 + 15 * Math.random();
    this.direction = 360 * Math.random();
  }

  collides(that) {
    return (
      this.x < that.x + that.width &&
      that.x < this.x + this.width &&
      this.y < that.y + that.height &&
      that.y < this.y + this.height
    );
  }

  update(dt) {
    this.x += dt * this.velocity * Math.cos(this.direction);
    this.y += dt * this.velocity * Math.sin(this.direction);
  }

  draw(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

const things = new Array(50)
  .fill(0)
  .map(() => new Thing(700 * Math.random(), 400 * Math.random()));

let t = 0;
const draw = (ctx, dt) => {
  t += dt;

  let checks = 0;
  things.forEach(thing => {
    const intersect = things.some(other => {
      checks++;
      return thing !== other && thing.collides(other);
    });
    ctx.fillStyle = intersect ? "#FF0000" : "#000000";
    thing.update(dt);
    thing.draw(ctx);
  });

  ctx.font = "16px sans-serif";
  ctx.fillStyle = "#0000AA";
  ctx.fillText(`${things.length} cubes • ${checks} checks`, 10, 28);
};

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  initCanvas(canvas, draw);

  const button = document.getElementById("button");
  button.onclick = () => {
    things.push(new Thing(700 * Math.random(), 400 * Math.random()));
  };
});

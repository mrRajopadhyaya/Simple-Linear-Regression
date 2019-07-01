class LinearRegression {
  canvas = document.getElementById("canvas");
  ctx = this.canvas.getContext("2d");
  app = document.getElementById("app");
  slopeBtn = document.getElementById("slopeBtn");
  clearBtn = document.getElementById("clearBtn");
  toolBar = document.getElementById("toolbar");
  pointSize = 5;
  dataPoints = [];

  constructor() {
    this.drawCanvas();
    this.canvas.addEventListener("click", this.handleCanvasClick);
    this.slopeBtn.addEventListener("click", this.calculateSlope);
    this.clearBtn.addEventListener("click", this.clear);

    let toolBarWidth =
      this.canvas.width - this.toolBar.getBoundingClientRect().width;
    let windowWidth = window.innerWidth - this.canvas.width;
    this.app.style.marginLeft = `${windowWidth / 2}px`;
    this.toolBar.style.marginLeft = `${toolBarWidth / 2}px`;
  }

  drawCanvas = () => {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };

  handleCanvasClick = event => {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.drawPoints(x, y);
  };

  drawPoints(x, y) {
    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.arc(x, y, this.pointSize, 0, Math.PI * 2, true);
    this.ctx.fill();
    this.ctx.closePath();
    this.dataPoints.push([x, y]);
  }

  calculateSlope = () => {
    let xMean = this.calculateXMean();
    let yMean = this.calculateYMean();

    let numerator = 0;
    let denominator = 0;
    let slope = 0;
    let c = 0;

    this.dataPoints.forEach(points => {
      numerator = numerator + (points[0] - xMean) * (points[1] - yMean);
      denominator = denominator + Math.pow(points[0] - xMean, 2);
    });

    slope = numerator / denominator;

    c = yMean - slope * xMean;

    let x1 = 0;
    let y1 = slope * x1 + c;

    let x2 = this.canvas.width;
    let y2 = slope * x2 + c;

    this.drawLine(x1, y1, x2, y2);
  };

  drawLine(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineWidth = 2;
    // set line color
    this.ctx.strokeStyle = "pink";
    this.ctx.stroke();
    this.ctx.closePath();
  }

  calculateXMean = () => {
    let sum = 0;
    this.dataPoints.forEach(points => {
      sum = sum + points[0];
    });
    return sum / this.dataPoints.length;
  };

  calculateYMean = () => {
    let sum = 0;
    this.dataPoints.forEach(points => {
      sum = sum + points[1];
    });
    return sum / this.dataPoints.length;
  };

  clear = () => {
    this.dataPoints = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawCanvas();
  };
}
new LinearRegression();

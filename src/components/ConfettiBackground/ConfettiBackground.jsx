import React, { useRef, useEffect } from "react";

// --- Vector2, EulerMass, ConfettiPaper, ConfettiRibbon classes (converted from JS) ---
const frameRate = 60; // Higher frame rate for smoother animation
const dt = (1.0 / frameRate) * 0.4; // Slow down by multiplying by 0.4
const DEG_TO_RAD = Math.PI / 180;
const colors = [
  ["#F0F8FF", "#F0F8FF"],
  ["#df0049", "#660671"],
  ["#00e857", "#005291"],
  ["#2bebbc", "#05798a"],
  ["#ffd200", "#b06c00"],

];

function Vector2(_x, _y) {
  this.x = _x;
  this.y = _y;
}
Vector2.prototype.Length = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};
Vector2.prototype.Add = function (_vec) {
  this.x += _vec.x;
  this.y += _vec.y;
};
Vector2.prototype.Sub = function (_vec) {
  this.x -= _vec.x;
  this.y -= _vec.y;
};
Vector2.prototype.Div = function (_f) {
  this.x /= _f;
  this.y /= _f;
};
Vector2.prototype.Mul = function (_f) {
  this.x *= _f;
  this.y *= _f;
};
Vector2.prototype.Normalize = function () {
  const sqrLen = this.x * this.x + this.y * this.y;
  if (sqrLen !== 0) {
    const factor = 1.0 / Math.sqrt(sqrLen);
    this.x *= factor;
    this.y *= factor;
  }
};
Vector2.prototype.Normalized = function () {
  const sqrLen = this.x * this.x + this.y * this.y;
  if (sqrLen !== 0) {
    const factor = 1.0 / Math.sqrt(sqrLen);
    return new Vector2(this.x * factor, this.y * factor);
  }
  return new Vector2(0, 0);
};
Vector2.Sub = function (_vec0, _vec1) {
  return new Vector2(_vec0.x - _vec1.x, _vec0.y - _vec1.y);
};

function EulerMass(_x, _y, _mass, _drag) {
  this.position = new Vector2(_x, _y);
  this.mass = _mass;
  this.drag = _drag;
  this.force = new Vector2(0, 0);
  this.velocity = new Vector2(0, 0);
}
EulerMass.prototype.AddForce = function (_f) {
  this.force.Add(_f);
};
EulerMass.prototype.Integrate = function (_dt) {
  const acc = this.CurrentForce(this.position);
  acc.Div(this.mass);
  const posDelta = new Vector2(this.velocity.x, this.velocity.y);
  posDelta.Mul(_dt);
  this.position.Add(posDelta);
  acc.Mul(_dt);
  this.velocity.Add(acc);
  this.force = new Vector2(0, 0);
};
EulerMass.prototype.CurrentForce = function () {
  const totalForce = new Vector2(this.force.x, this.force.y);
  const speed = this.velocity.Length();
  const dragVel = new Vector2(this.velocity.x, this.velocity.y);
  dragVel.Mul(this.drag * this.mass * speed);
  totalForce.Sub(dragVel);
  return totalForce;
};

function ConfettiPaper(_x, _y, bounds) {
  this.pos = new Vector2(_x, _y);
  this.rotationSpeed = Math.random() * 200 + 200; // slower rotation
  this.angle = DEG_TO_RAD * Math.random() * 360;
  this.rotation = DEG_TO_RAD * Math.random() * 360;
  this.cosA = 1.0;
  this.size = 5.0;
  this.oscillationSpeed = Math.random() * 1.0 + 0.3; // slower oscillation
  this.xSpeed = 20.0; // slower horizontal
  this.ySpeed = Math.random() * 20 + 20.0; // slower vertical
  this.corners = [];
  this.time = Math.random();
  const ci = Math.round(Math.random() * (colors.length - 1));
  this.frontColor = colors[ci][0];
  this.backColor = colors[ci][1];
  for (let i = 0; i < 4; i++) {
    const dx = Math.cos(this.angle + DEG_TO_RAD * (i * 90 + 45));
    const dy = Math.sin(this.angle + DEG_TO_RAD * (i * 90 + 45));
    this.corners[i] = new Vector2(dx, dy);
  }
  this.Update = (_dt) => {
    this.time += _dt;
    this.rotation += this.rotationSpeed * _dt;
    this.cosA = Math.cos(DEG_TO_RAD * this.rotation);
    this.pos.x +=
      Math.cos(this.time * this.oscillationSpeed) * this.xSpeed * _dt;
    this.pos.y += this.ySpeed * _dt;
    if (this.pos.y > bounds.y) {
      this.pos.x = Math.random() * bounds.x;
      this.pos.y = 0;
    }
  };
  this.Draw = (_g) => {
    _g.save();
    _g.beginPath();
    _g.moveTo(
      this.pos.x + this.corners[0].x * this.size,
      this.pos.y + this.corners[0].y * this.size * this.cosA
    );
    for (let i = 1; i < 4; i++) {
      _g.lineTo(
        this.pos.x + this.corners[i].x * this.size,
        this.pos.y + this.corners[i].y * this.size * this.cosA
      );
    }
    _g.closePath();
    _g.fillStyle = this.cosA > 0 ? this.frontColor : this.backColor;
    _g.fill();
    _g.restore();
  };
}

function ConfettiRibbon(
  _x,
  _y,
  _count,
  _dist,
  _thickness,
  _angle,
  _mass,
  _drag,
  bounds
) {
  this.particleDist = _dist;
  this.particleCount = _count;
  this.particleMass = _mass;
  this.particleDrag = _drag;
  this.particles = [];
  const ci = Math.round(Math.random() * (colors.length - 1));
  this.frontColor = colors[ci][0];
  this.backColor = colors[ci][1];
  this.xOff = Math.cos(DEG_TO_RAD * _angle) * _thickness;
  this.yOff = Math.sin(DEG_TO_RAD * _angle) * _thickness;
  this.position = new Vector2(_x, _y);
  this.prevPosition = new Vector2(_x, _y);
  this.velocityInherit = Math.random() * 1 + 2; // slower inherit
  this.time = Math.random() * 100;
  this.oscillationSpeed = Math.random() * 1 + 1; // slower oscillation
  this.oscillationDistance = Math.random() * 20 + 20; // less horizontal movement
  this.ySpeed = Math.random() * 20 + 30; // slower vertical
  for (let i = 0; i < this.particleCount; i++) {
    this.particles[i] = new EulerMass(
      _x,
      _y - i * this.particleDist,
      this.particleMass,
      this.particleDrag
    );
  }
  this.Update = (_dt) => {
    this.time += _dt * this.oscillationSpeed;
    this.position.y += this.ySpeed * _dt;
    this.position.x += Math.cos(this.time) * this.oscillationDistance * _dt;
    this.particles[0].position = this.position;
    const dX = this.prevPosition.x - this.position.x;
    const dY = this.prevPosition.y - this.position.y;
    const delta = Math.sqrt(dX * dX + dY * dY);
    this.prevPosition = new Vector2(this.position.x, this.position.y);
    for (let i = 1; i < this.particleCount; i++) {
      const dirP = Vector2.Sub(
        this.particles[i - 1].position,
        this.particles[i].position
      );
      dirP.Normalize();
      dirP.Mul((delta / _dt) * this.velocityInherit);
      this.particles[i].AddForce(dirP);
    }
    for (let i = 1; i < this.particleCount; i++) {
      this.particles[i].Integrate(_dt);
    }
    for (let i = 1; i < this.particleCount; i++) {
      const rp2 = new Vector2(
        this.particles[i].position.x,
        this.particles[i].position.y
      );
      rp2.Sub(this.particles[i - 1].position);
      rp2.Normalize();
      rp2.Mul(this.particleDist);
      rp2.Add(this.particles[i - 1].position);
      this.particles[i].position = rp2;
    }
    if (this.position.y > bounds.y + this.particleDist * this.particleCount) {
      this.Reset(bounds);
    }
  };
  this.Reset = (bounds) => {
    this.position.y = -Math.random() * bounds.y;
    this.position.x = Math.random() * bounds.x;
    this.prevPosition = new Vector2(this.position.x, this.position.y);
    this.velocityInherit = Math.random() * 1 + 2;
    this.time = Math.random() * 100;
    this.oscillationSpeed = Math.random() * 1.0 + 1.0;
    this.oscillationDistance = Math.random() * 20 + 20;
    this.ySpeed = Math.random() * 20 + 30;
    const ci = Math.round(Math.random() * (colors.length - 1));
    this.frontColor = colors[ci][0];
    this.backColor = colors[ci][1];
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles[i] = new EulerMass(
        this.position.x,
        this.position.y - i * this.particleDist,
        this.particleMass,
        this.particleDrag
      );
    }
  };
  this.Draw = (_g) => {
    for (let i = 0; i < this.particleCount - 1; i++) {
      const p0 = new Vector2(
        this.particles[i].position.x + this.xOff,
        this.particles[i].position.y + this.yOff
      );
      const p1 = new Vector2(
        this.particles[i + 1].position.x + this.xOff,
        this.particles[i + 1].position.y + this.yOff
      );
      _g.beginPath();
      _g.moveTo(this.particles[i].position.x, this.particles[i].position.y);
      _g.lineTo(
        this.particles[i + 1].position.x,
        this.particles[i + 1].position.y
      );
      _g.lineTo(p1.x, p1.y);
      _g.lineTo(p0.x, p0.y);
      _g.closePath();
      _g.fillStyle = this.frontColor;
      _g.fill();
      _g.strokeStyle = this.frontColor;
      _g.stroke();
    }
  };
}

// --- React Component ---
const ConfettiBackground = () => {
  const canvasRef = useRef(null);
  const parentRef = useRef(null);
  const animationRef = useRef();
  const confettiPapers = useRef([]);
  const confettiRibbons = useRef([]);
  const bounds = useRef({ x: 0, y: 0 });

  // Resize canvas and confetti bounds
  const resize = () => {
    const canvas = canvasRef.current;
    const parent = parentRef.current;
    if (!canvas || !parent) return;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    bounds.current = { x: canvas.width, y: canvas.height };
    confettiPapers.current.forEach((p) => (p.bounds = bounds.current));
    confettiRibbons.current.forEach((r) => (r.bounds = bounds.current));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = parentRef.current;
    if (!canvas || !parent) return;

    // Set initial size
    resize();

    // Create confetti objects
    const confettiRibbonCount = 7;
    const rpCount = 30;
    const rpDist = 8.0;
    const rpThick = 8.0;
    confettiRibbons.current = [];
    for (let i = 0; i < confettiRibbonCount; i++) {
      confettiRibbons.current.push(
        new ConfettiRibbon(
          Math.random() * canvas.width,
          -Math.random() * canvas.height * 2,
          rpCount,
          rpDist,
          rpThick,
          45,
          1,
          0.05,
          bounds.current
        )
      );
    }
    const confettiPaperCount = 25;
    confettiPapers.current = [];
    for (let i = 0; i < confettiPaperCount; i++) {
      confettiPapers.current.push(
        new ConfettiPaper(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          bounds.current
        )
      );
    }

    // Animation loop
    const context = canvas.getContext("2d");
    function animate() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      confettiPapers.current.forEach((p) => {
        p.Update(dt);
        p.Draw(context);
      });
      confettiRibbons.current.forEach((r) => {
        r.Update(dt);
        r.Draw(context);
      });
      animationRef.current = requestAnimationFrame(animate);
    }
    animate();

    // Resize handler
    window.addEventListener("resize", resize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      ref={parentRef}
      id="confetti"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(to top, #87ceeb, #e0f7ff)",
        zIndex: -1,
      }}
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default ConfettiBackground;

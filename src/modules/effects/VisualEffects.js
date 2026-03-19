// ==================== VisualEffects - 视觉效果模块 ====================
// 提供涟漪、发光、粒子等视觉效果

class VisualEffects {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.effects = [];
    this.isRunning = false;
    this.rafId = null;
  }

  // 创建涟漪效果
  createRipple(x, y, options = {}) {
    const {
      color = '#6366f1',
      maxRadius = 100,
      duration = 600,
      lineWidth = 2
    } = options;

    const ripple = {
      type: 'ripple',
      x,
      y,
      color,
      maxRadius,
      duration,
      lineWidth,
      startTime: performance.now(),
      opacity: 1
    };

    this.effects.push(ripple);
    this.start();
    return ripple;
  }

  // 创建粒子爆炸效果
  createParticleExplosion(x, y, options = {}) {
    const {
      color = '#6366f1',
      particleCount = 12,
      speed = 3,
      size = 4,
      duration = 800
    } = options;

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      particles.push({
        type: 'particle',
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size,
        duration,
        startTime: performance.now(),
        opacity: 1
      });
    }

    this.effects.push(...particles);
    this.start();
    return particles;
  }

  // 创建发光脉冲效果
  createGlowPulse(x, y, options = {}) {
    const {
      color = '#6366f1',
      maxRadius = 60,
      duration = 1000
    } = options;

    const pulse = {
      type: 'glowPulse',
      x,
      y,
      color,
      maxRadius,
      duration,
      startTime: performance.now(),
      opacity: 0.6
    };

    this.effects.push(pulse);
    this.start();
    return pulse;
  }

  // 创建连接线绘制动画
  createLineDraw(x1, y1, x2, y2, options = {}) {
    const {
      color = '#94a3b8',
      width = 2,
      duration = 400
    } = options;

    const line = {
      type: 'lineDraw',
      x1,
      y1,
      x2,
      y2,
      color,
      width,
      duration,
      startTime: performance.now(),
      progress: 0
    };

    this.effects.push(line);
    this.start();
    return line;
  }

  // 创建文字弹出效果
  createTextPopup(x, y, text, options = {}) {
    const {
      color = '#ffffff',
      fontSize = 14,
      duration = 1000,
      offsetY = -30
    } = options;

    const popup = {
      type: 'textPopup',
      x,
      y,
      text,
      color,
      fontSize,
      duration,
      offsetY,
      startTime: performance.now(),
      opacity: 1,
      currentY: y
    };

    this.effects.push(popup);
    this.start();
    return popup;
  }

  // 启动效果循环
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.tick();
  }

  // 效果渲染循环
  tick() {
    if (!this.isRunning || !this.ctx) return;

    const now = performance.now();
    const completedEffects = [];

    // 更新和渲染所有效果
    this.effects.forEach((effect, index) => {
      const elapsed = now - effect.startTime;
      const progress = Math.min(elapsed / effect.duration, 1);

      switch (effect.type) {
        case 'ripple':
          this.renderRipple(effect, progress);
          break;
        case 'particle':
          this.renderParticle(effect, progress);
          break;
        case 'glowPulse':
          this.renderGlowPulse(effect, progress);
          break;
        case 'lineDraw':
          this.renderLineDraw(effect, progress);
          break;
        case 'textPopup':
          this.renderTextPopup(effect, progress);
          break;
      }

      if (progress >= 1) {
        completedEffects.push(index);
      }
    });

    // 移除已完成的效果
    for (let i = completedEffects.length - 1; i >= 0; i--) {
      this.effects.splice(completedEffects[i], 1);
    }

    // 如果没有效果了，停止循环
    if (this.effects.length === 0) {
      this.isRunning = false;
      return;
    }

    this.rafId = requestAnimationFrame(() => this.tick());
  }

  // 渲染涟漪
  renderRipple(effect, progress) {
    const currentRadius = effect.maxRadius * progress;
    const opacity = 1 - progress;

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(effect.x, effect.y, currentRadius, 0, Math.PI * 2);
    this.ctx.strokeStyle = effect.color;
    this.ctx.lineWidth = effect.lineWidth * (1 - progress * 0.5);
    this.ctx.globalAlpha = opacity;
    this.ctx.stroke();
    this.ctx.restore();
  }

  // 渲染粒子
  renderParticle(effect, progress) {
    const x = effect.x + effect.vx * progress * 100;
    const y = effect.y + effect.vy * progress * 100;
    const opacity = 1 - progress;
    const size = effect.size * (1 - progress * 0.5);

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(x, y, size, 0, Math.PI * 2);
    this.ctx.fillStyle = effect.color;
    this.ctx.globalAlpha = opacity;
    this.ctx.fill();
    this.ctx.restore();
  }

  // 渲染发光脉冲
  renderGlowPulse(effect, progress) {
    const currentRadius = effect.maxRadius * Math.sin(progress * Math.PI);
    const opacity = effect.opacity * (1 - progress);

    this.ctx.save();
    const gradient = this.ctx.createRadialGradient(
      effect.x, effect.y, 0,
      effect.x, effect.y, currentRadius
    );
    gradient.addColorStop(0, effect.color + '00');
    gradient.addColorStop(0.5, effect.color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
    gradient.addColorStop(1, effect.color + '00');

    this.ctx.beginPath();
    this.ctx.arc(effect.x, effect.y, currentRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    this.ctx.restore();
  }

  // 渲染连接线绘制
  renderLineDraw(effect, progress) {
    const currentX = effect.x1 + (effect.x2 - effect.x1) * progress;
    const currentY = effect.y1 + (effect.y2 - effect.y1) * progress;

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(effect.x1, effect.y1);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.strokeStyle = effect.color;
    this.ctx.lineWidth = effect.width;
    this.ctx.stroke();
    this.ctx.restore();
  }

  // 渲染文字弹出
  renderTextPopup(effect, progress) {
    const yOffset = effect.offsetY * progress;
    const opacity = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;

    this.ctx.save();
    this.ctx.font = `${effect.fontSize}px "Noto Sans SC", sans-serif`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = effect.color;
    this.ctx.globalAlpha = opacity;
    this.ctx.fillText(effect.text, effect.x, effect.y + yOffset);
    this.ctx.restore();
  }

  // 清除所有效果
  clear() {
    this.effects = [];
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  // 销毁
  destroy() {
    this.clear();
    this.canvas = null;
    this.ctx = null;
  }
}

// 导出
export { VisualEffects };

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VisualEffects };
}

if (typeof window !== 'undefined') {
  window.VisualEffects = VisualEffects;
}

// ==================== AnimationEngine - 动画引擎 ====================
// 提供高性能的动画系统，支持弹簧物理、缓动函数和时间轴控制

class AnimationEngine {
  constructor() {
    this.animations = new Map();
    this.animationId = 0;
    this.isRunning = false;
    this.rafId = null;
    
    // 缓动函数库
    this.easings = {
      linear: t => t,
      easeInQuad: t => t * t,
      easeOutQuad: t => 1 - (1 - t) * (1 - t),
      easeInOutQuad: t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
      easeInCubic: t => t * t * t,
      easeOutCubic: t => 1 - Math.pow(1 - t, 3),
      easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      easeOutElastic: t => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
      },
      easeOutBounce: t => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1) {
          return n1 * t * t;
        } else if (t < 2 / d1) {
          return n1 * (t -= 1.5 / d1) * t + 0.75;
        } else if (t < 2.5 / d1) {
          return n1 * (t -= 2.25 / d1) * t + 0.9375;
        } else {
          return n1 * (t -= 2.625 / d1) * t + 0.984375;
        }
      },
      spring: (t, tension = 0.3, friction = 0.8) => {
        // 简化的弹簧物理模型
        return 1 - Math.exp(-t * (1 - friction) * 10) * Math.cos(t * tension * 20);
      }
    };
  }
  
  // 创建动画
  animate(options) {
    const {
      target,
      property,
      from,
      to,
      duration = 300,
      easing = 'easeOutQuad',
      delay = 0,
      onUpdate,
      onComplete,
      onCancel
    } = options;
    
    const id = ++this.animationId;
    const startTime = performance.now() + delay;
    
    const animation = {
      id,
      target,
      property,
      from,
      to,
      duration,
      easing: typeof easing === 'string' ? this.easings[easing] : easing,
      startTime,
      onUpdate,
      onComplete,
      onCancel,
      isCancelled: false
    };
    
    this.animations.set(id, animation);
    
    if (!this.isRunning) {
      this.start();
    }
    
    return {
      id,
      cancel: () => this.cancel(id)
    };
  }
  
  // 创建弹簧动画
  spring(options) {
    const {
      target,
      property,
      from,
      to,
      tension = 0.3,
      friction = 0.8,
      mass = 1,
      onUpdate,
      onComplete
    } = options;
    
    const id = ++this.animationId;
    let velocity = 0;
    let position = from;
    let lastTime = performance.now();
    
    const springAnimation = {
      id,
      target,
      property,
      from,
      to,
      tension,
      friction,
      mass,
      velocity,
      position,
      lastTime,
      onUpdate,
      onComplete,
      isCancelled: false,
      isSpring: true
    };
    
    this.animations.set(id, springAnimation);
    
    if (!this.isRunning) {
      this.start();
    }
    
    return {
      id,
      cancel: () => this.cancel(id)
    };
  }
  
  // 创建时间轴动画
  timeline() {
    return new Timeline(this);
  }
  
  // 启动动画循环
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.tick();
  }
  
  // 动画帧
  tick() {
    if (!this.isRunning) return;
    
    const now = performance.now();
    const completedAnimations = [];
    
    this.animations.forEach((animation, id) => {
      if (animation.isCancelled) {
        completedAnimations.push(id);
        return;
      }
      
      if (animation.isSpring) {
        this.updateSpringAnimation(animation, now);
      } else {
        this.updateRegularAnimation(animation, now, completedAnimations);
      }
    });
    
    // 清理已完成的动画
    completedAnimations.forEach(id => {
      const animation = this.animations.get(id);
      if (animation && animation.onComplete) {
        animation.onComplete();
      }
      this.animations.delete(id);
    });
    
    // 如果没有动画了，停止循环
    if (this.animations.size === 0) {
      this.isRunning = false;
      return;
    }
    
    this.rafId = requestAnimationFrame(() => this.tick());
  }
  
  // 更新普通动画
  updateRegularAnimation(animation, now, completedAnimations) {
    const elapsed = now - animation.startTime;
    
    if (elapsed < 0) return; // 还在延迟阶段
    
    const progress = Math.min(elapsed / animation.duration, 1);
    const easedProgress = animation.easing(progress);
    const value = animation.from + (animation.to - animation.from) * easedProgress;
    
    // 更新目标属性
    if (animation.target && animation.property) {
      animation.target[animation.property] = value;
    }
    
    // 回调
    if (animation.onUpdate) {
      animation.onUpdate(value, progress);
    }
    
    // 动画完成
    if (progress >= 1) {
      completedAnimations.push(animation.id);
    }
  }
  
  // 更新弹簧动画
  updateSpringAnimation(animation, now) {
    const dt = Math.min((now - animation.lastTime) / 1000, 0.1); // 限制最大时间步长
    animation.lastTime = now;
    
    // 弹簧物理计算
    const displacement = animation.position - animation.to;
    const springForce = -animation.tension * displacement;
    const dampingForce = -animation.friction * animation.velocity;
    const acceleration = (springForce + dampingForce) / animation.mass;
    
    animation.velocity += acceleration * dt;
    animation.position += animation.velocity * dt;
    
    // 更新目标属性
    if (animation.target && animation.property) {
      animation.target[animation.property] = animation.position;
    }
    
    // 回调
    if (animation.onUpdate) {
      animation.onUpdate(animation.position);
    }
    
    // 检查是否接近静止
    const isSettled = Math.abs(displacement) < 0.01 && Math.abs(animation.velocity) < 0.01;
    
    if (isSettled) {
      animation.position = animation.to;
      if (animation.target && animation.property) {
        animation.target[animation.property] = animation.to;
      }
      if (animation.onComplete) {
        animation.onComplete();
      }
      this.animations.delete(animation.id);
    }
  }
  
  // 取消动画
  cancel(id) {
    const animation = this.animations.get(id);
    if (animation) {
      animation.isCancelled = true;
      if (animation.onCancel) {
        animation.onCancel();
      }
      this.animations.delete(id);
    }
  }
  
  // 取消所有动画
  cancelAll() {
    this.animations.forEach((animation, id) => {
      this.cancel(id);
    });
  }
  
  // 停止引擎
  stop() {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}

// 时间轴类
class Timeline {
  constructor(engine) {
    this.engine = engine;
    this.animations = [];
    this.currentTime = 0;
  }
  
  add(options) {
    this.animations.push({
      ...options,
      startTime: this.currentTime
    });
    this.currentTime += (options.duration || 300) + (options.delay || 0);
    return this;
  }
  
  stagger(options, count, staggerDelay = 50) {
    for (let i = 0; i < count; i++) {
      this.animations.push({
        ...options,
        delay: (options.delay || 0) + i * staggerDelay,
        startTime: this.currentTime
      });
    }
    this.currentTime += (options.duration || 300) + (count - 1) * staggerDelay;
    return this;
  }
  
  play() {
    const controllers = this.animations.map(anim => {
      return this.engine.animate(anim);
    });
    
    return {
      cancel: () => controllers.forEach(c => c.cancel())
    };
  }
}

// 创建全局动画引擎实例
const animationEngine = new AnimationEngine();

// 导出
export { AnimationEngine, Timeline, animationEngine };

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AnimationEngine, Timeline, animationEngine };
}

if (typeof window !== 'undefined') {
  window.AnimationEngine = AnimationEngine;
  window.Timeline = Timeline;
  window.animationEngine = animationEngine;
}

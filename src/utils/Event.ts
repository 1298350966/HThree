export default class Event {
  private listeners: { [key: string]: Function[] } = {};

  // 添加事件监听器
  public on(event: string, listener: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  // 移除事件监听器
  public off(event: string, listener: Function) {
    if (!this.listeners[event]) {
      return;
    }
    const index = this.listeners[event].indexOf(listener);
    if (index > -1) {
      this.listeners[event].splice(index, 1);
    }
  }

  // 触发事件
  public emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}

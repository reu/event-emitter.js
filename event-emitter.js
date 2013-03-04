function EventEmitter() {
}

EventEmitter.prototype.on = function(event, fn) {
  this.callbacks = this.callbacks || {};
  this.callbacks[event] = this.callbacks[event] || [];
  this.callbacks[event].push(fn);
  return this;
}

EventEmitter.prototype.emit = function(event) {
  var args = Array.prototype.slice.call(arguments, 1);
  var callbacks = this.listeners(event);
  var self = this;

  callbacks.forEach(function(callback) {
    callback.apply(self, args);
  })

  return this;
}

EventEmitter.prototype.trigger = EventEmitter.prototype.emit;

EventEmitter.prototype.listeners = function(event) {
  this.callbacks = this.callbacks || {};
  return this.callbacks[event] || [];
}

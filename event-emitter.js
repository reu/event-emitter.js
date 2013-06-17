(function() {
  function EventEmitter(object) {
    if (object) EventEmitter.mixin(object);
  }

  EventEmitter.mixin = function(object) {
    for (var key in EventEmitter.prototype) {
      object[key] = EventEmitter.prototype[key];
    }
  }

  EventEmitter.prototype.on = function(event, fn) {
    this.callbacks = this.callbacks || {};
    this.callbacks[event] = this.callbacks[event] || [];
    this.callbacks[event].push(fn);
    return this;
  }

  EventEmitter.prototype.emit = function(event) {
    var args = Array.prototype.slice.call(arguments, 1)
      , callbacks = this.listeners(event);

    for (var i = 0, length = callbacks.length; i < length; i++) {
      callbacks[i].apply(this, args);
    }

    return this;
  }

  EventEmitter.prototype.trigger = EventEmitter.prototype.emit;

  EventEmitter.prototype.listeners = function(event) {
    this.callbacks = this.callbacks || {};
    return this.callbacks[event] || [];
  }

  if (typeof module != "undefined" && module != null) module.exports.EventEmitter = EventEmitter;
  if (typeof window != "undefined" &&  window != null) window.EventEmitter = EventEmitter;
})();

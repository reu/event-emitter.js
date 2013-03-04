describe("EventEmitter", function() {
  describe("#on", function() {
    it("adds a callback to a event", function() {
      var emitter = new EventEmitter;
      var calls = [];

      emitter.on("greeting", function(value) {
        calls.push("hello", value);
      });

      emitter.on("greeting", function(value) {
        calls.push("hi", value);
      });

      emitter.on("goodbye", function(value) {
        calls.push("bye", value);
      });

      emitter.emit("greeting", "stranger");
      emitter.emit("goodbye", "friend");

      expect(calls).to.eql(["hello", "stranger", "hi", "stranger", "bye", "friend"]);
    })

    it("returns itself", function() {
      var emitter = new EventEmitter;
      expect(emitter.on("test")).to.be(emitter);
    })
  })

  describe("#emit", function() {
    it("sends an event to the listeners", function(done){
      var emitter = new EventEmitter;
      emitter.on("test", done);
      emitter.emit("test");
    })

    it("sends an event with arguments to the listeners", function(done){
      var emitter = new EventEmitter;
      emitter.on("test", function(arg) {
        expect(arg).to.be(1);
        done();
      });

      emitter.emit("test", 1);
    })

    it("allows to send events which doens't have callbacks", function() {
      var emitter = new EventEmitter;
      expect(function() {
        emitter.emit("test");
      }).to.not.throwException();
    })

    it("returns itself", function() {
      var emitter = new EventEmitter;
      expect(emitter.emit("test")).to.be(emitter);
    })
  })

  describe("#trigger", function() {
    it("is an alias for #emit", function() {
      var emitter = new EventEmitter;
      expect(emitter.emit).to.equal(emitter.trigger);
    })
  })

  describe("#listeners", function() {
    it("returns the list of callbacks associated with the informed event", function() {
      var emitter = new EventEmitter;
      expect(emitter.listeners("hello").length).to.be(0);
      emitter.on("hello", function() { return "Hello stranger" });
      expect(emitter.listeners("hello").length).to.be(1);
    })

    it("returns an empty array when there are no callbacks for an event", function() {
      var emitter = new EventEmitter;
      expect(emitter.listeners("hello").length).to.be(0);
    });
  })
})

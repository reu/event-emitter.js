build:
	@./node_modules/.bin/uglifyjs event-emitter.js -o event-emitter.min.js

test:
	@./node_modules/.bin/mocha --require ./test/expect.js ./test/common.js ./test/event-emitter.test.js

test-browser:
	@./node_modules/.bin/serve .

.PHONY: test

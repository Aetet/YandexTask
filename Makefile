REPORTER = nyan

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
        --reporter $(REPORTER) \
        --ui tdd

.PHONY: test 

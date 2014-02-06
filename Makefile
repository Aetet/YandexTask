REPORTER = nyan

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
        --reporter $(REPORTER) \
        --ui bdd

.PHONY: test 

#############
# Variables #
#############

# BABEL

BABEL ?= ./node_modules/.bin/babel


all:
	$(BABEL) --stage 0 -d lib/ src/ 

clean:
	rm lib/*.js

.PHONY: clean, all

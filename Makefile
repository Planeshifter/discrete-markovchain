#############
# Variables #
#############

# BABEL

BABEL ?= ./node_modules/.bin/babel


all:
	$(BABEL) -d lib/ src/

clean:
	rm lib/*.js

.PHONY: clean, all

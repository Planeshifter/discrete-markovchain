all:
	babel -d lib/ src/

clean:
	rm lib/*.js

.PHONY: clean, all

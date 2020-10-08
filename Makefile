CMDS = help build run

.PHONY: $(CMDS)

help:
	@echo Possible targets: $(CMDS)

all: build

# build vue static files
build:
	npm run build

run:
	npm run serve

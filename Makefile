GIT_DESCR = $(shell git describe --always)
# build output folder
OUTPUTFOLDER = dist
# docker image
DOCKER_REGISTRY = 166568770115.dkr.ecr.eu-central-1.amazonaws.com
DOCKER_IMAGE = aepp-explorer
DOCKER_TAG = $(shell git describe --always)
# node url used at build time
VUE_APP_NODE_URL=https://roma-net.mdw.aepps.com/
VUE_APP_NETWORK=Minerva

.PHONY: list
list:
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs

clean:
	@echo remove $(OUTPUTFOLDER) folder
	@rm -rf dist
	@echo done

build:
	@echo build release
	npm install && VUE_APP_NODE_URL='$(VUE_APP_NODE_URL)' npm run build
	@echo done

docker-build:
	@echo build image
	docker build --build-arg VUE_APP_NETWORK='$(VUE_APP_NETWORK)' --build-arg VUE_APP_NODE_URL='$(VUE_APP_NODE_URL)' -t $(DOCKER_IMAGE) -f Dockerfile .
	docker tag $(DOCKER_IMAGE) $(DOCKER_REGISTRY)/$(DOCKER_IMAGE):$(DOCKER_TAG)
	@echo done

docker-push:
	@echo push image
	docker push $(DOCKER_REGISTRY)/$(DOCKER_IMAGE):$(DOCKER_TAG)
	@echo done

debug-start:
	npm install && VUE_APP_NODE_URL='$(VUE_APP_NODE_URL)' npm run serve

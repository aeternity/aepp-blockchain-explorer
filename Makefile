GIT_DESCR = $(shell git describe --always)
# build output folder
OUTPUTFOLDER = dist
# docker image
DOCKER_REGISTRY = 166568770115.dkr.ecr.eu-central-1.amazonaws.com
DOCKER_IMAGE = aepp-explorer
DOCKER_TAG = $(shell git describe --always)
# epoch url used at build time
VUE_APP_EPOCH_URL='//sdk-testnet.aepps.com/'


.PHONY: list
list:
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs

clean:
	@echo remove $(OUTPUTFOLDER) folder
	@rm -rf dist
	@echo done

build:
	@echo build release
	npm install && VUE_APP_EPOCH_URL='$(VUE_APP_EPOCH_URL)' npm run build
	@echo done

docker-build: build
	@echo build image
	docker build -t $(DOCKER_IMAGE) -f Dockerfile .
  docker tag $(DOCKER_IMAGE) $(DOCKER_REGISTRY)/$(DOCKER_IMAGE):$(DOCKER_TAG)
	@echo done

docker-push:
	@echo push image
	docker push $(DOCKER_REGISTRY)/$(DOCKER_IMAGE):$(DOCKER_TAG)
	@echo done

debug-start:
	npm install && VUE_APP_EPOCH_URL='$(VUE_APP_EPOCH_URL)' npm run serve

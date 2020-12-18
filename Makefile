all: build

build:
	yarn
	yarn build

dev:
	yarn
	yarn start

build_image:
	docker build -t bquest/frontend .

run: build_image
	docker run --rm -p 8080:80 bquest/frontend

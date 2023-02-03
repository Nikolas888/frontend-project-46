lint:
	npx eslint .
lint --fix:
	npx eslint --fix .
install:
	npm ci
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

BABELNODE = node_modules/.bin/babel-node

build:
	docker-compose up -d
	npm install
	npx sequelize-cli db:migrate
	npx sequelize-cli db:seed:all

dev:
	node -r dotenv/config ${BABELNODE} index

lint:
	npx eslint ./src

lint-fix:
	npx eslint ./src --fix

test-integration:
	npx mocha --require dotenv/config --require @babel/register "./tests/**/*.integration.js"

test-unit:
	npx mocha --require dotenv/config --require @babel/register "./tests/**/*.unit.js"

test:
	make test-integration
	make test-unit

coverage:
	npx nyc make test

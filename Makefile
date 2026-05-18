.PHONY: down build up restart setup install test lint format clean

ps:
	@docker ps

cps:
	@docker-compose ps

logs:
	@echo "docker-compose logs -f"
	@docker-compose logs -f

down:
	@echo "docker-compose down"
	@echo "Stopping all services..."
	@docker-compose down

build:
	@echo "docker-compose build"
	@echo "Building Docker kiyanshih..."
	@docker-compose build

up:
	@echo "docker-compose up -d"
	@echo "Starting all services..."
	@docker-compose up -d

restart:
	@docker restart kiyanshih-frontend-frontend-1

bash:
	@docker exec -it kiyanshih-frontend-frontend-1 bash

images:
	@docker images

push:
	@docker push anower77/kiyanshih-frontend



all: down build up logs






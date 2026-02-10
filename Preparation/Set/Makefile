COMPOSE = docker compose --env-file .env -f ./compose.yml


.PHONY: up down ps logs health reset


build:
	$(COMPOSE) build

up:
	$(COMPOSE) up -d

run:
	docker exec -it nginx bash

down:
	$(COMPOSE) down

ps:
	$(COMPOSE) ps

logs:
	$(COMPOSE) logs -f --tail=100

health:
	@echo "== Containers (running) =="
	@docker ps
	@echo ""

reset:
	$(COMPOSE) down -v
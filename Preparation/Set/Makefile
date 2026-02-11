COMPOSE = docker compose --env-file .env -f ./compose.yml
GREEN = \033[0;32m
NC = \033[0m

.PHONY: up down ps logs health reset

all: build up

build:
	$(COMPOSE) build

up:
	$(COMPOSE) up -d
	@echo -n "${GREEN} Head to http://localhost:"
	@cat .env | grep NGINX_PORT | awk '{print $$3}' | tr -d '\n'
	@echo "/ to access the network ${NC}"

run:
	docker exec -it nginx bash

down:
	$(COMPOSE) down

ps:
	$(COMPOSE) ps

logs:
	$(COMPOSE) logs -f --tail=100

re: down all

health:
	@echo "== Containers (running) =="
	@docker ps
	@echo ""

reset:
	$(COMPOSE) down -v
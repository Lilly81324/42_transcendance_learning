COMPOSE = docker compose --env-file .env -f ./compose.yml
GREEN = \033[0;32m
RED = \033[0;31m
NC = \033[0m
NGINX_PORT := $(shell cat .env | grep NGINX_PORT | awk '{print $$3}' | tr -d '\n')
NESTJS_PORT := $(shell cat .env | grep NESTJS_PORT | awk '{print $$3}' | tr -d '\n')
NEXTJS_PORT := $(shell cat .env | grep NEXTJS_PORT | awk '{print $$3}' | tr -d '\n')

.PHONY: up down ps logs health reset

all: build up

build:
	$(COMPOSE) build

up:
	$(COMPOSE) up -d
	@echo -n "${GREEN} Head to http://localhost:${NGINX_PORT}/ to access the network ${NC}"

port:
	@echo ${NGINX_PORT}

dnginx:
	docker exec -it nginx bash

dnest:
	docker exec -it nestjs bash

dnext:
	docker exec -it nextjs bash

down:
	$(COMPOSE) down

ps:
	$(COMPOSE) ps

logs:
	$(COMPOSE) logs -f --tail=100

re: down all

health:
	./healthreport.sh

reset:
	$(COMPOSE) down -v
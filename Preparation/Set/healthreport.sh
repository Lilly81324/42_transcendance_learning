#!/bin/bash
NGINX_PORT="$(cat .env | grep NGINX_PORT | awk '{print $3}' | tr -d '\n')"
NESTJS_PORT="$(cat .env | grep NESTJS_PORT | awk '{print $3}' | tr -d '\n')"
NEXTJS_PORT="$(cat .env | grep NEXTJS_PORT | awk '{print $3}' | tr -d '\n')"
GREEN='\033[0;32m'
NC='\033[0m'
RED='\033[0;31m'
RESULT="1"

echo
echo "====================================="
echo "============Port Choices============="
echo "====================================="

echo "Nginx:  ${NGINX_PORT}
NestJs: ${NESTJS_PORT}
NextJs: ${NEXTJS_PORT}"



echo
echo "====================================="
echo "==========Container Status==========="
echo "====================================="

SERVICE_COUNT="$(docker compose --env-file .env -f ./compose.yml ps --format 'table {{.Names}} | {{.Status}}' | grep -E 'nest|next|nginx' | wc -l)"
if [ ${SERVICE_COUNT} = '3' ]; then \
	echo -e "${GREEN}✔  Found all services ${NC}"; \
else \
	echo -e "${RED}✘  Missing $((3 - ${SERVICE_COUNT})) Services ${NC}"; \
	echo "Currently active services:"
	echo -e "NAME   | STATUS\n---------------"
	docker compose --env-file .env -f ./compose.yml ps --format "{{.Names}} | {{.Status}}"
	RESULT="0"
fi



echo
echo "====================================="
echo "========Service Health Report========"
echo "====================================="

if [ "$(docker exec nginx curl -s http://localhost:${NGINX_PORT}/health)" = '{"status":"UP"}' ]; then
	echo -e "${GREEN}✔  Nginx Server is running${NC}";
else
	echo -e "${RED}✘  Nginx Server cant be reached${NC}";
	RESULT="0"
fi

if [ "$(docker exec nestjs curl -s http://localhost:${NESTJS_PORT}/health)" = 'status: up' ]; then
	echo -e "${GREEN}✔  NestJs Server is running${NC}";
else
	echo -e "${RED}✘  NestJs Server cant be reached${NC}";
	RESULT="0"
fi

if [ "$(docker exec nextjs curl -s -o /dev/null -w "%{http_code}" http://localhost:${NEXTJS_PORT})" = '200' ]; then
	echo -e "${GREEN}✔  NextJs Homepage is healthy ${NC}";
else
	echo -e "${RED}✘  NextJs Homepage cant be reached${NC}";
	RESULT="0"
fi



echo
echo "====================================="
echo "===========Website Status============"
echo "====================================="

if [ "$(curl -s -o /dev/null -w "%{http_code}" http://localhost:${NGINX_PORT})" = '200' ]; then
	echo -e "${GREEN}✔  Website is reachable ${NC}";
else
	echo -e "${RED}✘  Website is unreachable ${NC}";
	curl http://localhost:${NGINX_PORT}
	RESULT="0"
fi




echo
echo "====================================="
echo "===============RESULT================"
echo "====================================="

if [ ${RESULT} = '1' ]; then \
	echo -e "${GREEN}✔  Everything is fully operational${NC}";
else
	echo -e "${RED}✘  An Error has occured${NC}";
fi
echo
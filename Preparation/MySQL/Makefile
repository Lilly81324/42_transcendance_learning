# \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# Variables and Definitions													  |
# /////////////////////////////////////////////////////////////////////////////

# Colors for echo
PURPLE				= \033[1;35m	# Purple color
BROWN				= \033[0;33m	# Brown color
GREEN				= \033[0;32m	# Green color
RED					= \033[0;31m	# Red color
NC					= \033[0m		# No color

# File structures
# CHANGE THIS PATH    ↓       ↓        ↓
VOLUME_DIR          = /home/sikunne/data
MDB_VOL				= $(VOLUME_DIR)/mariadb
VOLUMES				= $(MDB_VOL)
COMPOSE_PATH_FLAGS	= -f ./docker-compose.yml #--progress=plain

# Shortcuts
DOCKER =				docker compose $(COMPOSE_PATH_FLAGS)



# \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# Rules for creating required files											  |
# /////////////////////////////////////////////////////////////////////////////

# Create Volume files
$(VOLUME_DIR)%:
	@echo "$(PURPLE)Transcendance: $(GREEN)Creating Volume folder $@$(NC)"
	mkdir -p $@



# \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# Commands for compiling, running and cleaning the project					  |
# /////////////////////////////////////////////////////////////////////////////

# Composes Dockers, if no Images exist
all: $(VOLUMES)
	make build
	make run

# Builds all Images
build: $(VOLUMES)
	@$(DOCKER) build
	@echo "$(PURPLE)Transcendance: $(GREEN)Built Transcendance Images$(NC)"

# Launches all Containers as background processes
run: $(VOLUMES)
	@$(DOCKER) up -d
	@echo "$(PURPLE)Transcendance: $(GREEN)Started all Containers$(NC)"

# Show all currently running Inception Containers
show:
	@echo "$(PURPLE)Transcendance: $(GREEN)Listing all running services:$(NC)"
	@$(DOCKER) ps


# Builds without caching
rebuild: $(VOLUMES)
	@$(DOCKER) build --no-cache


# Stops all services, if any are running
stop:
	@$(DOCKER) stop
	@echo "$(PURPLE)Transcendance: $(GREEN)Stopped Containers$(NC)"


# Removes Containers, stopping any running ones
clean: stop
	$(DOCKER) rm --force --stop
	@echo "$(PURPLE)Transcendance: $(GREEN)Deleted Containers$(NC)"


# Deletes Images and Volumes, stopping and deleting running Containers
fclean: clean
	$(DOCKER) down --rmi all --volumes
	rm -rf $(VOLUMES)


# Rebuild the Containers
re: fclean build


# Rebuild and run the Containers
rerun: re run

# Displays helpfull info
help:
	@echo "$(PURPLE)Transcendance:$(NC)"
	@echo "$(BROWN)    make         : $(NC)Build Images by running the docker-compose.yml"
	@echo "$(BROWN)    make build   : $(NC)Same as 'make'"
	@echo "$(BROWN)    make show    : $(NC)To display all the Containers currently running"
	@echo "$(BROWN)    make rebuild : $(NC)Build Images without caching (slow)"
	@echo "$(BROWN)    make stop    : $(NC)Stops all Containers"
	@echo "$(BROWN)    make clean   : $(NC)Stops and deletes all Containers"
	@echo "$(BROWN)    make fclean  : $(NC)Stops and deletes all Containers, Images and Volumes"
	@echo "$(BROWN)    make re  	: $(NC)Force Cleans and then builds again"
	@echo "$(BROWN)    make rerun  	: $(NC)Force Cleans, Builds and runs"
	@echo -n "$(NC)"

# For messages, write
# echo "$(PURPLE)Inception: $(...)...$(NC)"
# Purple = 	Inceptions name only!
# Green = 	positive feedback
# Brown =	Neutral feedback
# Red = 	negative feedback

.PHONY: all show run build rebuild stop clean fclean re rerun help
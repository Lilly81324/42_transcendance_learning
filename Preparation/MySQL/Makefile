NAME = csql

CC = c++
CFLAGS = -Wall -Wextra -Werror #-std=c++98

OBJ_FOLDER = ./obj/
SRC = main.cpp
RAW_OBJ = $(SRC:%.cpp=%.o)
OBJ = $(addprefix $(OBJ_FOLDER), $(RAW_OBJ))

all: $(NAME)

show:
	@echo $(SRC)
	@echo $(RAW_OBJ)
	@echo $(OBJ)

$(NAME): $(OBJ)
	$(CC) $(CFLAGS) $< -o $@

$(OBJ_FOLDER)%.o: %.cpp | $(OBJ_FOLDER)
	$(CC) $(CFLAGS) -c $< -o $@

$(OBJ_FOLDER):
	mkdir $(OBJ_FOLDER)

clean:
	rm -rf $(OBJ_FOLDER)

fclean: clean
	rm -f $(NAME)

re: fclean all

.PHONY: all show clean fclean re

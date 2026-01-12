FROM debian:bookworm-20251117-slim

# Check for updates
RUN apt update

# Install MariaDB 
RUN apt install -y mariadb-server gettext-base systemd python3 python-is-python3 python3.11-venv

WORKDIR /var/simple

COPY . .

# Set config for Mariadb
RUN cat ./conf/new.cnf > /etc/mysql/mariadb.conf.d/50-server.cnf

RUN mkdir -p /run/mysqld

RUN chown -R mysql:mysql /run/mysqld

RUN mkdir my_project

RUN cd my_project

RUN python -m venv env

# Activate the virtual environment and run the script
RUN bash -c "source env/bin/activate && python3 ./my_project/env/sql.py"

# Move the SQL file to the desired location
RUN mv ./tools/sql.py ./my_project/env/sql.py

CMD ["./tools/run.sh"]
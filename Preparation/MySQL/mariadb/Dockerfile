FROM debian:bookworm-20251117-slim

# Check for updates
RUN apt update

# Install MariaDB 
RUN apt install -y mariadb-server gettext-base systemd python3 python3-pip

WORKDIR /var/simple

COPY . .

# Set config for Mariadb
RUN cat ./conf/new.cnf > /etc/mysql/mariadb.conf.d/50-server.cnf

RUN mkdir -p /run/mysqld

RUN chown -R mysql:mysql /run/mysqld

WORKDIR /var/simple

RUN pip3 install mysql-connector --break-system-packages

# Activate the virtual environment and run the script
# RUN bash -c "source env/bin/activate && python3 ./my_project/env/sql.py"

CMD ["./tools/run.sh"]
# source ./my_project/env/bin/activate
# pip install mysql-connector-python
# pip install mysql-connector-python --upgrade
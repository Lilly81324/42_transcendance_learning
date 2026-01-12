#!/bin/bash

# Must be run after Image Creation, as Volumes overwrite created folders
chown -R mysql:mysql /var/lib/mysql

mysqld --init-file=/var/simple/tools/init.sql
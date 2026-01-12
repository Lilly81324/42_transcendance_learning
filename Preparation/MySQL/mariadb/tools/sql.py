import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  database='transDB',
  user="user42",
  password="123"
)

TABLES = {}

TABLES['users'] = (
        "CREATE TABLE `users` ("
        "  `id` INT NOT NULL AUTO_INCREMENT,"
        "  `name` VARCHAR(30) NOT NULL,"
        "  `password` LONGTEXT NULL,"
        "  PRIMARY KEY (`id`));")

mydb.cursor().execute(TABLES['users'])
print(mydb.users) 

mydb.close()
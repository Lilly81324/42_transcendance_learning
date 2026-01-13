import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  database='transDB',
  user="user42",
  password="123"
)

cursor = mydb.cursor()

TABLES = {}

TABLES['users'] = (
        "CREATE TABLE `users` ("
        "  `id` INT NOT NULL AUTO_INCREMENT,"
        "  `name` VARCHAR(30) NOT NULL,"
        "  `password` LONGTEXT NULL,"
        "  PRIMARY KEY (`id`));")

cursor.execute(TABLES['users'])
mydb.commit()
cursor.execute("INSERT INTO transDB.users (name, password) VALUES ('Lilly', 'Passwd123');")
mydb.commit()
cursor.execute("SELECT * from transDB.users;")
rows = cursor.fetchall()
for row in rows:
    print(row)

mydb.close()
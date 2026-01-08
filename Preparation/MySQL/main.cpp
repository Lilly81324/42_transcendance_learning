#include <iostream>
#include "./include/mysqlx/xdevapi.h"

int main(int argc, char **argv)
{
	const char *url = (argc > 1 ? argv[1] : "mysqlx://root:pwd123@127.0.0.1");
	std::cout << "Hello World" << std::endl;
	mysqlx::Session sess(url);
	mysqlx::Schema sch = sess.createSchema("test", true);
	mysqlx::Collection coll = sch.createCollection("c1", true);
	coll.remove("true").execute();
	coll.add("({ \"name\": \"foo\", \"age\": 1})").execute();
	return (0);
}
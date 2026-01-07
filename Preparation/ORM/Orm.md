ORM (Object relational mapping) is a method of bridging the differences between data storage in a database and data in an object-oriented programming language.


For example, when you are working with a "Person" object,
which has different attributes, you might add a function,
which implements the storage of said object into a database.
It would try to find the given table, 
and then add or update the entry for that Person.
This would be usefull for something like "unloading" an object,
by taking it out of memory and storing it on disk.

More complex information would be dependent on implementation,
so largely based on whatever language and database you are using.

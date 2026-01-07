A Transaction is a singular Request consisting of likely multiple Operations.

A good way of thinking about it, is through the example of sending money through a bank.
The whole process is 1 Transaction, however, it holds multiple Operations:
1) Check if Sender is in Database
2) Check if Recipient is in Database
3) Check if Sender has enough money to send
4) Check if Recipient can accept money
5) Subtract Senders money
6) Add Senders money to Recipient

In a realistic scenario this would be handled like this:
1) The Request comes into a webserver running a program.
2) The Request is translated into an Object in memory.
3) The Object requests to a locking process, 
4) asking for locks on the Senders and Recipients money.
5) The Object uses an ORM style function to interact with the database.
6) It stores the previous values in memory of the money count.
7) It changes both amounts of money,
   in case of failure setting them both back to their original values.
8) The Object requests the locking process release the lock on the values.
9) Feedback is given back to the Sender of the Request,
   about the status of the Interaction.

During each step, all operations must meet ACID criteria.
The program uses ORM style interactions between object oriented programming and the database
The functions used by the program are one of the CRUD operations.
Interactions with the database use database-index-optimization,
to be done in reasonable time.

Any Transaction with a database is done using a Database Migration Script.

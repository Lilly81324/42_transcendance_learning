ACID (Atomicity, Consistency, Isolation, Durability) is an acronym for a method,
about working with databases.

1) Atomicity
Either all Operations in a transaction suceed, or none do.
Think of replacing the first 10 instances of "the" in a text file.
If there are only 9 or less instances, then none of the text will be overwritten.
One Operation failed, so none are allowed to suceed.
The Operation is either cancelled, or the target is rerolled back to its original state.
There are 2 outcomes whenever a transaction comes in:
Either ALL Operations have suceeded,
or nothing was changed.
Example:
Think of a bank transfer. 
If the recipient doesnt have the required money, no money should be added or reduced.
If the sender may not accept the money, then the recipient may not have their money reduced.
Only if money could be taken, transferred and granted, may the account balances change.

2) Consistency
Ensure, that all the data touched by a transaction is valid.
No using it to overwrite a numerical value with an 'A' or something illegal.
Rules must be upheld, or the Operation should be marked as failed.
Example:
Think of a mathematical operation.
Lets say we may only store numbers from 0-100, and the user wants to add 10.
If we concurrently run the Addition and a Check for Validity,
should the check run first, and the Addition second, the maximum limit may be exceeded.
Starting value: 99
Checked: 0 <= 99 <= 100  true
Add 10: 99 + 10 = 109    true
All operations happen correctly,
but the race condition messed up the ordering, which resulted in wrong logic.

3) Isolation
Even if Transactions run concurrently, they may not interfere with each other.
The end result should be the same as if they were run sequqntally, only faster.
This stops the occurence of race conditions, ensuring predictable results.

4) Durability
A succesfully completed transaction must stay comitted.
Crashes, shutdowns or memory shenanigans may not change the result.
As such, data may logically not be stored in memory and must be stored on disk,
always properly closed.

Ways to implement ACID:
Two-phase locking:
This has to be done non-concurrently.
A Request to read or write data first asks a singular locking process,
to lock data for it.
Once that process has given the Requester the lock with positive feedback,
the Requester may read or write the specified data.
Once the Requester has finished its transaction, it tells the locking process to release the lock on this data.
Example:
Think of a public restroom.
A client wants to use the bathroom, 
but also want to reserve the 2 adjacents stalls for privcy.
They go tell the guard responsible for locking the stalls, 
which locks they want to acquire.
They wait until the guard gives them the go-ahead, then using the stalls.
Once they are finished, they tell the guard to unlock their reserved stalls.
(Honestly this example sounded much better in my head)

Optimization:
You can improve on Two-Phase locking, by allowing multiple reads at the same time.
There is no downside to 20 people reading a book at the same time,
however with the current system this is disallowed.
So one might implement independent read- and write-locks.
A Client that wants to read only uses read locks,
while a client that wants to write sets a write lock AND a read lock.
If a Client wants to write, they may only do so, if there is no one reading.
Aquire write lock --only if--> No read locks
If a Client wants to read, they may only do so if no write lock is active
Aquire read lock --only if--> No write lock
If a Client wants to write, they may only do so if no write lock is active
Aquire write lock --only if--> No write lock
However, reading when there is only a read lock is allowed
----------------------------------
Lock type 	read-lock 	write-lock
read-lock 		✔ 			X
write-lock 		X 			X

Caviats:
It is possible, that if 
Client A sends a Request for locking B1, 
then Client B sends a Request for locking B1,
then Client B sends a Request for locking A1,
then Client A sends a Request for locking A1
a deadlock will ensue.
(Provided each Client requests both in one Operation)
This is because A will reserve Bs Content,
and then try to acces its own.
While B does the same.
Neither may finish until they have aquired the locks for all their operations,
because of Isolation.
One way to precent Deadlocks is "Conservative two-phase locking".
Essentially, one Client gets all the locks for its Operations at once,
only allowing other clients once it has aquired all its locks.
It isnt the fastest, but the safest

One must however, be carefull, if a Client sends a big enough write Request,
it will lock all content and not allow other Clients to do anything.

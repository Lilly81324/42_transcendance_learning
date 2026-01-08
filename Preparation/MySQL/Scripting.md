In order to interact with a live codebase, without having to take it down every time,
we use something called "Migration Scripts".

Theese are either "up" or "down" scripts.

An "up" script includes the change you want to perform on the db.
The "down" script is some way of undoing whatever the up script has done.

Up-Scripts have to be written with reversibility ahead of time.
Either you say "Ah, sod it" and dont include reversibility,
which might sometimes be required, although it is not advised.
Or you think ahead of time, how you can make sure, 
that your Down-Script only undoes EXACTLY, what the Up-Script changed.

Dont rely on timestamps, order, limit
If you cannot ensure Perfect Accuracy, dont write a down.

Examples:
Adding a Row
The Up Script needs to include some sort of unique identifier,
by which you can identify the specific row.
Going by values only brings you so far, since some values might appear twice.
The best way would be to include a unique identifier.
For example: Timestamp_Action_Number
Timestamp: The Data today
Action: The type of action that is done, or maybe the script name
Number: An increasing count of the actions dPleaone that day
(Maybe even specifically how may of the certain Action)
Or just add an ever increasing counter somehow.

Adding a Table:
As long as the table is new, the down script can just delete said table.

| Type of migration      | Down strategy                 |
| ---------------------- | ----------------------------- |
| Add table/column/index | Drop it                       |
| Rename column          | Rename back                   |
| Insert seed data       | Delete by tag/ID              |
| Update data            | Usually irreversible          |
| Delete data            | Irreversible unless backed up |
(Source: ChatGPT)
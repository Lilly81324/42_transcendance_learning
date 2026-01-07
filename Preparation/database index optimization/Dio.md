A Database Index is a data structure, 
allowing for quicker acces of requested data.
It holds key-value pair(s) for identifying,
as well as a pointer to the data it is referencing.

Sources:
https://medium.com/@ranjithp27122003/database-indexing-and-b-trees-a-complete-guide-3354d9f76337

Use Case:
When indexing multiple tables at the same time,
a simple Index Entry may link all the data for that process the next time its called.

Types:
Balanced Trees
Hash Indexes

Balanced Trees:
Say you are looking for the hours that Mary has spent at the company.
You can use the other information you know of Mary to facilitate the search.
Name	Branch	Salary	Hours
Mary	IT		9000	?

First, you would go through the node that checks the branch.
So you would have a data structure that keeps a reference to the table of all employees,
which would help you increase your search speed by a lot.

Alternaticely, it could also link to a data structure,
keeping track of references to employees of carying salaries.

Query -> Branch -> Salary -> List of all It workers that make 9k

This is done by using index lists created by MySql like this:
(For the table <table_name> create an index called <idx_category>,
 by splitting based on the <category> field)
CREATE INDEX <idx_category> ON <table_name>(<category>);
(The <> should not be included in the actual command and are just part of the placeholder)

You can also have multiple categories for an index list like this:
CREATE INDEX <idx_category_price> ON <table_name>(<category>, <category_2>);


What makes a good category:
Having very few values is horrible. If you split up everything based on the value being true / false, you just end up creating 2 tables.
Having very many values is horrible as well. Imagine making an index category for each enty.
Congratulations, you just doubled your memory cost and have the same speed as if you werent indexing.
So the goal is to go for a middle ground.
You should try to strive for as many different categories, as there are entries per category.
So if you have 4 categories, each category should hold close to 4 entries.
Going back to the example of a table entry with Name, Branch, Salary and Hours.
Name: Too many different values, not worth indexing
Branch: Good Amount of different values, great index category
Salary: May have good overlap between different worker, okay index category
Hours: Likely updated a lot, and highly unique, terrible index category
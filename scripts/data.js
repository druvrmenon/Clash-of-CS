// Mock Data mirroring the PDF contents conceptually
const mockModules = [
    {
        id: 'networks',
        title: 'Computer Networks',
        description: 'Topology, Models, and Protocols',
        icon: 'network',
        questionCount: 5,
        questions: [
            {
                text: "Which topology requires a central controller or hub?",
                options: ["Star", "Mesh", "Ring", "Bus"],
                correctAnswer: 0,
                explanation: "Star topology connects all devices to a central hub."
            },
            {
                text: "Which layer of the OSI model handles logical addressing?",
                options: ["Physical", "Data Link", "Network", "Transport"],
                correctAnswer: 2,
                explanation: "The Network layer uses IP addresses for logical addressing."
            },
            {
                text: "What does HTTP stand for?",
                options: ["HyperText Transfer Protocol", "HyperText Terminal Protocol", "HighText Transfer Protocol", "HyperText Transmission Protocol"],
                correctAnswer: 0,
                explanation: "HTTP is HyperText Transfer Protocol."
            },
            {
                text: "Which protocol is used to send email?",
                options: ["POP3", "IMAP", "SMTP", "FTP"],
                correctAnswer: 2,
                explanation: "Simple Mail Transfer Protocol (SMTP) is used to send email."
            },
            {
                text: "How long is an IPv4 address?",
                options: ["16 bits", "32 bits", "64 bits", "128 bits"],
                correctAnswer: 1,
                explanation: "An IPv4 address is 32 bits long."
            }
        ]
    },
    {
        id: 'db',
        title: 'Database Concepts',
        description: 'SQL, Relational Algebra, and Normalization',
        icon: 'database',
        questionCount: 4,
        questions: [
            {
                text: "Which SQL constraint ensures all values in a column are entirely unique?",
                options: ["NOT NULL", "UNIQUE", "CHECK", "DEFAULT"],
                correctAnswer: 1,
                explanation: "UNIQUE ensures all values in a column are distinct."
            },
            {
                text: "A foreign key is used for what purpose?",
                options: ["To speed up queries", "To link two tables together", "To encrypt data", "To enforce non-null values"],
                correctAnswer: 1,
                explanation: "Foreign keys link rows across different tables."
            },
            {
                text: "Which SQL command is used to remove a table?",
                options: ["DELETE", "REMOVE", "DROP", "TRUNCATE"],
                correctAnswer: 2,
                explanation: "DROP TABLE permanently deletes the table schema and data."
            },
            {
                text: "What does ACID stand for in databases?",
                options: ["Atomicity, Consistency, Isolation, Durability", "Accuracy, Consistency, Interaction, Data", "Automated, Consistent, Isolated, Distributed", "None of these"],
                correctAnswer: 0,
                explanation: "ACID properties ensure reliable processing of DB transactions."
            }
        ]
    },
    {
        id: 'python_stack',
        title: 'Stack & Data Structures',
        description: 'LIFO, Push/Pop operations in Python',
        icon: 'layers',
        questionCount: 4,
        questions: [
            {
                text: "Which principle does a Stack follow?",
                options: ["FIFO", "LIFO", "FILO", "Both 2 and 3"],
                correctAnswer: 3,
                explanation: "Stack is Last In First Out (LIFO), which is equivalent to First In Last Out (FILO)."
            },
            {
                text: "Inserting an element into a stack is called:",
                options: ["Insert", "Add", "Push", "Append"],
                correctAnswer: 2,
                explanation: "The operation to insert into a stack is termed 'Push'."
            },
            {
                text: "If you call pop() on an empty list in Python, what happens?",
                options: ["Returns None", "Returns []", "IndexError", "ValueError"],
                correctAnswer: 2,
                explanation: "Python raises an IndexError: pop from empty list."
            },
            {
                text: "In Python, which built-in data type is commonly used to implement a stack?",
                options: ["Tuple", "Set", "Dictionary", "List"],
                correctAnswer: 3,
                explanation: "Lists are used as stacks using append() and pop()."
            }
        ]
    },
    {
        id: 'sample_papers',
        title: 'CS Sample Papers (Mixed)',
        description: 'Full Mock test based on CBSE pattern',
        icon: 'file-text',
        questionCount: 3,
        questions: [
            {
                text: "Which of the following creates a tuple with a single element in Python?",
                options: ["t = (1)", "t = [1]", "t = 1,", "t = {1}"],
                correctAnswer: 2,
                explanation: "A comma is required to define a single-element tuple: t = 1, or t = (1,)."
            },
            {
                text: "In CSV file handling, which module must be imported?",
                options: ["file", "csv", "sys", "os"],
                correctAnswer: 1,
                explanation: "The built-in 'csv' module handles read/write for CSV."
            },
            {
                text: "Which method is used to read all lines from a text file into a list?",
                options: ["read()", "readlines()", "readline()", "ReadAll()"],
                correctAnswer: 1,
                explanation: "readlines() returns a list containing all the lines."
            }
        ]
    },
    {
        id: 'python_advanced',
        title: 'Python Advanced Concepts',
        description: 'Dictionary, Sets, and Exception Handling',
        icon: 'code-2',
        questionCount: 4,
        questions: [
            {
                text: "Which method removes all elements from a dictionary?",
                options: ["clear()", "remove()", "del", "pop()"],
                correctAnswer: 0,
                explanation: "dict.clear() removes all items from the dictionary."
            },
            {
                text: "What is the result of set([1, 2, 2, 3])?",
                options: ["{1, 2, 2, 3}", "{1, 2, 3}", "[1, 2, 3]", "(1, 2, 3)"],
                correctAnswer: 1,
                explanation: "Sets in Python automatically remove duplicate elements."
            },
            {
                text: "Which block in exception handling is always executed?",
                options: ["try", "except", "finally", "else"],
                correctAnswer: 2,
                explanation: "The 'finally' block executes regardless of whether an exception occurred."
            },
            {
                text: "Which of these is immutable?",
                options: ["List", "Dictionary", "Set", "Tuple"],
                correctAnswer: 3,
                explanation: "Tuples cannot be changed after creation."
            }
        ]
    },
    {
        id: 'dbms_fundamentals',
        title: 'Database Management Basics',
        description: 'DBMS concepts, keys, and schema definitions.',
        icon: 'database',
        questionCount: 20,
        questions: [
            { text: "A data ________ is a restriction or limitation to ensure accuracy and reliability of data in database", options: ["Constraint", "Dictionary", "Query", "None of these"], correctAnswer: 0, explanation: "Constraints restrict the data that can be inserted into tables." },
            { text: "A _________ is a type of command that retrieves data from a database on a server", options: ["Constraint", "Dictionary", "Query", "None of these"], correctAnswer: 2, explanation: "A query requests data." },
            { text: "RDBMS stands for", options: ["Relational Database Management System", "Rotational Database Management System", "Reliable Database Management System", "None of these"], correctAnswer: 0, explanation: "RDBMS manages relational databases." },
            { text: "An attribute or set of attributes that is used to uniquely identify a record in a database table is called", options: ["A primary key", "An identifier", "A tuple", "None of the above"], correctAnswer: 0, explanation: "Primary keys are unique identifiers." },
            { text: "A primary key consisting of more than one attribute is called", options: ["Composite Primary Key", "Foreign Key", "Alternate Key", "None of these"], correctAnswer: 0, explanation: "Composite keys use multiple attributes." },
            { text: "Each row of data in a relation(table) is called", options: ["attribute", "tuple", "domain", "None of these"], correctAnswer: 1, explanation: "Rows are called tuples." },
            { text: "Column headings in a relation are referred as", options: ["attributes", "tuples", "domains", "None of these"], correctAnswer: 0, explanation: "Columns are attributes." },
            { text: "______________ is a set of values from which an attribute can take a value in each row", options: ["Attribute", "Tuple", "Domain", "None of these"], correctAnswer: 2, explanation: "The Domain is the domain of permitted values." },
            { text: "The number of attributes in a relation is called the ___________ of the relation", options: ["Degree", "Cardinality", "Domain", "None of these"], correctAnswer: 0, explanation: "Degree = Number of columns (attributes)." },
            { text: "The number of tuples in a relation is called the ___________ of the relation", options: ["Degree", "Cardinality", "Domain", "None of these"], correctAnswer: 1, explanation: "Cardinality = Number of rows (tuples)." },
            { text: "A _________ is used to represent the relationship between two relations.", options: ["Composite Key", "Foreign Key", "Alternate Key", "None of these"], correctAnswer: 1, explanation: "Foreign keys link tables." },
            { text: "An attribute or set of attributes that can be served as a primary key of a relation is called", options: ["Service Key", "Foreign Key", "Candidate Key", "None of these"], correctAnswer: 2, explanation: "Candidate keys are eligible to be primary." },
            { text: "A candidate key that is not the primary key is called", options: ["Composite Key", "Foreign Key", "Alternate Key", "None of these"], correctAnswer: 2, explanation: "Alternate keys are the leftover candidate keys." },
            { text: "In relational model, tables are called", options: ["Domains", "Relations", "Tuples", "None of these"], correctAnswer: 1, explanation: "Tables = Relations." },
            { text: "___________ can take NULL values in it", options: ["Primary Key", "Foreign Key", "Both Primary Key and Foreign Key", "None of these"], correctAnswer: 1, explanation: "Foreign keys can be NULL." },
            { text: "A relational database consists of a collection of", options: ["Tables", "Fields", "Records", "Keys"], correctAnswer: 0, explanation: "RDBMS contains structured tables." },
            { text: "The term _________ is used to refer to a record in a table.", options: ["Attribute", "Tuple", "Field", "Instance"], correctAnswer: 1, explanation: "Tuple = Record." },
            { text: "Which of the following attributes cannot be considered as a choice for primary key?", options: ["Id", "License Number", "Dept_Id", "Street"], correctAnswer: 3, explanation: "Street is not unique." },
            { text: "An attribute in a relation is a foreign key if it is the ___________ key in any other relation.", options: ["Candidate", "Primary", "Super", "Sub"], correctAnswer: 1, explanation: "Foreign key references Primary key." },
            { text: "Which of the following is commonly used to define the overall design of the database?", options: ["Application program", "Data definition language", "Schema", "Source code"], correctAnswer: 2, explanation: "The Schema defines the structure." }
        ]
    },
    {
        id: 'sql_queries',
        title: 'SQL Querying & Commands',
        description: 'SQL Syntax, Operators, and DDL/DML.',
        icon: 'code',
        questionCount: 20,
        questions: [
            { text: "The term SQL stands for", options: ["Standard query language", "Sequential query language", "Structured query language", "Server-side query language"], correctAnswer: 2, explanation: "SQL = Structured Query Language." },
            { text: "Which of the following data type will be suitable for storing the name of students?", options: ["int", "varchar(n)", "char", "None of the above"], correctAnswer: 1, explanation: "varchar(n) stores variable-length strings like names." },
            { text: "What is the format used for storing date using date datatype?", options: ["dd-mm-yy", "dd-mm-yyyy", "mm-dd-yyyy", "yyyy-mm-dd"], correctAnswer: 3, explanation: "MySQL stores dates in yyyy-mm-dd format." },
            { text: "Which of the following constraints can be used if we don\u2019t want user to leave the field blank?", options: ["NULL", "not null", "Unassigned", "unique key"], correctAnswer: 1, explanation: "NOT NULL prevents empty values." },
            { text: "Which of the following is NOT a DML command?", options: ["SELECT", "DELETE", "UPDATE", "DROP"], correctAnswer: 3, explanation: "DROP is a DDL command." },
            { text: "Identify the correct sql command which is expected to delete all rows of a table TEMP without deleting its structure ?", options: ["DELETE TABLE TEMP;", "DROP TABLE TEMP;", "REMOVE TABLE TEMP;", "DELETE FROM TEMP;"], correctAnswer: 3, explanation: "DELETE FROM removes rows but keeps structure." },
            { text: "....... command helps to fetch data from relation.", options: ["Use", "Show", "Fetch", "Select"], correctAnswer: 3, explanation: "SELECT retrieves table data." },
            { text: "....... command helps to open the database for use.", options: ["Use", "Open", "Distinct", "Select"], correctAnswer: 0, explanation: "USE database_name." },
            { text: "If you want to add a new column in an existing table, which command is used?", options: ["ALTER table emp ADD (bonus Integer);", "CHANGE table emp ADD bonus int;", "ALTER table emp ADD bonus int;", "UPDATE table emp ADD bonus int;"], correctAnswer: 2, explanation: "ALTER TABLE is used to add columns." },
            { text: "Which is the subset of SQL commands used to manipulate database structure including tables?", options: ["Data Definition Language (DDL)", "Data Manipulation Language (DML)", "Both (a) and (b)", "None"], correctAnswer: 0, explanation: "DDL changes table structures." },
            { text: "Which command we use to create a database in MySQL.", options: ["Select database from MySQL;", "Create database databasename;", "Use databasename;", "Update database;"], correctAnswer: 1, explanation: "CREATE DATABASE database_name." },
            { text: "Which among the following is the correct syntax for creating tables?", options: ["CREATE TABLE name;", "CREATE name;", "CREATE TABLE", "All of the mentioned"], correctAnswer: 0, explanation: "CREATE TABLE is the start of the command." },
            { text: "Which command shows the table structure of table emp?", options: ["Select * from emp;", "Show all from emp;", "Desc emp;", "Drop emp;"], correctAnswer: 2, explanation: "DESC table_name shows fields and types." },
            { text: "Which operator checks column for non existence of data?", options: ["NOT Operator", "Exists Operator", "IS NULL Operator", "None of the above"], correctAnswer: 2, explanation: "IS NULL checks if field has no value." },
            { text: "If we have not specified ASC or DESC after a SQL ORDER BY clause, the following is used by default", options: ["DESC", "ASC", "There is no default value", "None of the mentioned"], correctAnswer: 1, explanation: "Ascending order is the default." },
            { text: "The SQL keyword(s) ________ is used with wildcards.", options: ["LIKE only", "IN only", "NOT IN only", "IN and NOT IN"], correctAnswer: 0, explanation: "LIKE is used with % and _." },
            { text: "Which SQL function is used to count the number of rows in a SQL query?", options: ["COUNT ()", "NUMBER ()", "SUM ()", "COUNT (*)"], correctAnswer: 3, explanation: "COUNT(*) returns total rows." },
            { text: "Which of the following group functions ignore NULL values?", options: ["MAX", "COUNT", "SUM", "All of the above"], correctAnswer: 3, explanation: "Aggregate functions ignore NULL values." },
            { text: "Consider the following SQL statement. What type is this ? DROP TABLE items;", options: ["DML", "DDL", "DCL", "TCL"], correctAnswer: 1, explanation: "DROP is part of Data Definition Language." },
            { text: "Which constraint ensures all values in a column are distinct?", options: ["PRIMARY KEY", "UNIQUE", "NOT NULL", "CHECK"], correctAnswer: 1, explanation: "UNIQUE constraint prevents duplicates." }
        ]
    },
    {
        id: 'python_mysql_interface',
        title: 'Interface of Python with MySQL',
        description: 'Cursors, Execute, and Fetching methods.',
        icon: 'database',
        questionCount: 20,
        questions: [
            { text: "Which my sql driver you need to install for connection of Python With MYSQL", options: ["mysql-connector", "mysql.connector", "mysql-connect", "All of the above"], correctAnswer: 0, explanation: "We pip install mysql-connector or mysql-connector-python." },
            { text: "The \u2026\u2026\u2026. creates a connection to the MySQL server and returns a Connection object.", options: ["connect()", "connection()", "connector()", "None of the above"], correctAnswer: 0, explanation: "mysql.connector.connect() creates the connection." },
            { text: "It acts as middleware between MYDSQL database connection and SQL query.", options: ["cursor", "Table", "Query", "row"], correctAnswer: 0, explanation: "A cursor executes queries and fetches results." },
            { text: "Suresh is trying to fetch only one record from result set at a time. Which method should be used by him?", options: ["fetchmany", "fetchno", "fetchone", "fetchall"], correctAnswer: 2, explanation: "fetchone() gets a single record." },
            { text: "SQL command is passed to which function to run after establishment of the connection between python and database", options: ["cursor()", "execute()", "connection()", "fetchall()"], correctAnswer: 1, explanation: "cursor.execute(query) runs the command." },
            { text: "Which of the following function is used to close the connection between python and database?", options: ["cursor.close()", "is.close()", "connection.close()", "execute.close()"], correctAnswer: 2, explanation: "connection.close() closes the session." },
            { text: "When we run <connection>.__________ method, it reflect the changes made in the database permanently.", options: ["done()", "commit()", "reflect()", "final()"], correctAnswer: 1, explanation: "commit() saves transactions permanently." },
            { text: "Which function retrieve all (remaining ) rows of a query result an return them in a list of tuples", options: ["fetchone()", "fetchall()", "fetchmany ()", "All the above"], correctAnswer: 1, explanation: "fetchall() returns all rows as a list." },
            { text: "What is the datatype of the row returned from a resultset using fetchone() function?", options: ["Tuple", "List", "String", "Dictionary"], correctAnswer: 0, explanation: "fetchone() returns a row as a tuple." },
            { text: "What is the datatype of the row returned from a resultset using fetchall() function?", options: ["Tuple", "List", "String", "Dictionary"], correctAnswer: 1, explanation: "fetchall() returns a list containing tuples." },
            { text: "What is returned when we execute the function fetchone() but no rows are available to fetch ?", options: ["None", "Empty Tuple", "Empty List", "Error"], correctAnswer: 0, explanation: "fetchone returns None when empty." },
            { text: "This is the Property of cursor object that returns the number of rows fetched", options: ["fetchall()", "resultset", "rowcount", "none of the above"], correctAnswer: 2, explanation: "cursor.rowcount holds the affected row count." },
            { text: "Whenever you run Insert, Update and Delete query using Python code, you must run method within the connection object.", options: ["fetchall()", "commit()", "executeQ", "None of the above"], correctAnswer: 1, explanation: "commit() commits the write operations." },
            { text: "Which statement imports the connector?", options: ["import mysql-connector", "import mysql.connector", "import mysql.connect", "import connection.mysql"], correctAnswer: 1, explanation: "import mysql.connector is the standard syntax." },
            { text: "What is returned when we execute the function fetchall() but no rows are available to fetch ?", options: ["None", "Empty Tuple", "Empty List", "Error"], correctAnswer: 2, explanation: "fetchall() returns an empty list." },
            { text: "Is rowcount a read-only attribute?", options: ["Yes", "No", "Depends on OS", "Only in text mode"], correctAnswer: 0, explanation: "rowcount is managed by the cursor internally." },
            { text: "The next row of resultset is fetched via", options: ["fetchone()", "fetch()", "next()", "None of the above"], correctAnswer: 0, explanation: "fetchone advances the internal pointer by one row." },
            { text: "What are invalid host values in connect function of MySql connector?", options: ["host=\"216.10.240.89\"", "host=\"localhost\"", "host=\"127.0.0.1\"", "None of the above"], correctAnswer: 3, explanation: "All these values can be valid hosts." },
            { text: "Maximum how many parameters can be accepted by connect() method.", options: ["2", "3", "4", "5"], correctAnswer: 2, explanation: "host, user, password, database." },
            { text: "We cannot create a new database using python MySql interface", options: ["True", "False", "Partially True", "Not defined"], correctAnswer: 1, explanation: "We can execute 'CREATE DATABASE dbname'." }
        ]
    },
    {
        id: 'python_basics',
        title: 'Python Fundamentals',
        description: 'Python Types, Logic, and Best Practices.',
        icon: 'terminal',
        questionCount: 20,
        questions: [
            { text: "Find the invalid identifier from the following.", options: ["MyName", "True", "ndName", "My_Name"], correctAnswer: 1, explanation: "True is a keyword." },
            { text: "Identify the valid arithmetic operator in Python from the following.", options: ["?", "<", "**", "and"], correctAnswer: 2, explanation: "** is the exponent operator." },
            { text: "A tuple T is declared as: T = (10, 12, 43, 39), then which of the following is incorrect?", options: ["print(T[1])", "T[2] = -29", "print(max(T))", "print(len(T))"], correctAnswer: 1, explanation: "Tuples are immutable; index assignment fails." },
            { text: "Identify the valid declaration of DL: DL = ['Mon', '23', 'hello', '60.5']", options: ["dictionary", "string", "tuple", "list"], correctAnswer: 3, explanation: "Square brackets denote a list." },
            { text: "Given the list L= [1,3,6,82,5,7,11,92] , write the output of print(L[2:5]).", options: ["[6, 82, 5]", "[3, 6, 82]", "[6, 82, 5, 7]", "[1, 3, 6]"], correctAnswer: 0, explanation: "Indices 2, 3, and 4 are accessed." },
            { text: "A tuple is declared as: T = (2,5,6,9,8), then what will be the value of sum(T)?", options: ["28", "29", "30", "31"], correctAnswer: 2, explanation: "2+5+6+9+8 = 30." },
            { text: "Name the built-in mathematical function/method that is used to return an absolute value of a number.", options: ["abs()", "mod()", "absolute()", "math.abs()"], correctAnswer: 0, explanation: "abs() returns absolute value." },
            { text: "If the following code is executed, what will be the output: name=\"Computer Science with Python\", print(name[8:16])", options: ["Science", "Computer", "Python", "with Py"], correctAnswer: 0, explanation: "Slice [8:16] captures 'Science'." },
            { text: "Evaluate the following expressions: 10 > 5 and 7 > 12 or not 18 > 3", options: ["True", "False", "None", "Error"], correctAnswer: 1, explanation: "True and False or False => False." },
            { text: "Consider a declaration L = (1, 'Python', '3.14'). Which of the following represents the data type of L?", options: ["list", "tuple", "dictionary", "string"], correctAnswer: 1, explanation: "Comma separated items in parentheses make a tuple." },
            { text: "Given a Tuple tup1= (10, 20, 30, 40, 50, 60, 70, 80, 90). What will be the output of print(tup1 [3:7:2])?", options: ["(40,50,60,70,80)", "(40,50,60,70)", "[40,60]", "(40, 60)"], correctAnswer: 3, explanation: "Start 3 (40), Stop 7, Step 2 => indices 3 and 5 (40 and 60)." },
            { text: "The return type of the input() function is", options: ["string", "integer", "list", "tuple"], correctAnswer: 0, explanation: "input() always returns string." },
            { text: "Which of the following operators cannot be used with string data type?", options: ["+", "in", "*", "/"], correctAnswer: 3, explanation: "Strings do not support division." },
            { text: "Consider a tuple tup1 = (10, 15, 25, 30). Identify the statement that will result in an error.", options: ["print(tup1[2])", "tup1[2] = 20", "print(min(tup1))", "print(len(tup1))"], correctAnswer: 1, explanation: "Tuples do not support item assignment." },
            { text: "Which of these about a dictionary is false?", options: ["The values of a dictionary can be accessed using keys.", "The keys of a dictionary can be accessed using values.", "Dictionaries are not ordered.", "Dictionaries are mutable."], correctAnswer: 1, explanation: "Keys must be known to get values, not vice versa." },
            { text: "Identify the output: x = 2; while x < 9: print(x, end=''); x = x + 1", options: ["12345678", "123456789", "2345678", "23456789"], correctAnswer: 2, explanation: "Loops from 2 to 8." },
            { text: "What will be the output: def add(num1, num2): sum = num1 + num2; sum = add(20, 30); print(sum)", options: ["50", "0", "Null", "None of these"], correctAnswer: 3, explanation: "The function doesn't return anything, so sum becomes None." },
            { text: "Rearrange the following terms in increasing order of data transfer rates: Gbps, Mbps, Tbps, Kbps, bps", options: ["bps, Kbps, Mbps, Gbps, Tbps", "Tbps, Gbps, Mbps, Kbps, bps", "bps, Mbps, Kbps, Gbps, Tbps", "Kbps, bps, Mbps, Gbps, Tbps"], correctAnswer: 0, explanation: "Least to highest: bps, K, M, G, T." },
            { text: "Which of the following creates a tuple with a single element in Python?", options: ["t = (1)", "t = [1]", "t = 1,", "t = {1}"], correctAnswer: 2, explanation: "Comma indicates tuple." },
            { text: "Identify the output of the following Python statements: x = [[10.0, 11.0, 12.0],[13.0, 14.0, 15.0]]; y = x[1][2]; print(y)", options: ["12.0", "13.0", "14.0", "15.0"], correctAnswer: 3, explanation: "x[1] is second list, [2] is its third item: 15.0." }
        ]
    },
    {
        id: 'python_file_handling_csv',
        title: 'File Handling & CSV',
        description: 'Text files, Binary files, and Pickling.',
        icon: 'file-text',
        questionCount: 20,
        questions: [
            { text: "Which of the following options can be used to read the first line of a text file Myfile.txt?", options: ["myfile = open('Myfile.txt'); myfile.read()", "myfile = open('Myfile.txt','r'); myfile.read(n)", "myfile = open('Myfile.txt'); myfile.readline()", "myfile = open('Myfile.txt'); myfile.readlines()"], correctAnswer: 2, explanation: "readline() reads exactly one line." },
            { text: "Syntax of seek function in Python is myfile.seek(offset, reference_point). What is the default value of reference_point?", options: ["0", "1", "2", "3"], correctAnswer: 0, explanation: "0 stands for beginning of the file." },
            { text: "Which of the following characters acts as default delimiter in a csv file?", options: ["(colon) :", "(hyphen) -", "(comma) ,", "(vertical line) |"], correctAnswer: 2, explanation: "CSV is Comma Separated Values." },
            { text: "Syntax for opening Student.csv file in write mode is: myfile = open(\"Student.csv\",\"w\",newline=''). What is the importance of newline=''?", options: ["A newline gets added to the file.", "Empty string gets appended to the first line.", "Empty string gets appended to all lines.", "EOL translation is suppressed."], correctAnswer: 3, explanation: "It suppresses end of line translation that could add blanks." },
            { text: "What is the correct expansion of CSV files?", options: ["Comma Separable Values", "Comma Separated Values", "Comma Split Values", "Comma Separation Values"], correctAnswer: 1, explanation: "CSV stands for Comma Separated Values." },
            { text: "Which of the following is not a function / method of csv module in Python?", options: ["read()", "reader()", "writer()", "writerow()"], correctAnswer: 0, explanation: "csv module relies on text file read methods, not its own read()." },
            { text: "Which of the following statements opens a binary file record_bin in write mode and writes data from a list lst1?", options: ["with open('record_bin','wb') as file: pickle.dump(lst1,file)", "with open('record_bin','wb') as file: pickle.dump(file,lst1)", "with open('record_bin','w') as file: pickle.dump(file,lst1)", "with open('record_bin','ab') as file: pickle.dump(file,lst1)"], correctAnswer: 0, explanation: "pickle.dump takes the object to write, then the file object." },
            { text: "Assume the position of the file pointer is at the beginning of 3rd line. Which option helps to read the remaining lines?", options: ["myfile.read()", "myfile.read(n)", "myfile.readline()", "myfile.readlines()"], correctAnswer: 3, explanation: "readlines() fetches all remaining lines as a list." },
            { text: "Identify the correct option to open a file student.txt in read mode.", options: ["open('student.txt','w')", "open('student.txt')", "open('student.txt','wb')", "open('student.txt','a')"], correctAnswer: 1, explanation: "Read mode 'r' is default if no mode is specified." },
            { text: "Which of the following statements is incorrect in the context of binary files?", options: ["Information is stored in same format as memory.", "No character translation takes place.", "Every line ends with a new line character.", "pickle module is used for reading/writing."], correctAnswer: 2, explanation: "Binary files don't use newline characters." },
            { text: "What is the significance of the tell() method?", options: ["tells the path of file", "tells the current position of the file pointer", "tells the end position", "checks existence of a file"], correctAnswer: 1, explanation: "tell() returns the current cursor byte offset." },
            { text: "Which of the following statements is true?", options: ["Pickling creates an object from a sequence of bytes.", "Pickling is used for object serialisation.", "Pickling is used for object deserialisation.", "Pickling is used to manage all types of files."], correctAnswer: 1, explanation: "Pickling serializes an object tree to byte stream." },
            { text: "Which function header uses default arguments correctly?", options: ["def cal_si(p=100, r, t=2)", "def cal_si(p=100, r=8, t)", "def cal_si(p, r=8, t)", "def cal_si(p, r=8, t=2)"], correctAnswer: 3, explanation: "Non-default arguments must precede default ones." },
            { text: "Which of the following options can read the entire content as a single string?", options: ["myfile.read()", "myfile.readline()", "myfile.readlines()", "myfile.ReadAll()"], correctAnswer: 0, explanation: "read() reads the full file string." },
            { text: "How is data retrieved from a binary file serialized via pickle?", options: ["pickle.read(f)", "pickle.load(f)", "pickle.dump(f)", "pickle.get()"], correctAnswer: 1, explanation: "pickle.load(file_object) deserializes the byte stream." },
            { text: "When you try to read a text file that doesn't exist:", options: ["The file gets created", "Nothing happens", "An error occurs", "It waits for creation"], correctAnswer: 2, explanation: "FileNotFoundError is raised." },
            { text: "In writing to a file, if the file doesn't exist, what happens in 'w' mode?", options: ["Error occurs", "File gets Created", "Asks for confirmation", "None of these"], correctAnswer: 1, explanation: "Write mode creates a new file." },
            { text: "Which character is used to comment a single line in Python?", options: ["//", "/*", "#", "!"], correctAnswer: 2, explanation: "Hash sign starts a comment." },
            { text: "If we need to append data without overwriting, which mode should we use?", options: ["'w'", "'a'", "'r'", "'r+'"], correctAnswer: 1, explanation: "'a' opens in append mode." },
            { text: "Which method tells you how many lines were read by readlines()?", options: ["count()", "size()", "len()", "lines()"], correctAnswer: 2, explanation: "len() on the list returned by readlines()." }
        ]
    },
    {
        id: 'cbse_networking',
        title: 'Networking Concepts',
        description: 'Network Types, Devices, and Topologies',
        icon: 'globe',
        questionCount: 20,
        questions: [
            { text: "Riya wants to transfer pictures from her mobile phone to her laptop. She uses Bluetooth Technology. Which type of network will be formed?", options: ["PAN", "LAN", "MAN", "WAN"], correctAnswer: 0, explanation: "PAN (Personal Area Network) is for personal devices using Bluetooth." },
            { text: "The modem at the sender's computer end acts as a ____________.", options: ["Model", "Modulator", "Demodulator", "Convertor"], correctAnswer: 1, explanation: "It MOdulates the digital signal to analog at the sender's end." },
            { text: "In case of _____________ switching, before a communication starts, a dedicated path is identified between the sender and the receiver.", options: ["Packet", "Message", "Circuit", "Datagram"], correctAnswer: 2, explanation: "Circuit switching establishes a dedicated path before transmission." },
            { text: "Which of the following is the fastest wired medium of transmission?", options: ["Infrared", "Coaxial cable", "Optical fiber", "Ethernet cable"], correctAnswer: 2, explanation: "Optical fiber uses light and is the fastest wired medium." },
            { text: "What is the full form of MAC in MAC address?", options: ["Media Access Control", "Machine Access Control", "Medium Action Control", "Media Action Connection"], correctAnswer: 0, explanation: "MAC stands for Media Access Control." },
            { text: "Which network topology has a central node (like a hub or switch) to which all other nodes are connected?", options: ["Bus", "Ring", "Star", "Mesh"], correctAnswer: 2, explanation: "Star topology uses a central hub/switch." },
            { text: "What is the expansion of HTTP?", options: ["Hyper Text Transfer Protocol", "Hyper Transfer Text Protocol", "High Text Transfer Protocol", "Hyper Terminal Tracking Program"], correctAnswer: 0, explanation: "Hyper Text Transfer Protocol." },
            { text: "Which protocol is used for sending email over the internet?", options: ["SMTP", "POP3", "IMAP", "FTP"], correctAnswer: 0, explanation: "SMTP means Simple Mail Transfer Protocol." },
            { text: "A network that connects devices within a limited area such as a school or an office building is called:", options: ["LAN", "WAN", "PAN", "MAN"], correctAnswer: 0, explanation: "Local Area Network (LAN)." },
            { text: "Which hardware device connects multiple networks and directs packets to their destination?", options: ["Hub", "Switch", "Router", "Repeater"], correctAnswer: 2, explanation: "Router operates at the network layer to route packets." },
            { text: "What is the primary function of a Repeater in a network?", options: ["Filter data", "Connect different networks", "Amplify/regenerate signals", "Provide security"], correctAnswer: 2, explanation: "Repeaters regenerate weak signals." },
            { text: "ARPANET stands for:", options: ["Advanced Research Projects Agency Network", "American Research Protocol And Network", "Asian Research Packet Network", "Advanced Routing Protocol Network"], correctAnswer: 0, explanation: "ARPANET is the precursor to the Internet." },
            { text: "Which protocol translates domain names to IP addresses?", options: ["DNS", "FTP", "HTTP", "TCP"], correctAnswer: 0, explanation: "Domain Name System (DNS)." },
            { text: "What does VoIP stand for?", options: ["Voice over Internet Protocol", "Video over Internet Protocol", "Voice on Interconnected Protocol", "Video on Internet Provider"], correctAnswer: 0, explanation: "VoIP allows voice calls using a broadband internet connection." },
            { text: "Which of these is a wireless transmission medium?", options: ["Twisted Pair", "Coaxial", "Fiber Optic", "Microwave"], correctAnswer: 3, explanation: "Microwave transmits data wirelessly using electromagnetic waves." },
            { text: "Which topology requires the most amount of wiring?", options: ["Bus", "Star", "Ring", "Mesh"], correctAnswer: 3, explanation: "Mesh topology connects every node to every other node." },
            { text: "In a bus topology, the main cable to which all nodes connect is called the:", options: ["Backbone", "Hub", "Router", "Trunk"], correctAnswer: 0, explanation: "It's the backbone cable." },
            { text: "Which device learns MAC addresses to intelligently forward frames?", options: ["Hub", "Repeater", "Switch", "Modem"], correctAnswer: 2, explanation: "A switch maintains a MAC address table." },
            { text: "What is the purpose of the POP3 protocol?", options: ["Sending email", "Receiving email", "Transferring files", "Browsing websites"], correctAnswer: 1, explanation: "Post Office Protocol v3 is used to receive emails." },
            { text: "A network covering an entire city is called:", options: ["LAN", "WAN", "PAN", "MAN"], correctAnswer: 3, explanation: "MAN is Metropolitan Area Network." }
        ]
    },
    {
        id: 'cbse_databases',
        title: 'SQL Database Details',
        description: 'Table Structures, Degrees, and SQL Commands',
        icon: 'database',
        questionCount: 20,
        questions: [
            { text: "In MYSQL database, if table Alpha has degree 5 and cardinality 3, and Beta has degree 3 and cardinality 5. What will be the degree and cardinality of their Cartesian product?", options: ["5,3", "8,15", "3,5", "15,8"], correctAnswer: 1, explanation: "Degree = 5+3=8. Cardinality = 3*5=15." },
            { text: "In a table, an attribute A of datatype varchar(20) has value \"Keshav\". Attribute B of char(20) has \"Meenakshi\". How many characters are occupied?", options: ["20,6", "6,20", "9,6", "6,9"], correctAnswer: 1, explanation: "varchar takes exact length (6). char takes fixed length (20)." },
            { text: "Which of the following statements is FALSE about keys in a relational database?", options: ["Any candidate key is eligible to become a primary key.", "A primary key uniquely identifies the tuples.", "A candidate key that is not a primary is a foreign key.", "A foreign key value is derived from another primary key."], correctAnswer: 2, explanation: "A candidate key that is not primary is an Alternate key, not Foreign key." },
            { text: "Which keyword drops a column from an existing table?", options: ["DROP COLUMN", "ALTER ... DROP", "REMOVE COLUMN", "DELETE COLUMN"], correctAnswer: 1, explanation: "ALTER TABLE name DROP column_name;" },
            { text: "The AVG() aggregate function does what?", options: ["Adds all values", "Finds highest value", "Averages non-null values", "Averages all values including NULL via zero padding"], correctAnswer: 2, explanation: "Aggregate functions ignore NULL values." },
            { text: "Which SQL statement is used to remove a complete database?", options: ["REMOVE DATABASE", "DELETE DATABASE", "DROP DATABASE", "TRUNCATE DATABASE"], correctAnswer: 2, explanation: "DROP DATABASE is the DDL command." },
            { text: "What does a Foreign Key reference?", options: ["Any attribute", "Primary Key of the same or another table", "Candidate Key only", "Super Key only"], correctAnswer: 1, explanation: "It establishes a link by referencing a Primary constraint." },
            { text: "Which of the following creates a pattern matching for any string ending with 'na'?", options: ["LIKE 'na%'", "LIKE '%na'", "LIKE '_na'", "LIKE '*na'"], correctAnswer: 1, explanation: "% matches any sequence of characters." },
            { text: "Identify the clause used to filter groups when using GROUP BY.", options: ["WHERE", "ORDER", "HAVING", "FILTER"], correctAnswer: 2, explanation: "HAVING filters groups, WHERE filters rows." },
            { text: "Which constraint ensures that no duplicate values exist in a column but allows NULL?", options: ["PRIMARY KEY", "NOT NULL", "UNIQUE", "FOREIGN KEY"], correctAnswer: 2, explanation: "UNIQUE allows NULLs (in most dialects) but ensures non-null values are distinct." },
            { text: "Which MySQL data type is best for storing a whole number?", options: ["FLOAT", "DECIMAL", "INTEGER", "VARCHAR"], correctAnswer: 2, explanation: "INTEGER stores whole number data." },
            { text: "What happens if we forget the WHERE clause in a DELETE statement?", options: ["Error", "Nothing happens", "Only the first row deleted", "All rows are deleted"], correctAnswer: 3, explanation: "Without WHERE, the DELETE applies to all rows." },
            { text: "What is the degree of a relation with 4 rows and 7 columns?", options: ["4", "7", "11", "28"], correctAnswer: 1, explanation: "Degree is the number of attributes (columns)." },
            { text: "Which order is used by default in an ORDER BY clause?", options: ["DESC", "ASC", "Random", "Creation order"], correctAnswer: 1, explanation: "ASC (Ascending) is the default." },
            { text: "What command undoes an uncommitted transaction in SQL?", options: ["UNDO", "REVERT", "ROLLBACK", "COMMIT"], correctAnswer: 2, explanation: "ROLLBACK reverts changes." },
            { text: "To change the table structure, which DDL command is used?", options: ["UPDATE TABLE", "ALTER TABLE", "CHANGE TABLE", "MODIFY TABLE"], correctAnswer: 1, explanation: "ALTER TABLE is used." },
            { text: "Which wildcard is used to represent exactly one character in a LIKE clause?", options: ["%", "_", "*", "?"], correctAnswer: 1, explanation: "The underscore (_) matches exactly one character." },
            { text: "Which SQL function returns the remainder of a division?", options: ["REMAINDER()", "DIV()", "MOD()", "REM()"], correctAnswer: 2, explanation: "MOD(x, y) returns the remainder." },
            { text: "Which keyword adds a new row to a table?", options: ["ADD", "APPEND", "INSERT INTO", "UPDATE"], correctAnswer: 2, explanation: "INSERT INTO table_name VALUES (...)" },
            { text: "How do you select rows where an attribute is empty (NULL)?", options: ["WHERE col = NULL", "WHERE col IS NULL", "WHERE col == NULL", "WHERE col IN NULL"], correctAnswer: 1, explanation: "IS NULL is the correct SQL condition." }
        ]
    },
    {
        id: 'cbse_python_structures',
        title: 'Python Data Structures',
        description: 'Lists, Tuples, Dictionaries, and Strings',
        icon: 'list',
        questionCount: 20,
        questions: [
            { text: "What will be the output: print(3-2**2**3+99//11)", options: ["244", "244.0", "-244", "-244.0"], correctAnswer: 2, explanation: "2**2**3 = 256. 99//11 = 9. 3 - 256 + 9 = -244." },
            { text: "Assertion(A): List is an immutable data type. Reasoning(R): When attempt is made to update, error occurs.", options: ["Both A and R are True", "A is false but R is True", "A is True but R is False", "Both A and R are False"], correctAnswer: 3, explanation: "List is mutable. R is false because list updates in place." },
            { text: "Which of the following will delete key-value pair for key='Red' from dictionary D1?", options: ["delete D1(\"Red\")", "del D1[\"Red\"]", "del.D1[\"Red\"]", "D1.del[\"Red\"]"], correctAnswer: 1, explanation: "The 'del' statement removes items via subscript." },
            { text: "pride=\"#G20 Presidency\"; print(pride[-2:2:-2])", options: ["ndsr", "ceieP0", "ceieP", "ydnsr"], correctAnswer: 1, explanation: "Starts at 'c' (-2), steps by -2 backwards." },
            { text: "tup = (20,30,40,50,80,79); Which statement gives an error: tup[4]=80 or max(tup)?", options: ["print(tup)", "tup[3]+50", "max(tup)", "tup[4]=80"], correctAnswer: 3, explanation: "Tuples do not support item assignment." },
            { text: "What is the output of 'Hello'.replace('l', 'e', 1)?", options: ["Heeeo", "Heelo", "Helle", "Heeeo"], correctAnswer: 1, explanation: "Replaces only the first 'l' with 'e'." },
            { text: "Which list method adds a single element at the end?", options: ["extend()", "insert()", "append()", "push()"], correctAnswer: 2, explanation: "append() modifies the list in place by adding one element." },
            { text: "What is the output of [1, 2] * 3?", options: ["[1, 2, 3]", "[1, 2, 1, 2, 1, 2]", "Error", "[[1,2], [1,2], [1,2]]"], correctAnswer: 1, explanation: "List multiplication repeats the elements." },
            { text: "Which function is used to pair elements of two lists together?", options: ["pair()", "combine()", "zip()", "join()"], correctAnswer: 2, explanation: "zip() creates an iterator of tuples." },
            { text: "How do you retrieve all keys from a dictionary D?", options: ["D.items()", "D.get_keys()", "D.keys()", "D.values()"], correctAnswer: 2, explanation: "keys() returns a view object of all dictionary keys." },
            { text: "What is the result of 'abc' < 'abd' in Python?", options: ["True", "False", "None", "Error"], correctAnswer: 0, explanation: "Lexicographical comparison: 'c' is less than 'd'." },
            { text: "Which tuple operation is invalid?", options: ["T1 + T2", "T1 * 2", "T1.append(1)", "len(T1)"], correctAnswer: 2, explanation: "Tuples have no append method." },
            { text: "If L1 = [1, 2, 3] and L2 = L1, what happens to L2 if L1[0] = 5?", options: ["L2 becomes [5, 2, 3]", "L2 remains [1, 2, 3]", "L2 becomes None", "Error occurs"], correctAnswer: 0, explanation: "L2 and L1 reference the same list object." },
            { text: "Which method removes and returns the last item from a list?", options: ["remove()", "discard()", "pop()", "delete()"], correctAnswer: 2, explanation: "pop() without arguments removes the end item." },
            { text: "Identify the string formatting result of 'Val: {}'.format(5)?", options: ["Val: {}", "Val: 5", "Error", "Val: {5}"], correctAnswer: 1, explanation: "format() substitutes into placeholders." },
            { text: "What is the output of len({1:'a', 2:'b', 1:'c'})?", options: ["2", "3", "Error", "1"], correctAnswer: 0, explanation: "Duplicate keys overwrite. The dictionary has 2 keys." },
            { text: "Which string method checks if all characters are numbers?", options: ["isnumeric()", "isdigit()", "isdecimal()", "All of the above"], correctAnswer: 3, explanation: "All three test numerical aspects of strings." },
            { text: "What is the result of L = list('ABC')?", options: ["['ABC']", "['A', 'B', 'C']", "Error", "('A', 'B', 'C')"], correctAnswer: 1, explanation: "list() converts the string into a list of characters." },
            { text: "Can dictionary values be mutable objects like lists?", options: ["Yes", "No", "Only if keys are ints", "Only in Python 3.9+"], correctAnswer: 0, explanation: "Values can be any object type." },
            { text: "How do you split a string into a list based on whitespace?", options: ["str.divide()", "str.slice()", "str.split()", "str.break()"], correctAnswer: 2, explanation: "split() defaults to whitespace." }
        ]
    },
    {
        id: 'cbse_file_handling',
        title: 'Python File Handling 2',
        description: 'More File Modes, Seek, and Read Operations',
        icon: 'file-text',
        questionCount: 20,
        questions: [
            { text: "Which of the following functions changes the position of file pointer and returns its new position?", options: ["flush()", "tell()", "seek()", "offset()"], correctAnswer: 2, explanation: "seek() moves the pointer and returns the new byte position." },
            { text: "Which of the following is correct regarding 'r+' mode?", options: ["Opens file for reading, truncates to zero length", "Opens file for reading and writing, file must exist", "Opens file for writing only", "Creates new file if it exists"], correctAnswer: 1, explanation: "'r+' is for read/write without truncation." },
            { text: "What does a file's tell() method do?", options: ["Prints the name of file", "Closes the file", "Returns the current byte offset", "Reads the entire file"], correctAnswer: 2, explanation: "tell() returns the pointer's byte position." },
            { text: "In a binary file, if we do not use the 'b' flag in mode, what might happen on Windows?", options: ["Works faster", "Raises an error immediately", "Newline characters (\\\\r\\\\n) might be incorrectly translated", "The file becomes read-only"], correctAnswer: 2, explanation: "Text mode does EOL translation." },
            { text: "What is the output of readlines() on an empty text file?", options: ["None", "[] (empty list)", "'' (empty string)", "EOFError"], correctAnswer: 1, explanation: "readlines returns a list of lines, empty if no text." },
            { text: "Which function commits pending writes to the disk immediately without closing?", options: ["save()", "commit()", "flush()", "dump()"], correctAnswer: 2, explanation: "f.flush() clears internal buffers to OS." },
            { text: "When using 'with open('file.txt') as f:', what happens at the end of the block?", options: ["f remains open", "f is closed automatically", "f is deleted", "f is copied"], correctAnswer: 1, explanation: "Context managers close the file." },
            { text: "To read 10 bytes from a file, which method call is correct?", options: ["read(10)", "readline(10)", "getbytes(10)", "readbytes(10)"], correctAnswer: 0, explanation: "read(size) reads exact bytes/characters." },
            { text: "In CSV, the csv.writer() takes an optional 'delimiter' argument. Which format expects a tab delimiter?", options: ["CSV", "TSV", "TXT", "BIN"], correctAnswer: 1, explanation: "Tab-Separated Values." },
            { text: "What does the 'a+' mode do?", options: ["Truncates file and opens for write/read", "Append mode, plus reading ability", "Opens for reading only", "Throws error if exists"], correctAnswer: 1, explanation: "Append + Read." },
            { text: "If f.seek(0, 2) is executed, where does the pointer go?", options: ["Beginning of file", "Middle of file", "End of file", "Raises error in text mode"], correctAnswer: 2, explanation: "os.SEEK_END (2) goes to the end." },
            { text: "Which of these is the correct way to write a list of strings [\"A\\n\", \"B\\n\"] into a file?", options: ["write()", "writelines()", "writelist()", "putlines()"], correctAnswer: 1, explanation: "writelines() accepts an iterable of strings." },
            { text: "What exception is thrown if you try to f.read() from a file opened in 'w' mode?", options: ["IOError / UnsupportedOperation", "NameError", "SyntaxError", "ValueError"], correctAnswer: 0, explanation: "File not open for reading." },
            { text: "Which module helps traversing a directory tree to find files?", options: ["math", "os / glob", "csv", "pickle"], correctAnswer: 1, explanation: "os.walk or glob module." },
            { text: "In pickling, what is the 'pickling error' possible?", options: ["PicklingError", "LoadError", "SyntaxError", "TypeError"], correctAnswer: 0, explanation: "pickle.PicklingError is raised for unpicklable objects." },
            { text: "If a file contains 3 lines, how many items are in the list returned by readlines()?", options: ["1", "3", "4", "0"], correctAnswer: 1, explanation: "One item per line." },
            { text: "What is the default mode for open() if none is specified?", options: ["'w'", "'r'", "'a'", "'wb'"], correctAnswer: 1, explanation: "'r' read text mode is default." },
            { text: "What happens if you open an existing file in 'w' mode?", options: ["Data is appended", "Error occurs", "All existing data is truncated (deleted)", "It becomes read-only"], correctAnswer: 2, explanation: "Write mode truncates." },
            { text: "Can we seek backwards from current position in text files in Python 3?", options: ["Yes, unconditionally", "No, it throws an io.UnsupportedOperation", "Yes, but only by 1 byte", "Yes, using seek(offset, 1)"], correctAnswer: 1, explanation: "In Python 3 text mode, opaque offsets must be used, relative seek from current/end is disallowed." },
            { text: "Which character represents a newline in Python string literals?", options: ["\\t", "\\r", "\\n", "\\l"], correctAnswer: 2, explanation: "\\n is the standard newline escape sequence." }
        ]
    },
    {
        id: 'cbse_functions_scope',
        title: 'Python Functions & Scope',
        description: 'LEGB rule, Global variables, Default Arguments',
        icon: 'code-2',
        questionCount: 20,
        questions: [
            { text: "What will be the output: global a / a = 100 inside a function called my_func(), if the global variable outside was a=5?", options: ["Local 'a' remains 100, global 'a' remains 5", "Global 'a' becomes 100", "Syntax Error", "Global 'a' becomes 105"], correctAnswer: 1, explanation: "The 'global' keyword binds the variable to the global scope." },
            { text: "An exception may be raised even if the program is syntactically correct.", options: ["True", "False", "Only in Python 2", "Depends on OS"], correctAnswer: 0, explanation: "Runtime errors (like ZeroDivisionError) happen during execution." },
            { text: "Assertion(A): Python Standard Library consists of various modules. Reasoning(R): A function in a module is used to simplify the code and avoids repetition.", options: ["Both A and R are True, R explains A", "Both A and R are True, R is not explanation", "A is true, R is false", "Both false"], correctAnswer: 1, explanation: "Both statements are correct, but R just explains what a function is, which isn't the direct cause of A." },
            { text: "Which keyword is used to define a user-defined function?", options: ["function", "def", "define", "fun"], correctAnswer: 1, explanation: "'def' defines a function." },
            { text: "Which of these is the correct order for argument types in a function signature?", options: ["Positional, Default, Keyword, *args", "Default, Positional", "Positional, *args, Default/Keyword", "Keyword, Positional"], correctAnswer: 2, explanation: "Positional arguments must come first." },
            { text: "If a function doesn\u2019t have a return statement, what does it return?", options: ["0", "False", "None", "Error"], correctAnswer: 2, explanation: "Implicit return is None." },
            { text: "Which variables are strictly confined to the function in which they are declared?", options: ["Global", "Nonlocal", "Local", "Built-in"], correctAnswer: 2, explanation: "Local variables exist only within their function scope." },
            { text: "What does LEGB stand for in Python Scope Resolution?", options: ["Local, Enclosed, Global, Built-in", "Logical, External, Global, Boolean", "List, Enum, Generator, Boolean", "Loop, Error, Global, Base"], correctAnswer: 0, explanation: "It's the scope lookup order: Local -> Enclosed -> Global -> Built-in." },
            { text: "What is the purpose of the 'return' keyword?", options: ["Restarts the function", "Exits function and passes back a value", "Ends the entire program", "Loops back to the beginning"], correctAnswer: 1, explanation: "Return passes back control and value." },
            { text: "def my_func(a, b=5, c): is valid syntax?", options: ["Yes", "No", "Only if b is passed", "Only in Python 3.8+"], correctAnswer: 1, explanation: "Non-default argument 'c' cannot follow default argument 'b'." },
            { text: "Which built-in function is used to interactively get a line of text from the user?", options: ["read()", "scan()", "input()", "get()"], correctAnswer: 2, explanation: "input() is used for user input." },
            { text: "Can a function return multiple values in Python?", options: ["No", "Yes, as a tuple", "Yes, as a string", "Yes, as multiple distinct variables memory slots"], correctAnswer: 1, explanation: "Python packages multiple return values into a tuple." },
            { text: "When we pass an immutable variable (like integer) to a function, what behavior is observed if modified?", options: ["Original is modified", "Original remains unchanged", "Function crashes", "Returns None automatically"], correctAnswer: 1, explanation: "Integers are passed by object reference; assignment creates a new local object." },
            { text: "When a mutable list is passed to a function and `.append()` is called on it, what happens?", options: ["Original list is modified", "Original list is unchanged", "Error occurs", "List is cloned"], correctAnswer: 0, explanation: "Lists can be modified in-place." },
            { text: "Which keyword is used to access an outer enclosing scope's variable (not global)?", options: ["outer", "nonlocal", "global", "parent"], correctAnswer: 1, explanation: "nonlocal allows modifying variables in enclosing functions." },
            { text: "What is a lambda function?", options: ["A multiline function", "An anonymous single-expression function", "A built-in module", "A database trigger"], correctAnswer: 1, explanation: "lambdas are anonymous, short functional expressions." },
            { text: "If a function calls itself, it is called:", options: ["Recursive function", "Iterative function", "Dynamic function", "Method"], correctAnswer: 0, explanation: "Recursion occurs when a function calls itself." },
            { text: "What does the `pass` statement do?", options: ["Exits the function", "Skips to the next loop iteration", "Does absolutely nothing (placeholder)", "Raises an error"], correctAnswer: 2, explanation: "`pass` is a null operation." },
            { text: "Which built-in function returns the memory address reference (identity) of an object?", options: ["address()", "loc()", "id()", "ref()"], correctAnswer: 2, explanation: "id() returns the object's identity." },
            { text: "In `def f(*args):`, what data type is `args` inside the function?", options: ["List", "Tuple", "Dict", "Set"], correctAnswer: 1, explanation: "Variable length positional arguments form a tuple." }
        ]
    }
];

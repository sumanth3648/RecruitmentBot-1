import pyodbc  # this libraries used for DB connection
import pandas as pd  # this libraries is used to frame the data

conn = pyodbc.connect(
    r'DRIVER={SQL Server};'
    r'SERVER=DESKTOP-7OG6UVU;'
    r'DATABASE=RecruitmentBot;'
    r'Trusted_Connection=Yes;'
    )

cursor = conn.cursor()

# cursor.execute("select * from test")  # to retrieve data from table


# s = "create table bot(id int primary key , ResumeName varchar(200) , Skills varchar(50),Qualification varchar(50),Role varchar(50),Experience varchar(50))"
# cursor.execute(s)  # to create table in database

# cursor.execute("""INSERT INTO bot values (4,'RamC#','Dynamics , C#,Python,SQL,JS','B.Tech','Senior Software','3 year')""")  # to insert data into table

# conn.commit()

# for row in cursor.fetchall():
#     print(row)

SQl_query = pd.read_sql_query('SELECT * FROM test',conn) # Data frame using Pandas
print(SQl_query)


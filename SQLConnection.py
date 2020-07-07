import pyodbc

conn = pyodbc.connect(
    r'DRIVER={ODBC Driver 13 for SQL Server};'
    r'SERVER=tcp:lenoraservernew.database.windows.net,1433;'
    r'DATABASE=RecruitmentBot;'
    r'UID=Lenora;'
    r'PWD=Admin#123'
    )

cursor = conn.cursor()

cursor.execute("select * from test")
for row in cursor.fetchall():
    print(row)
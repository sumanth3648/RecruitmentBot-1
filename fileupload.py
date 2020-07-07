import os

import pyodbc
from flask import Flask, render_template, request
import docx2txt

app = Flask(__name__)

conn = pyodbc.connect(
    r'DRIVER={SQL Server};'
    r'SERVER=DESKTOP-7OG6UVU;'
    r'DATABASE=RecruitmentBot;'
    r'Trusted_Connection=Yes;'
)

cursor = conn.cursor()


@app.route('/')
def fileupload():
    return render_template('fileupload.html')


@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['filename']

    file.save(file.filename)

    MY_TEXT = docx2txt.process(file.filename)
    with open(file.filename + ".txt", "w") as text_file:
        print(MY_TEXT, file=text_file)

    # os.remove(file.filename)

    cursor.execute("INSERT INTO test values (1,'" + file.filename + ".txt" + "')")
    conn.commit()

    return file.filename


if __name__ == '__main__':
    app.run(debug=True)

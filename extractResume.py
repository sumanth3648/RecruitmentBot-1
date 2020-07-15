import os
import re

import PyPDF2
import nltk
import pandas as pd
import pyodbc
import spacy
from docx2txt import docx2txt
from flask import Flask, request
from matcher import Matcher
from nltk.corpus import stopwords

app = Flask(__name__)
conn = pyodbc.connect(
    r'DRIVER={SQL Server};'
    r'SERVER=DESKTOP-7OG6UVU;'
    r'DATABASE=RecruitmentBot;'
    r'Trusted_Connection=Yes;'
)
cursor = conn.cursor()
nlp = spacy.load('en_core_web_sm')
matcher = Matcher(nlp.vocab)
STOPWORDS = set(stopwords.words('english'))
EDUCATION = [
            'BE','B.E.', 'B.E', 'BS', 'B.S',
            'ME', 'M.E', 'M.E.', 'MS', 'M.S',
            'BTECH', 'B.TECH', 'M.TECH', 'MTECH',
            'SSC', 'HSC', 'CBSE', 'ICSE', 'X', 'XII','Intermediate'
        ]


@app.route('/submit', methods=['POST'])
def submit():
    file = request.files['file_name']
    file.save(file.filename)
    filename, file_extension = os.path.splitext(file.filename)
    if file_extension == '.txt':
        with open(file.filename, 'r') as f:
            sqlconnection(f.read(), '', '', file.filename)
            return file.filename
    if file_extension == '.csv':
        df = pd.read_csv(file.filename)
        sqlconnection(df, '', '', file.filename)
        return file.filename
    if file_extension == '.xlsx':
        df = pd.read_excel(file.filename)
        sqlconnection(df, '', '', file.filename)
        return file.filename
    if file_extension == '.pdf':
        pdfFileObj = open(file.filename, 'rb')
        pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
        pageObj = pdfReader.getPage(0)
        sqlconnection(pageObj.extractText(), '', '', file.filename)
        pdfFileObj.close()
        return file.filename
    if file_extension == '.docx':
        my_text = docx2txt.process(file.filename)
        sqlconnection(my_text, '', '', file.filename)
        return file.filename
    if file_extension == '.doc':
        my_text = docx2txt.process(file.filename)
        sqlconnection(my_text, '', '', file.filename)
        return file.filename


def sqlconnection(text, designation, experience, filename):
    mobileNumber = extract_mobile_number(text)
    email = extract_email(text)
    name = extract_name(text)
    skills = extract_skills(text)
    qualification = extract_education(text)
    organization = ''
    location = ''
    email = email if email is not None else ''
    mobileNumber = mobileNumber if mobileNumber is not None else ''
    organization = organization if organization is not None else ''
    text = text if text is not None else ''
    name = name if name is not None else ''
    skills = skills if skills is not None else ''
    qualification = qualification if qualification is not None else ''
    designation = designation if designation is not None else ''
    experience = experience if experience is not None else ''
    filename = filename if filename is not None else ''
    location = location if location is not None else ''

    sql = """INSERT INTO tbl_ResumeData
         values ('""" + text + """', '""" + name + """', '""" + skills + """', 
         '""" + qualification + """', '""" + designation + """', '""" + experience + """', 
         '""" + filename + """', '""" + mobileNumber + """', '""" + email + """', 
         '""" + organization + """', '""" + location + """');"""
    cursor.execute(sql)
    conn.commit()


def extract_education(resume_text):
    nlp_text = nlp(resume_text)

    # Sentence Tokenizer
    nlp_text = [sent.string.strip() for sent in nlp_text.sents]

    edu = {}
    # Extract education degree
    for index, text in enumerate(nlp_text):
        for tex in text.split():
            # Replace all special symbols
            tex = re.sub(r'[?|$|.|!|,]', r'', tex)
            if tex.upper() in EDUCATION and tex not in STOPWORDS:
                edu[tex] = text + nlp_text[index + 1]

    # Extract year
    education = []
    for key in edu.keys():
        year = re.search(re.compile(r'(((20|19)(\d{2})))'), edu[key])
        if year:
            education.append((key, ''.join(year[0])))
        else:
            education.append(key)
    return education


def extract_mobile_number(text):
    try:
        phone = nltk.re.findall(nltk.re.compile(
            r'(?:(?:\+?([1-9]|[0-9][0-9]|[0-9][0-9][0-9])\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([0-9][1-9]|[0-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?'),
                                text)
        if phone:
            number = ''.join(phone[0])
            if len(number) > 10:
                return '+' + number
            else:
                return number
    except IndexError:
        return ''


def extract_email(email):
    email = nltk.re.findall(r"([^@|\s]+@[^@]+\.[^@|\s]+)", email)
    if email:
        try:
            return email[0].split()[0].strip(';')
        except IndexError:
            return ''


def extract_name(resume_text):
    nlp_text = nlp(resume_text)

    # First name and Last name are always Proper Nouns
    pattern = [{'POS': 'PROPN'}, {'POS': 'PROPN'}]

    matcher.add('NAME', None, pattern)

    matches = matcher(nlp_text)

    for match_id, start, end in matches:
        span = nlp_text[start:end]
        print(span.text)
        return span.text


def extract_skills(resume_text):
    nlp_text = nlp(resume_text)
    noun_chunks = nlp_text.noun_chunks

    # removing stop words and implementing word tokenization
    tokens = [token.text for token in nlp_text if not token.is_stop]

    # reading the csv file
    data = pd.read_csv(r'C:\Users\Quadrant\Desktop\skills.csv')

    # extract values
    skills = list(data.columns.values)

    skillset = []

    # check for one-grams (example: python)
    for token in tokens:
        if token.lower() in skills:
            skillset.append(token)

    # check for bi-grams and tri-grams (example: machine learning)
    for token in noun_chunks:
        token = token.text.lower().strip()
        if token in skills:
            skillset.append(token)

    return [i.capitalize() for i in set([i.lower() for i in skillset])]


if __name__ == "__main__":
    app.run(debug=True)

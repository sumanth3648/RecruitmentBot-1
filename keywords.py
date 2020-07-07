import re

keywords = []

MLkeywords = ['linear regression', 'logistic regression', 'K means', 'Random forest', 'xgboost', 'svm', 'naive bayes', 'decision tress', 'blotzman machine']
with open('Output.txt') as f:
    txt = f.read()
    for i in MLkeywords:
        if re.search(r'\b{}\b'.format(i.lower()), txt.lower()):
            # print(i)
            keywords.append('Machine Learning')

Javakeywords = ['Spring', 'Hiberbate', 'struts', 'Blade', 'servlets', 'jsp', 'jdbc', 'Google web toolkit[GWT]',
                'JavaServer Faces [JSF]', 'Java']
with open('Output.txt') as f:
    txt = f.read()
    for i in Javakeywords:
        if re.search(r'\b{}\b'.format(i.lower()), txt.lower()):
            # print(i)
            keywords.append('Java')

Pythonkeywords = ['python', 'flask', 'django', 'pandas', 'numpy', 'scikitlearn', 'sklearn', 'matplotlib', 'scipy',
                  'statsmodel', 'bokeh']
with open('Output.txt') as f:
    txt = f.read()
    for i in Pythonkeywords:
        if re.search(r'\b{}\b'.format(i.lower()), txt.lower()):
            # print(i)
            keywords.append('python')

Dbkeywords = ['MySql', 'oracle', 'sql-server', 'postgreSQL', 'MongoDB', 'MariaDB']
with open('Output.txt') as f:
    txt = f.read()
    for i in Dbkeywords:
        if re.search(r'\b{}\b'.format(i.lower()), txt.lower()):
            # print(i)
            keywords.append('DB')

FrontEndkeywords = ['html', 'css', 'jquery', 'bootstrap', 'javascript', 'nodejs', 'angularjs']
with open('Output.txt') as f:
    txt = f.read()
    for i in FrontEndkeywords:
        if re.search(r'\b{}\b'.format(i.lower()), txt.lower()):
            # print(i)
            keywords.append('Front End Developer')

DotNetkeywords = ['C#', 'ASP', '. Net', 'MVC']
with open('Output.txt') as f:
    txt = f.read()
    for i in DotNetkeywords:
        if re.search(r'\b{}\b'.format(i.lower()), txt.lower()):
            # print(i)
            keywords.append('.Net')

Rolekeywords = ['Business Analyst']
with open('Output.txt') as f:
    txt = f.read()
    for i in Rolekeywords:
        if re.search(r'\b{}\b'.format(i.lower()), txt.lower()):
            # print(i)
            keywords.append(i)

with open('Output.txt') as f:
    txt = f.read()
    email = re.findall(r"[a-z0-9\.\-+_]+@[a-z0-9\.\-+_]+\.[a-z]+", txt)
    keywords.append(email[0])
    phone = re.findall(r"(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4})", txt)
    keywords.append(phone[0])

print(keywords)

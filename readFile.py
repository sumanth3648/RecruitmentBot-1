f = open("ChinnarajShetty.docx.txt",'r')
if f.mode == 'r':
    contents = f.read()
    print(contents)
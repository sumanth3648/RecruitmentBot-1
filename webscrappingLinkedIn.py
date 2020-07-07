from time import sleep
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

df1 = []
df2 = []
df3 = []
df4 = []
# df5 = []

driver = webdriver.Chrome("E:/aiml/chromedriver/chromedriver.exe")

driver.get('https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin')

username = driver.find_element_by_id('username')
username.send_keys('sumanth.mani@gmail.com')

sleep(0.5)

password = driver.find_element_by_id('password')
password.send_keys('Vidya@45')

sleep(0.5)

log_in_button = driver.find_element_by_class_name('from__button--floating')

log_in_button.click()
for i in range(2):
    driver.get('https://www.google.com')
    sleep(3)

    search_query = driver.find_element_by_name('q')
    search_query.send_keys('site:linkedin.com/in/ AND "python developer" AND "Florida"' + 'page' + ' ' + str(i))
    sleep(0.5)

    search_query.send_keys(Keys.RETURN)
    sleep(3)

    linkedin_urls = driver.find_elements_by_class_name('iUh30')

    linkedin_urls = [url.text for url in linkedin_urls]

    linkedin_urls = [j.replace(' › ', '/in/') for j in linkedin_urls]
    print(linkedin_urls)
    sleep(0.5)

    driver.get('https://www.linkedin.com/in/konjeti-sumanth-92ba64121/')

    sleep(0.5)

    for linkedin_url in linkedin_urls:
        if len(linkedin_url) != 0 and linkedin_url[-3:] != '...' and linkedin_url[0:3] != 'in.':
            driver.get('https://' + linkedin_url + '/')
            print(linkedin_url)
            # print(linkedin_url[-3:])
            # print(linkedin_url[0:3])
            sleep(0.5)

            text = driver.page_source
            sel = BeautifulSoup(text, 'xml')

            name = sel.find("li", class_="inline t-24 t-black t-normal break-words").text
            if name:
                name = name.strip()
                print('Name: ' + name)
                df1.append(name)
                sleep(0.5)
            job_title = sel.find("h2", class_="mt1 t-18 t-black t-normal break-words").text
            if job_title:
                job_title = job_title.strip()
                print('Job title: ' + job_title)
                df2.append(job_title)
                sleep(0.5)
            location = sel.find("li", class_="t-16 t-black t-normal inline-block").text
            if location:
                location = location.strip()
                print('Location: ' + location)
                df3.append(location)
                sleep(0.5)
            employer = sel.find("span", class_="text-align-left ml2 t-14 t-black t-bold full-width lt-line-clamp lt-line-clamp--multi-line ember-view").text
            if employer:
                employer = employer.strip()
                print('Employer: ' + employer)
                df4.append(employer)
                sleep(0.5)
            # education = sel.find("span", class_="text-align-left ml2 t-14 t-black t-bold full-width lt-line-clamp lt-line-clamp--multi-line ember-view").text
            # if education:
                #   education = education.strip()
                # print('Education: ' + education)
                # df5.append(education)
                # sleep(0.5)
            import pandas as pd

            linkedin = pd.DataFrame([df1, df2, df3, df4])
            linkedin.to_csv('auto_link.csv')

            sleep(5)

    print("Success....")
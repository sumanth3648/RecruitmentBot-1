from pandas.tests.groupby.test_value_counts import df
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException, ElementClickInterceptedException, NoSuchElementException
from selenium.webdriver.common.action_chains import ActionChains
import pandas as pd
import pytest
import time
import re
import json


class EasyApplyDice:

    def __init__(self, data):
        """Parameter initialization"""

        self.email = data['email']
        self.password = data['password']
        self.driver = webdriver.Chrome(data['driver_path'])

    def login_dice(self):
        """This function logs into your personal LinkedIn profile"""

        # go to the LinkedIn login url
        self.driver.get("https://www.dice.com/dashboard/login")

        # introduce email and password and hit enter
        login_email = self.driver.find_element_by_name('email')
        login_email.clear()
        login_email.send_keys(self.email)
        login_pass = self.driver.find_element_by_name('password')
        login_pass.clear()
        login_pass.send_keys(self.password)
        login_pass.send_keys(Keys.RETURN)

    def job_search(self):
        """This function goes to the 'Jobs' section a looks for all the jobs that matches the keywords and location"""
        # filename="{} Jobs in {}.csv".format(self.keywords,self.location)

        # search based on keywords and location and hit enter
        f = open(r'E:\aiml\Bot Code\Sravanthi\sample.txt')
        s = f.read()
        x = json.loads(s)
        df = pd.DataFrame(x)
        # print(df)
        for i, j in df.iterrows():
            self.driver.get("https://www.dice.com/home/home-feed")
            search_keywords = self.driver.find_element_by_xpath(
                "//input[starts-with(@class,'form-control ng-tns-c31-0 ng-star-inserted')]")
            search_keywords.clear()
            search_keywords.send_keys(j.ROLL)
            time.sleep(2)
            search_location = self.driver.find_element_by_xpath("//input[starts-with(@id,'google-location-search')]")
            search_location.clear()
            search_location.send_keys(j.LOCATION)
            search_location.send_keys(Keys.RETURN)
            time.sleep(10)
            current_page = self.driver.current_url
            titles = self.driver.find_elements_by_xpath("//a[contains(@class,'card-title-link bold')]")
            time.sleep(1)
            print(titles)
            for title in iter(titles):
                self.submit_apply(title)

    def submit_apply(self, job_add):
        """This function submits the application for the job add found"""

        print('You are applying to the position of: ', job_add.text)
        job_add.click()
        time.sleep(2)
        # click on the easy apply button, skip if already applied to the position
        try:
            in_apply = self.driver.find_element_by_xpath("//button[contains(@id,'applybtn-2')]")
            in_apply.click()
        except NoSuchElementException:
            print('You already applied to this job, go to next...')
            pass
        time.sleep(1)


if __name__ == '__main__':
    with open('mydiceres.json') as config_file:
        data = json.load(config_file)

    bot = EasyApplyDice(data)
    bot.login_dice()
    time.sleep(3)
    bot.job_search()
    time.sleep(3)
    # bot.find_offers()
    bot.apply()

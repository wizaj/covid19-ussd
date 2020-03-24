### COVID-19 Self Reporting USSD Utility
### Runs on Africa's Talking USSD API - https://africastalking.com/ussd
### Based on Rwanda Government's USSD self reporting tool. All props to them!
### Questions?
### https://twitter.com/wizaj

### How to run

- Install node.js version > 5.x.x
- Install mysql, create user for database covid19ussd, give all permissions
- Deploy to a server of your choice, and configure [your_ip]/ussd route to Africa's Talking USSD Callback URL

### Create a .env file at the root of the project folder with the following config

```
PORT=

AT_USERNAME=
AT_APIKEY=

DB_HOST=
DB_NAME=covid19ussd
DB_USER=
DB_PASS=
```

### Install Node Modules and start the app

```bash
$ npm install
$ npm start
```

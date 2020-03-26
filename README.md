# SER517 StreetCard
### **Project Info:**

The StreetCard is a carefully reasoned, comprehensive social program that seeks to connect Homeless
Persons with Information Technology to optimize the process of providing benefits and housing. 

### **Motivation:**

This is a humanitarian project: the intent being to remedy the needless suffering of our poorest citizens.
Homeless persons are a vulnerable and essentially un-represented population. The services that are
available are often underfunded and inadequate.
By making use of information technology to streamline the provision of benefits, we hope to eliminate
the cracks in the system, through which taxpayer dollars are profligately wasted. Money saved might be
then reinvested in improving services, building shelters and low-cost housing, and improving pay and
benefits for Service Providers.

### **Technology Stack:**
- Backend: Django REST Framework, RabbitMQ message broker, Celery Distributed Task Queue
- Frontend: React
- Database: Postgres (Hosted on Amazon RDS)

### Useful Commands:
**Database setup:**
<br> Setup your own database by modifying this piece of code within the settings.py file.
~~~
DATABASES = { 
    'default': {
        'ENGINE': 'your database engine',
        'USER': 'your db username',
        'PASSWORD': 'your db password',
        'HOST': 'your db host',
        'PORT': 'your db port',
        'NAME': 'your db name',
    }
}
~~~

<br> Migrations files within the app folder would help you setup the database.
<br> To set up the tables in your database:

- `python manage.py makemigrations`
- `python manage.py migrate`

**To install pre-requisite backend libraries:**
- `pip install -r requirements.txt`

**To install pre-requisite frontend libraries:**
- `npm install`

**To start the backend server:**
- `python manage.py runserver`

**To start the front end app:**
- `npm start`

**RabbitMQ:**

- **Unix**:(Homebrew see:https://brew.sh/) 
    - brew update
    - brew install rabbitmq
    **Other Commands**
     - brew services start rabbitmq --> starts rabbitmq server
     - brew services stop rabbitmq --> stops rabbitmq server
     - brew services restart rabbitmq --> restarts rabbitmq server
     - brew services list --> lists all services present on computer along with their status information.
     - For more info: https://www.rabbitmq.com/install-homebrew.html
- **Windows**:(installer)
    see:https://www.rabbitmq.com/install-windows.html
- **Others**
    see:https://www.rabbitmq.com/download.html

**Celery**

- Go to top level folder of the project
- to run celery use command: 
    - celery -A api -l worker info
- info is optional but recommended as it demonstrates what is working 
**References:**
    - For daemonizing celery after deployment: https://docs.celeryproject.org/en/stable/userguide/daemonizing.html
    - For celery integration in django: https://docs.celeryproject.org/en/stable/django/index.html
    
### Important Tips for Email Configuration Information:

 This project currently utilizes google SMTP server configurations. 
 The EMAIL_HOST_USER and EMAIL_HOST_PASSWORD configurations are set in host environment for security reason. 
 If you choose to link with the project through a different account make sure that your email account is 
 configured to accept emails from less secure sources (see: https://support.google.com/accounts/answer/6010255?hl=en).
 If your account uses Two-Step Verification, it is better to use a specially generated password for the app 
 (see: https://support.google.com/mail/answer/185833)
 

 

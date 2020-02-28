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
- Backend: Django REST Framework
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


 

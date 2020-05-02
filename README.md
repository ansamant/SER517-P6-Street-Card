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
- Backend: Django REST Framework, RabbitMQ message broker, Celery Distributed Task Queue, Memcached
- Frontend: React
- Database: Postgres (Hosted on Amazon RDS)


### Installation Guide:

#### 3.1 Quick Installation Guide Using Docker(on your local system):

- Clone the git repository. 

   > ```git clone https://github.com/ansamant/SER517-P6-Street-Card.git```

- Install docker on your local system. (https://docs.docker.com/get-docker/)

- Install docker-compose. (https://docs.docker.com/compose/install/)

- Run  ```sudo service docker start```

- Create .env files.

Note: We need environment variables set up to run the web application. 
We need to have a .env file in /frontend and /backend folders which has a set of environment variables.

- Go to /frontend/ (with in the project root folder)

- Create a .env file with keys as shown below.

    > `REACT_APP_KEY=your-google-map-api-key`
    >
    > `REACT_APP_IP=http://localhost:8000/`

- Go to /backend/ (with in the project root folder)

- Create a .env file with keys as shown below.
    > `SECRET_KEY=your-secret-key`
    >
    > `DB_USER=your-db-user`
    >
    > `DB_PASSWORD=your-db-password`
    >
    > `DB_HOST=your-db-host`
    >
    > `DB_PORT=your-db-port`
    >
    > `DB_NAME=you-db-name`
    >
    > `DJANGO_EMAIL_USR=your-user-email`
    >
    > `DJANGO_EMAIL_PWD=your-email-password`
    
- Switch the celery broker URL in /backend/api/settings.py to localhost as directed.

    > For Development Environment: 'amqp://localhost'
    >
    > For Production Environment: 'amqp://guest:guest@rabbit:5672'
    >
    > `CELERY_BROKER_URL = 'amqp://localhost'`

- Edit /backend/Dockerfile and add the following command before line 6.
  
  > ```python3 manage.py makemigrations && python3 manage.py migrate```

- Run the following docker command . (This is where the magic happens)

    > `docker-compose up -d`

- Go to http://localhost:3000/ 

#### 3.2 Quick Installation Guide Using Docker(on AWS EC2 instance):

- Follow the steps to create an EC2 instance (https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/get-set-up-for-amazon-ec2.html)

- After creating the instance, save the key-pair (.pem file)

- Run the command: `sudo chmod 400 your-key-pair.pem` 

Note: This command assigns appropriate permission to the key-pair.

- To SSH into the AWS EC2 instance: 

    > `scp -i your-key-pair.pem ec2-user@your-public-DNS`

- Install git using command: `sudo yum install git`

- Install docker using command: `sudo yum install docker`

Install docker-compose. (https://docs.docker.com/compose/install/)

- Run sudo service docker start

- Create .env files.

Note: We need environment variables set up to run the web application. 
We need to have a .env file in /frontend and /backend folders which has a set of environment variables.

- Go to /frontend/ (with in the project root folder)

- Create a .env file with keys as shown below.

    > `REACT_APP_KEY=your-google-map-api-key`
    >
    > `REACT_APP_IP=http://aws-ip-instance:3000/`

- Go to /backend/ (with in the project root folder)

- Create a .env file with keys as shown below.

    >  `SECRET_KEY=your-secret-key`
    >
    > `DB_USER=your-db-user`
    >
    > `DB_PASSWORD=your-db-password`
    >
    > `DB_HOST=your-db-host`
    >
    > `DB_PORT=your-db-port`
    >
    > `DB_NAME=you-db-name`
    >
    > `DJANGO_EMAIL_USR=your-user-email`
    >
    > `DJANGO_EMAIL_PWD=your-email-password`

- Switch the celery broker URL in /backend/api/settings.py as directed.

    > For Development Environment: 'amqp://localhost'
    >
    > For Production Environment: 'amqp://guest:guest@rabbit:5672'
    >
    > `CELERY_BROKER_URL = 'amqp://guest:guest@rabbit:5672'`

- Edit /backend/Dockerfile and add the following command before line 6.

    > `python3 manage.py makemigrations && python3 manage.py migrate`

- Run the docker command. (This is where the magic happens)

    > `docker-compose up -d`

- Go to your `aws-instance-ip:3000` in a web browser.


### Useful commands to run independent services:
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
    - **Other Commands**
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
 
### Caching

 To avoid redundant get call to the database, we have implemented caching.
 We are using Django's cache framework (https://docs.djangoproject.com/en/3.0/topics/cache/)
 The cache system we are using is **Memcached**.
 
 **Installing Memcached :**
 
 - Step 1: Install memcached
 
     ````
    $ brew install memcached
     ````
 - Step 2: Start the memcached service
    ```
   $ brew services start memcached
    ```
 - Step 3: Verify Installation
    ```
   $ memcached -V
    ```
  
 **Installing Memcached Binding :**
 - Use the following command to install python memcached client (python-memcached):
 
     ```
    $ pip install python-memcached
    ```
   
 To use Memcached with Django:

- Set **BACKEND** to **django.core.cache.backends.memcached.MemcachedCache**
- Set **LOCATION** to **ip:port** values, where **ip** is the IP address of the Memcached daemon and **port** is the port on which Memcached is running.

Add the below code snippet to **/api/settings.py**
````
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': '127.0.0.1:11211',
    }
}
````

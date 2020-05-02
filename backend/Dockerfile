FROM ubuntu:18.04
RUN apt-get update \
  && apt-get install -y python3-pip python3-dev libpq-dev \
  && apt-get install -y vim
WORKDIR /src/backend
COPY requirements.txt /src/backend
RUN pip3 install -r requirements.txt
COPY . /src/backend
EXPOSE 8000
ENTRYPOINT ["sh", "entrypoint.sh"]

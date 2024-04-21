FROM python:3.8-slim

WORKDIR /service
COPY ./ ./

RUN pip3 install --upgrade pip
RUN pip3 install setuptools
RUN pip3 install -r requirements.txt

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

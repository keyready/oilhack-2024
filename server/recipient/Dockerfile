# FROM ubuntu:18.04
FROM python:3.8-slim

RUN apt-get -qqy update && apt-get install -qqy \
	g++ \
	git \
	make \
	sudo \
    libdpkg-perl \
	--no-install-recommends

RUN mkdir /raw_data
WORKDIR /service
COPY ./ ./

RUN pip3 install --upgrade pip
RUN pip3 install setuptools
RUN pip3 install -r requirements.txt

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

EXPOSE 5000

FROM debian:stable

## to build image, cd into its directory and run:
# $ sudo docker build -t doli .
## after it is built:
# $ sudo docker run -it -p hport:cport doli /bin/bash
## -it means interactive terminal, and -p hport:cport maps the
## -container port to the host's port

## texlive layer
RUN apt-get update && apt-get -y --no-install-recommends install texlive-base texlive-extra-utils texlive-generic-recommended texlive-fonts-recommended texlive-font-utils texlive-latex-base texlive-latex-recommended texlive-latex-extra texlive-math-extra texlive-pictures texlive-xetex texlive-generic-extra latexmk

## python3 and apache layer
# build-essential and the rest is for building uwsgi
RUN apt-get -y --no-install-recommends install python3 python3-dev python3-setuptools python3-pip python3-wheel apache2 libapache2-mod-wsgi-py3

## python packages layer
RUN pip3 install pylatex flask google-cloud

WORKDIR /usr/local/www/wsgi-scripts

## copy the local directories contents into the container
# backend script
ADD ./src /usr/local/www/wsgi-scripts
# static website and friends
ADD ./frontend /usr/local/www/documents

## apache config
RUN useradd -s /bin/bash -m doli && mv main.conf /etc/apache2/sites-available/main.conf && a2dissite 000-default.conf && a2ensite main.conf && echo "ServerName 104.197.105.228.xip.io" | tee /etc/apache2/conf-available/servername.conf && a2enconf servername

# add doliberto.cls to user's home, where DO's will be made
# this prevents us from having to install doliberto.cls globally
ADD ./latex /home/doli/

## Make port 80 available to the world outside this container
EXPOSE 80

## environment variables | should use https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e-env-env-file instead?
# to make UTF-8 default system encoding
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

FROM debian:9

## to build image, cd into its directory and run:
# $ sudo docker build -t doli .
### if you're having trouble building because debian's servers can't be reached, try this: https://stackoverflow.com/a/40516974/
## after it is built:
# $ sudo docker run -it -p hport:cport doli /bin/bash
## -it means interactive terminal, and -p hport:cport maps the
## -container port to the host's port
### and then activate the server
# $docker# apache2ctl start
## Ctrl+P, Ctrl+Q to exit container without stopping it

## texlive layer
RUN apt-get update && apt-get install -y --no-install-recommends \
    latexmk                                                      \
    texlive-base                                                 \
    texlive-extra-utils                                          \
    texlive-font-utils                                           \
    texlive-fonts-recommended                                    \
    texlive-generic-extra                                        \
    texlive-generic-recommended                                  \
    texlive-latex-base                                           \
    texlive-latex-extra                                          \
    texlive-latex-recommended                                    \
    texlive-math-extra                                           \
    texlive-pictures                                             \
    texlive-xetex                                                \
    && rm -rf /var/lib/apt/lists/*

## python3 and apache layer
# build-essential and the rest is for building uwsgi
## apt-get update again because https://stackoverflow.com/a/37727984/
RUN apt-get update && apt-get install -y --no-install-recommends \
    apache2                                                      \
    libapache2-mod-wsgi-py3                                      \
    python3                                                      \
    python3-dev                                                  \
    python3-pip                                                  \
    python3-setuptools                                           \
    python3-wheel                                                \
    && rm -rf /var/lib/apt/lists/*

## python packages layer
RUN pip3 install --upgrade       \
    flask ~=0.12.2               \
    google-cloud-storage ~=1.6.0 \
    pylatex ~=1.2.1

WORKDIR /usr/local/www/wsgi-scripts

## copy the local directories contents into the container
# backend script
COPY ./src /usr/local/www/wsgi-scripts
# static website and friends
COPY ./frontend /usr/local/www/documents

## apache config
RUN useradd -s /bin/bash -m doli && mv main.conf /etc/apache2/sites-available/main.conf && a2dissite 000-default.conf && a2ensite main.conf && echo "ServerName 104.197.105.228.xip.io" | tee /etc/apache2/conf-available/servername.conf && a2enconf servername

# add doliberto.cls to user's home, where DO's will be made
# this prevents us from having to install doliberto.cls globally
COPY ./latex /home/doli/

## Make port 80 available to the world outside this container
EXPOSE 80

## environment variables | should use https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e-env-env-file instead?
# to make UTF-8 default system encoding
ENV LANG C.UTF-8

CMD ["apache2","-DFOREGROUND"]

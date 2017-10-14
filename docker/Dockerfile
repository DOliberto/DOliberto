FROM debian:stable

# to build image, cd into its directory and run:
# $ sudo docker build -t doli .
# after it is built:
# $ sudo docker run -it -p 4000:5000 --net=host doli
# -it means interactive terminal, and -p 4000:5000 maps the container port 80 to the host's port 4000

## texlive layer
RUN apt-get update && apt-get -y --no-install-recommends install texlive-base texlive-extra-utils texlive-generic-recommended texlive-fonts-recommended texlive-font-utils texlive-latex-base texlive-latex-recommended texlive-latex-extra texlive-math-extra texlive-pictures texlive-xetex texlive-generic-extra latexmk


## python3 layer
RUN apt-get -y --no-install-recommends install python3 python3-setuptools python3-pip

## python packages layer
RUN pip3 install wheel && pip3 install pylatex flask

WORKDIR /app

## Copy the current directory contents into the container at /app
ADD . /app

## Make port 5000 available to the world outside this container
EXPOSE 5000

## environment variables | should use https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e-env-env-file instead?
# to make UTF-8 default system encoding
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8
# so that flask works
ENV FLASK_APP server.py

CMD ["python3", "-m", "flask", "run"]

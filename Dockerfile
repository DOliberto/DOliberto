FROM debian:stable

# to build image, cd into its directory and run:
# $ sudo docker build -t doli .
# after it is built:
# $ sudo docker run -it -p 5000:80 --net=host doli
# -it means interactive terminal, and -p 5000:80 maps the container port 80 to the host's port 5000

## texlive layer
RUN apt-get update && apt-get -y --no-install-recommends install texlive-base texlive-extra-utils texlive-generic-recommended texlive-fonts-recommended texlive-font-utils texlive-latex-base texlive-latex-recommended texlive-latex-extra texlive-math-extra texlive-pictures texlive-xetex texlive-generic-extra latexmk


## python3 layer
RUN apt-get -y --no-install-recommends install python3 python3-setuptools python3-pip

## python packages layer
RUN pip3 install wheel && pip3 install pylatex flask google-cloud

WORKDIR /app

## Copy the /src directory's contents into the container at /app
ADD ./src /app

## Make port 80 available to the world outside this container
EXPOSE 80

## environment variables | should use https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e-env-env-file instead?
# to make UTF-8 default system encoding
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8
# so that flask works
ENV FLASK_APP main.py

CMD ["python3", "-m", "flask", "run"]

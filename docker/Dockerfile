FROM debian:stable

# texlive layer
RUN apt-get update && apt-get -y --no-install-recommends install texlive-base texlive-extra-utils texlive-generic-recommended texlive-fonts-recommended texlive-font-utils texlive-latex-base texlive-latex-recommended texlive-latex-extra texlive-math-extra texlive-pictures texlive-xetex texlive-generic-extra latexmk

# python3 layer
RUN apt-get -y --no-install-recommends install python3 python3-setuptools python3-pip

# python packages layer
RUN pip3 install wheel && pip3 install pylatex

WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

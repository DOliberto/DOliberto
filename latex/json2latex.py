from pylatex.base_classes import Environment, Arguments
from pylatex.package import Package
from pylatex import Document, Command
from pylatex.utils import NoEscape

#
## Create a new document
doc = Document(documentclass="doliberto", fontenc=None, inputenc=None, lmodern=False, page_numbers='True' # stupid package imports something we don't want when True, and messes up when False (see comment below)
               ,textcomp=False, font_size=None)
#
## preamble
doc.packages.pop() # to remove stupid package
doc.packages.append(Package('blindtext'))
doc.preamble.append(Command("currentissue", 4)) # substitute correct values
doc.preamble.append(Command("currentmonth", 11))
doc.preamble.append(Command("currentyear", 1994))
doc.preamble.append(Command("currentday", 28))
doc.preamble.append(Command("titleformat", options='block', arguments=Command("section"), extra_arguments=Arguments(NoEscape(r"\large\bfseries\filcenter"), Command("thesection"), Command("1em"), Command("MakeUppercase"))))
#
## document
doc.pop() # to remove \command command (I don't why it appears)
doc.append(Command("dolimaketitle"))
doc.append(Command("dolitoc"))


#for secretaria in secretarias:
dolisection = Environment(arguments="Secretaria Municipal de Magia")
""" 
default _latex_name for Environment is 'environment', so we either 
have to create a class for each custom Environment we want to use, 
or we set the _latex_name attribute for the name we want, so that 
we have \begin{dolisection}\end{dolisection} instead of
\begin{environment}\end{environment}.
see https://jeltef.github.io/PyLaTeX/latest/pylatex/pylatex.base_classes.containers.html#pylatex.base_classes.containers.Environment
"""
dolisection._latex_name="dolisection"
with doc.create(dolisection):
#    for noticia in secretaria:
    doc.append(Command("headline", arguments="Licitação Nº 33/2017"))
    doc.append(Command("blindtext"))
    doc.append(Command("byline", arguments=["Dumbledoria", "secretario municipal de magia"]))

#
## Generate tex
doc.generate_tex('pyla')
#doc.generate_pdf(filepath="pylatex", clean=True, clean_tex=True, compiler="xelatex", silent=True)

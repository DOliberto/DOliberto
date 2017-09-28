import os
from pylatex.base_classes import Environment, CommandBase, Arguments
from pylatex.package import Package
from pylatex import Document, Section, UnsafeCommand, Command
from pylatex.utils import NoEscape

#
## Create a new document
doc = Document(documentclass="doliberto", fontenc=None, inputenc=None, lmodern=False, page_numbers='True' # stupid package imports something we don't want when True, and messes up when False
               ,textcomp=False, font_size=None)
#
## preamble
doc.preamble.append(Command("currentissue", 4)) # substitute correct values
doc.preamble.append(Command("currentmonth", 11))
doc.preamble.append(Command("currentyear", 1994))
doc.preamble.append(Command("currentday", 28))
doc.preamble.append(Command("titleformat", options='block', arguments=Arguments(NoEscape(r"\large\bfseries\filcenter"), Command("thesection"), Command("1em"), Command("MakeUpperCase"))))

#
## document
doc.append(Command("dolimaketitle"))
doc.append(Command("dolitoc"))

"""
for secretaria in secretarias:
        with doc.create(Section('Custom commands')):
"""

#
## Generate tex
doc.generate_tex('pyla')

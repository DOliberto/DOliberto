import os
import datetime
import json
from collections import OrderedDict
from pylatex.base_classes import Environment, Arguments
from pylatex.package import Package
from pylatex import Document, Command
from pylatex.utils import NoEscape

"""
TO-DO:
- chaves do .json não são finais, não sincronizadas com frontend
- implementar ordenação dos atos por secretaria e alterar função correspondente
"""

#
## validating JSON

def read_content_from_json(json_path):
    assert os.path.isfile(json_path)
    with open(json_path) as f:
        do_contents = json.load(f, object_pairs_hook=OrderedDict)
    return do_contents

def validate_doli_order(doli):
    secs_seen = {}
    last_seen = None
    for ato in doli["atos"]:
        current_sec = ato["sec"]
        if last_seen != current_sec:
            assert not secs_seen.get(current_sec, False)
            last_seen = current_sec
            secs_seen[current_sec] = True
    return None

#
## ordering JSON

def propose_doli_order(doli):
    ordered_doli = OrderedDict()
    for ix, ato in enumerate(doli["atos"]):
        current_sec = ato["sec"]
        if ordered_doli.get(current_sec, False):
            ordered_doli[current_sec].append(ato)
        else:
            ordered_doli[current_sec] = [ato]
    return ordered_doli

#
## Create a new document
def make_doli_document():
    return Document(documentclass="doliberto", fontenc=None, inputenc=None, lmodern=False, page_numbers="True" # stupid package imports something we don't want when True, and messes up when False (see comment below)
                    ,textcomp=False, font_size=None)
#
## preamble
def make_preamble(dolidoc, issue, date):
    assert isinstance(dolidoc, Document)
    assert isinstance(issue, int)
    assert isinstance(date, datetime.datetime)
    # packages
    dolidoc.packages.pop() # to remove stupid package lastpage added by pylatex
    # preamble itself
    dolidoc.preamble.append(Command("currentissue", issue)) # substitute correct values
    dolidoc.preamble.append(Command("currentyear", date.year))
    dolidoc.preamble.append(Command("currentmonth", date.month))
    dolidoc.preamble.append(Command("currentday", date.day))
    dolidoc.preamble.append(Command("titleformat", options='block', arguments=Command("section"), extra_arguments=Arguments(NoEscape(r"\large\bfseries\filcenter"), Command("thesection"), Command("1em"), Command("MakeUppercase"))))
    return dolidoc
#
## document
def make_title_and_toc(dolidoc):
    dolidoc.pop() # to remove \command command (I don't why it appears), open issue on pylateX repo
    dolidoc.append(Command("dolimaketitle"))
    dolidoc.append(Command("dolitoc"))
    return dolidoc

def make_atos(dolidoc, atos):
    for ix, ato in atos.items():
        dolisection = Environment(arguments=ato["sec"])
        """
        default _latex_name for Environment is 'environment', so we either 
        have to create a class for each custom Environment we want to use, 
        or we set the _latex_name attribute for the name we want, so that 
        we have \begin{dolisection}\end{dolisection} instead of
        \begin{environment}\end{environment}.
        see https://jeltef.github.io/PyLaTeX/latest/pylatex/pylatex.base_classes.containers.html#pylatex.base_classes.containers.Environment
        """
        dolisection._latex_name="dolisection"
        with dolidoc.create(dolisection):
            dolidoc.append(Command("headline", arguments=ato["title"]))
            dolidoc.append(ato["text"])
            dolidoc.append(Command("byline", arguments=[ato["author"], ato["role"]]))
    return dolidoc

def make_doli(dolidoc, do_contents):
    issue = do_contents["issue"]
    date = datetime.datetime.strptime(do_contents["date"], "%Y-%m-%d")
    dolidoc = make_preamble(dolidoc, issue, date)
    dolidoc = make_title_and_toc(dolidoc)
    dolidoc = make_atos(dolidoc, do_contents["atos"])
    return dolidoc

def infer_outpath_from_json_path(json_path):
    outpath, _ = os.path.splitext(json_path)
    return outpath

def make_pdf(dolidoc, outpath):
    dolidoc.generate_pdf(filepath=outpath, clean=True, clean_tex=False, compiler="xelatex", silent=True)
    return os.path.isfile(outpath)

def make_tex(dolidoc, outpath):
    dolidoc.generate_tex(outpath)
    return os.path.isfile(outpath)

def read_json_and_make_doli(json_path, pdf=None):
    if pdf is None:
        pdf = False
    dolidoc = make_doli_document()
    do_contents = read_content_from_json(json_path)
    dolidoc = make_doli(dolidoc, do_contents)
    outpath = infer_outpath_from_json_path(json_path)
    if pdf:
        return make_pdf(dolidoc, outpath)
    else:
        return make_tex(dolidoc, outpath)

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Turns a .json document in the appropriate format into a .pdf or .tex file. This utility is part of the DOliberto project (see github.com/labfgv/doliberto.")
    parser.add_argument("path", type=str,
                        help="path to .json file")
    parser.add_argument("-t", "--tex", action="store_true",
                        help="output only the .tex file")
    args = parser.parse_args()
    read_json_and_make_doli(args.path, not args.tex)

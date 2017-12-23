import os
import datetime
import json
from collections import defaultdict
from pylatex.base_classes import Environment, Arguments
from pylatex.package import Package
from pylatex import Document, Command
from pylatex.utils import NoEscape

"""

can be run as:
    python3 doli.py make test-doli.json

everything specific to Mesquita has 'mesquita' in its name. (assuming DO
structure is mostly the same across Brazil).

"""

#
## JSON I/O
def read_content_from_json(json_path):
    assert os.path.isfile(json_path)
    with open(json_path, encoding="utf8") as f:
        do_contents = json.load(f)
    return do_contents

def save_json(content, path):
    with open(path, mode='w', encoding="utf8") as f:
        json.dump(content, f, ensure_ascii=False)
    return os.path.isfile(path)

#
## validating JSON
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

def read_and_validate_doli_order(json_path):
    doli = read_content_from_json(json_path)
    return validate_doli_order(doli)

#
## ordering JSON

# mesquita's ordering function
def mesquita_order(atos_by_sec):
    ordered_atos = []
    pe = "Atos do Poder Executivo"
    pe_atos = atos_by_sec.pop(pe, False)
    if pe_atos:
        ordered_atos.append((pe, pe_atos))
    sg = "Secretaria de Governo"
    sg_atos = atos_by_sec.pop(sg, False)
    if sg_atos:
        ordered_atos.append((sg, sg_atos))
    ordered_atos += [(sec, atos) for sec, atos in atos_by_sec.items()]
    return ordered_atos

def atos_by(atos, key):
    atos_by = defaultdict(lambda:[])
    for ato in atos:
        value = ato[key]
        atos_by[value].append(ato)
    return atos_by

def order_doli_atos(atos, ordering_fn=mesquita_order):
    assert isinstance(atos, list)
    atos_by_sec = atos_by(atos, key="sec")
    ordered_atos = ordering_fn(atos_by_sec)
    return ordered_atos

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
    dolidoc.preamble.append(Command('title', 'Diário Oficial (preview)')) 
    return dolidoc
#
## document
def make_title_and_toc(dolidoc):
    dolidoc.pop() # to remove \command command (I don't why it appears), open issue on pylateX repo
    dolidoc.append(Command("dolimaketitle"))
    dolidoc.append(Command("dolitoc"))
    return dolidoc

def make_atos(dolidoc, ordered_atos):
    for sec, atos in ordered_atos:
        dolisection = Environment(arguments=sec)
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
            for ato in atos:
                dolidoc.append(Command("headline", arguments=ato["title"]))
                dolidoc.append(ato["text"])
                dolidoc.append(Command("byline", arguments=[ato["author"], ato["role"]]))
    return dolidoc

def make_doli_tex(dolidoc, do_contents):
    issue = do_contents["issue"]
    date = datetime.datetime.strptime(do_contents["date"], "%Y-%m-%d")
    dolidoc = make_preamble(dolidoc, issue, date)
    dolidoc = make_title_and_toc(dolidoc)
    atos = do_contents["atos"]
    ordered_atos = order_doli_atos(atos)
    dolidoc = make_atos(dolidoc, ordered_atos)
    return dolidoc

def make_pdf(dolidoc, outpath):
    dolidoc.generate_pdf(filepath=outpath, clean=True, clean_tex=True, silent=True, compiler ="latexmk", compiler_args=["-pdf"])
    return os.path.isfile(outpath)

def make_tex(dolidoc, outpath):
    dolidoc.generate_tex(outpath)
    return os.path.isfile(outpath)

def make_doli(do_contents):
    dolidoc = make_doli_document()
    dolidoc = make_doli_tex(dolidoc, do_contents)
    return dolidoc

def make_doli_and_tex(do_contents, outpath):
    dolidoc = make_doli(do_contents)
    return make_tex(dolidoc, outpath)

def make_doli_and_pdf(do_contents, outpath):
    dolidoc = make_doli(do_contents)
    return make_pdf(dolidoc, outpath)

def infer_outpath_from_json_path(json_path):
    outpath, _ = os.path.splitext(json_path)
    return outpath

def read_json_and_make_doli(json_path, only_tex=None):
    if only_tex is None:
        only_tex = False
    do_contents = read_content_from_json(json_path)
    outpath = infer_outpath_from_json_path(json_path)
    if only_tex:
        return make_doli_and_tex(do_contents, outpath)
    else:
        return make_doli_and_pdf(do_contents, outpath)

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="This utility is part of the DOliberto project (see github.com/DOliberto/DOliberto.")
    subparsers = parser.add_subparsers(title="subcommands", help="sub-command help")
    # make
    description_help = "turns a .json document in the appropriate format into a .pdf or .tex file."
    parser_mk = subparsers.add_parser("make", description=description_help, help=description_help, aliases=["mk"])
    parser_mk.add_argument("path", type=str,
                        help="path to .json file with DO contents.")
    parser_mk.add_argument("-t", "--tex", action="store_true",
                        help="output only the .tex file.")
    parser_mk.set_defaults(func=lambda x: read_json_and_make_doli(x.path, x.tex))
    # validate
    parser_val = subparsers.add_parser("validate", description="validates atos order in .json document with DO contents. atos order is correct if all atos from the same secretaria are adjacent.", help="validate atos order in .json document with DO contents.", aliases=['val'])
    parser_val.add_argument("path", type=str,
                        help="path to .json file with DO contents.")
    parser_val.set_defaults(func=lambda x: read_and_validate_doli_order(x.path))
    # parse args
    args = parser.parse_args()
    args.func(args)

import doli
from flask import Flask, request, response, send_file

"""
curl -v POST http://127.@test-doli.json --header "Content-Type: application/json"

http://flask.pocoo.org/docs/0.12/api/#flask.send_file

"""

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def handle_doli_json():
    do_contents = request.json
    outpath = do_contents["date"]
    doli.save_json(do_contents, outpath+".json")    
    return "hey beautiful\n"

def pdf_response(pdf, filename):
    resp = Response(pdf)
    resp.headers['Content-Disposition'] = "inline; filename={}".format(filename)
    resp.mimetype = 'application/pdf'
    return resp

if __name__ == '__main__':
    app.run(host= '0.0.0.0',debug=True)

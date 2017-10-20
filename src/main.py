import os
import doli
import flask
#from google.cloud import storage

"""
HOW-TO

to run server:
    export FLASK_APP=main.py && python3 -m flask run
to post .json to server:
    curl -H "Content-Type: application/json" --data @test-doli.json http://127.0.0.1:5000/ > teste.pdf

TO-DO

create a real-world server with HTTPS (possibly use flask-talisman too).

"""

app = flask.Flask(__name__)

@app.route('/generate', methods=['POST'])
def handle_doli_json():
    do_contents = flask.request.json
    outpath = do_contents["date"]
    json_out = outpath + ".json"
    doli.save_json(do_contents, json_out)
#    gcloud_save_file(json_out, "application/json")
    itworked = doli.make_doli_and_pdf(do_contents, outpath) # because .pdf is added automatically by PyLaTeX
    pdf_out = outpath + ".pdf"
#    pdfmime = "application/pdf"
#    return flask.send_file(pdf_out, mimetype=pdfmime)

    return flask.Response('Ok, ' + pdf_out)

@app.route('/front/<path:path>', methods=['GET'])
def serve_pages(path):
    try:
        path_we = path.split('.')
        ext = ''
        if len(path_we) > 1:
            ext = path_we[-1]
            mimetypes = {"html": "text/html",   "js": "application/javascript",   "css": "text/css"}
            
        tp = os.path.dirname(os.path.realpath(__file__))
        np = tp + '/..'
        os.chdir(np)
        os.chdir('frontend/')
        with open(os.getcwd() + '/' + path, 'r', encoding='utf-8') as f:
            r = f.read()
        os.chdir(tp)
        response = flask.Response(r)
        if not ext == '':
            response.headers['Content-Type'] = mimetypes.get(ext) + '; charset=utf-8'
            
        return response
    
    except Exception:
        return '<b>404</b>'

def gcloud_save_file(filename, mimetype):
        client = storage.Client()
        bucket = client.get_bucket("big-data-fgv-regional")
        filepath = os.path.join("raw-data/diário-oficial/br-rj-mesquita/", filename)
        blob = bucket.blob(filepath)
        blob.upload_from_filename(filepath, content_type=mimetype)
        return os.path.isfile(filepath)

if __name__ == "__main__":
    app.run(host="localhost", port=8888, debug=True)

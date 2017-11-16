import os
import doli
import flask
from google.cloud import storage

"""
HOW-TO

to run server:
    python3 main.py
to post .json to server:
    curl -H "Content-Type: application/json" --data @test-doli.json http://127.0.0.1:5000/ > teste.pdf

TO-DO

create a real-world server with HTTPS (possibly use flask-talisman too).

"""

app = flask.Flask(__name__)


@app.route('/generate', methods=['OPTIONS'])
def handle_cors():
    print('a')
    response = flask.Response()
    response.headers['Access-Control-Allow-Origin'] = flask.request.headers.get('Origin')
    response.headers['Access-Control-Allow-Headers'] = 'Content-type'
    
    return response

@app.route('/generate', methods=['POST'])
def handle_doli_json():
    print('a')
    do_contents = flask.request.json
    # how not to hardcode this path?
    outpath = os.path.join("/home/doli/", do_contents["date"])
    json_out = outpath + ".json"
    doli.save_json(do_contents, json_out)
    gcloud_save_file(json_out, os.path.basename(json_out), "application/json")
    itworked = doli.make_doli_and_pdf(do_contents, outpath) # because .pdf is added automatically by PyLaTeX
    pdf_out = outpath + ".pdf"
    pdfmime = "application/pdf"    
    response = flask.make_response(flask.send_from_directory('', pdf_out, mimetype=pdfmime))
    response.headers["Content-Disposition"] = "inline;  filename=preview.pdf"
    response.headers['Access-Control-Allow-Origin'] = flask.request.headers.get('Origin')
    return response

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
        
        response.headers['Access-Control-Allow-Origin'] = flask.request.headers.get('Origin')
        return response
    
    except Exception:
        return '<b>404</b>'

def gcloud_save_file(local_filepath, cloud_basename, mimetype):
    client = storage.Client()
    bucket = client.get_bucket("big-data-fgv-regional")
    cloud_filepath = os.path.join("raw-data/diário-oficial/br-rj-mesquita/", cloud_basename)
    blob = bucket.blob(cloud_filepath)
    blob.upload_from_filename(local_filepath, content_type=mimetype)
    return None

if __name__ == "__main__":
    app.run(host="localhost", port=8080, debug=True)

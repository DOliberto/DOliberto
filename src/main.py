import os
import doli
import flask
from google.cloud import storage

"""
HOW-TO

to run server:
    export FLASK_APP=server.py
    python3 -m flask run
to post .json to server:
    curl -H "Content-Type: application/json" --data @test-doli.json http://127.0.0.1:5000/ > teste.pdf

TO-DO

create a real-world server with HTTPS (possibly use flask-talisman too).

"""

app = flask.Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def handle_doli_json():
    do_contents = flask.request.json
    outpath = do_contents["date"]
    json_out = outpath + ".json"
    #doli.save_json(do_contents, json_out)
    gcloud_save_file(json_out, "application/json")
    itworked = doli.make_doli_and_pdf(do_contents, outpath) # because .pdf is added automatically by PyLaTeX
    pdf_out = outpath + ".pdf"
    pdfmime = "application/pdf"
    gcloud_save_file(pdf_out, mimetype=pdfmime)
    return flask.send_file(pdf_out, mimetype=pdfmime)

def gcloud_save_file(filename, mimetype):
        client = storage.Client()
        bucket = client.get_bucket("big-data-fgv-regional")
        filepath = os.path.join("raw-data/diário-oficial/br-rj-mesquita/", filename)
        blob = bucket.blob(filepath)
        blob.upload_from_filename(filepath, content_type=mimetype)
        return os.path.isfile(filepath)

if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)

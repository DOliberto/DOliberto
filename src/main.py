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

@app.route('/', methods=['GET', 'POST'])
def handle_doli_json():
    do_contents = flask.request.json
    # how not to hardcode this path?
    outpath = os.path.join("/home/doli/", do_contents["date"])
    json_out = outpath + ".json"
    doli.save_json(do_contents, json_out)
    gcloud_save_file(json_out, os.path.basename(json_out), "application/json")
    itworked = doli.make_doli_and_pdf(do_contents, outpath) # because .pdf is added automatically by PyLaTeX
    pdf_out = outpath + ".pdf"
    pdfmime = "application/pdf"
    return flask.send_file(pdf_out, mimetype=pdfmime)

def gcloud_save_file(local_filepath, cloud_basename, mimetype):
    client = storage.Client()
    bucket = client.get_bucket("big-data-fgv-regional")
    cloud_filepath = os.path.join("raw-data/diário-oficial/br-rj-mesquita/", cloud_basename)
    blob = bucket.blob(cloud_filepath)
    blob.upload_from_filename(local_filepath, content_type=mimetype)
    return None

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)

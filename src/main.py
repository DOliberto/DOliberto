import os
import doli
import flask
from google.cloud import storage

"""
HOW-TO

requirements:
  - Docker (https://www.docker.com/community-edition)
to run server:
  - clone repository at https://github.com/DOliberto/DOliberto
  - uncomment the line that calls gcloud_save_file if you're authenticated to
    gcloud
  - in DO.js, change serverURL to localhost
  - follow instructions in Dockerfile to build and run image
  - point your browser to the port you selected and do your thing

"""

app = flask.Flask(__name__)
app.config["JSON_AS_ASCII"] = False

@app.route('/doli', methods=['POST'])
def handle_doli_json():
    do_contents = flask.request.get_json()
    # how not to hardcode this path?
    outpath = flask.safe_join("/home/doli/", do_contents["date"])
    json_out = outpath + ".json"
    doli.save_json(do_contents, json_out)
    #gcloud_save_file(json_out, os.path.basename(json_out), "application/json")
    doli.make_doli_and_pdf(do_contents, outpath) # because .pdf is added automatically by PyLaTeX
    pdf_out = outpath + ".pdf"
    directory, filename = os.path.split(pdf_out)
    pdfmime = "application/pdf"
    return flask.send_from_directory(directory, filename, mimetype=pdfmime, as_attachment=True)

def gcloud_save_file(local_filepath, cloud_basename, mimetype):
    client = storage.Client()
    bucket = client.get_bucket("big-data-fgv-regional")
    cloud_filepath = os.path.join("raw-data/diário-oficial/br-rj-mesquita/", cloud_basename)
    blob = bucket.blob(cloud_filepath)
    blob.upload_from_filename(local_filepath, content_type=mimetype)
    return None

if __name__ == "__main__":
    app.run(host="localhost", port=8080, debug=True)

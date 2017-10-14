import doli
import flask

"""
to run server:
    export FLASK_APP=server.py
    python3 -m flask run
to post .json to server:
    curl -H "Content-Type: application/json" --data @test-doli.json http://127.0.0.1:5000/ > teste.pdf

"""

app = flask.Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def handle_doli_json():
    do_contents = flask.request.json
    outpath = do_contents["date"]
    json_out = outpath + ".json"
    doli.save_json(do_contents, json_out)
    itworked = doli.make_doli_and_pdf(do_contents, outpath) # because .pdf is added automatically by PyLaTeX
    pdf_out = outpath + ".pdf"
    return flask.send_file(pdf_out, mimetype="application/pdf")

if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)

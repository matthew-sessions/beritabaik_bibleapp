from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

with open("data/berita_baik_data.json", "r") as f:
    malay = json.loads(f.read())
    f.close()

with open("data/kjv.json", "r") as f:
    english = json.loads(f.read())
    f.close()

bible = {"english": english, "malay": malay}


@app.route("/")
def hello_worlds():
    return render_template("index.html")


@app.route("/read/book/<value>")
def show_chapters(value):
    return render_template("chapters.html", title=value)


@app.route("/api/<language>", methods=["GET"])
def verse(language):
    data = request.json

    if "chapter" not in data or "verse" not in data or "book" not in data:
        return jsonify({"message": "need book, chapter and verse"})
    res = bible[language][data["book"]]["chapters"][data["chapter"]]
    return jsonify(res)


@app.route("/api/books")
def books():
    books = bible["english"]["Names Ordered"]

    return jsonify({"books": books})


@app.route("/api/chapters/<value>")
def chapters(value):
    chapters = list(bible["english"][value]["chapters"].keys())

    return jsonify({"chapters": chapters})


@app.route("/api/read/<book>/<number>", methods=["GET"])
def read(book, number):
    english = bible["english"][book]["chapters"][number]
    malay = bible["malay"][book]["chapters"][number]
    res = {"english": english, "malay": malay}

    return jsonify(res)


if __name__ == "__main__":
    app.run()

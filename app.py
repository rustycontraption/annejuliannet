import json
import requests

from urllib.parse import urlparse
from flask import Flask, Response, render_template, redirect, session, request, g, url_for, jsonify

from gevent.pywsgi import WSGIServer

app = Flask(__name__)

@app.route('/')
def index():
     return render_template(
            "index.html",
            heading="projects",
            subheading="build, break, fix, repeat",
            next="",
            prev=""
        )
@app.route('/mast')
def mast():
     return render_template(
            "mast.html",
            heading="mast",
            subheading="",
            next="miniped",
            prev="gs750"
        )

@app.route('/miniped')
def miniped():
     return render_template(
           "miniped.html",
           heading="miniped",
           subheading="probably a bad idea",
           next="rabbit",
           prev="mast"
        )
     
@app.route('/rabbit')
def rabbit():
     return render_template(
            "rabbit.html",
            heading="rabbit",
            subheading="engine swap",
            next="gs750",
            prev="miniped"
        )

@app.route('/gs750')
def gs750():
     return render_template(
            "gs750.html",
            heading="gs750",
            subheading="brat conversion",
            next="mast",
            prev="rabbit"
        )

@app.route('/about')
def about():
     return render_template(
           "about.html",
           heading="about"
     )

@app.route('/contact')
def contact():
     return render_template(
           "contact.html",
           heading="contact"
     )

if __name__ == '__main__':
     app.run()

import json
import requests
from flask_s3 import FlaskS3
from urllib.parse import urlparse
from flask import Flask, Response, render_template, redirect, session, request, g, url_for, jsonify

from gevent.pywsgi import WSGIServer

app = Flask(__name__)
app.config['FLASKS3_BUCKET_NAME'] = 'annejulian.net'
#app.config['FLASKS3_URL_STYLE'] = 'path'
s3 = FlaskS3(app)
     

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
            images = [
                 {"name":"DIVEcam6","details":""},
                 {"name":"DIVEcam7","details":""},
                 {"name":"DIVEcam8","details":""},
                 {"name":"DIVEcam9","details":""},
                 {"name":"DIVEcam","details":""},
                 {"name":"DIVEcam2","details":""},
                 {"name":"DIVEcam3","details":""},
                 {"name":"DIVEcam4","details":""},
                 {"name":"DIVEcam5","details":""}
            ],
            
            heading="mast",
            subheading="marine live-stream system",
            next="miniped",
            prev="gs750"
        )

@app.route('/miniped')
def miniped():
     return render_template(
           "miniped.html",
           images =[
                {"name":"pitbike","details":"The pitbike soon after I got it.  It was in pretty bad shape."},
                {"name":"mountMockup","details":"I designed some mounting adapters in Fusion 360 and 3D printed them to test fitment."},
              
           ],
           heading="miniped",
           subheading="probably a bad idea",
           next="rabbit",
           prev="mast"
        )
     
@app.route('/rabbit')
def rabbit():
     return render_template(
            "rabbit.html",
            images = [
                 {"name":"rabbit","details":""},
                 {"name":"carb","details":""},
                 {"name":"throttlecable","details":"FUN FACT: I now carry a fire extinguisher in the car after the machine screws holding the carb together backed out, the top half of the carb separated from the bottom half, and the whole thing caught on fire."},
                 {"name":"pulley","details":""},
                 {"name":"sketching","details":""},
                 {"name":"fusebox","details":"FUN FACT: I wired the first ignition coil wrong and it exploded.  The coil pictured is a second one I had lying around my garage."},
                 {"name":"fuelpump","details":""},
                 {"name":"regulator","details":""},
            ],
            heading="rabbit",
            subheading="engine swap",
            next="gs750",
            prev="miniped"
        )

@app.route('/gs750')
def gs750():
     return render_template(
            "gs750.html",
            images = [
                 {"name":"magazine","details":"An old advert for reference since I didn't take a picture before I started."},
                 {"name":"coatrack","details":"I needed to learn to weld for this project so I made this coat rack with the TIG welder I had available to me."},
                 {"name":"skateboard","details":""},
                 {"name":"fiberglass","details":""},
                 {"name":"seat","details":"Foam and upholstery were done by Mac's Upholstery in Ballard."},
                 {"name":"standoffs","details":""},
                 {"name":"tray","details":""},
                 {"name":"fusebox","details":""}
            ],
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
     app.run(debug=True)

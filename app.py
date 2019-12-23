import json
import requests
from flask_s3 import FlaskS3
from urllib.parse import urlparse
from flask import Flask, Response, render_template, redirect, session, request, g, url_for, jsonify, Blueprint

from gevent.pywsgi import WSGIServer

app = Flask(__name__)
app.config['FLASKS3_BUCKET_NAME'] = 'annejulian.net'
app.config['FLASKS3_CDN_DOMAIN'] = 'static.annejulian.net'
#app.config['FLASKS3_URL_STYLE'] = 'path'
s3 = FlaskS3(app)


@app.route('/', defaults={ 'path': ''})
@app.route('/<path:path>/')
def test(path):
     return render_template(
          "index_react.html",
          path=path
     )

@app.route('/get_gallery', methods=['GET'])
def get_gallery():
     page = request.args.get('page')
     gallery =  {
          'rabbit': [
               {"name":"rabbit","details":""},
               {"name":"carb","details":""},
               {"name":"throttlecable","details":"FUN FACT: I now carry a fire extinguisher in the car after the machine screws holding the carb together backed out, the top half of the carb separated from the bottom half, and the whole thing caught on fire."},
               {"name":"pulley","details":""},
               {"name":"sketching","details":""},
               {"name":"fusebox","details":"FUN FACT: I wired the first ignition coil wrong and it exploded.  The coil pictured is a second one I had lying around my garage."},
               {"name":"fuelpump","details":""},
               {"name":"regulator","details":""},
          ],
          'miniped':[
               {"name":"pitbike","details":"The pitbike soon after I got it.  It was in pretty bad shape."},
               {"name":"mountMockup","details":"I designed some engine mounting adapters in Fusion 360 and 3D printed them to test fitment."},
               {"name":"bits","details":"Transmission bits all cleaned and ready to be put back together."},
               {"name":"pedTrans","details":"The <i>first</i> time I almost had everything back together..."},
               {"name":"exhaust","details":"Version 1.  The flange leaked so I ultimately had to hack it off and replace it with an actual Tomos exhaust header."},
               {"name":"protoSprocket","details":"I slapped together this atrocity so I could ride the bike up and down the block the very first time I got everything together, just to see if it worked well enough to continue the project.  The original pit bike sprocket was too big, and spaced incorrectly to line up with the Tomos front sprocket."},
          ],
          'dive':[
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
          'gs750':[
               {"name":"magazine","details":"An old advert for reference since I didn't take a picture before I started."},
               {"name":"coatrack","details":"I needed to learn to weld for this project so I made this coat rack with the TIG welder I had available to me."},
               {"name":"skateboard","details":""},
               {"name":"fiberglass","details":""},
               {"name":"seat","details":"Foam and upholstery were done by Mac's Upholstery in Ballard."},
               {"name":"standoffs","details":""},
               {"name":"tray","details":""},
               {"name":"fusebox","details":""}
          ]
     }

     return (jsonify(gallery[page]), 200, {'Content-Type':'application/json'})

# @app.route('/about')
# def about():
#      return render_template(
#            "about.html",
#            heading="about",
#            subheading="..."
#      )

# @app.route('/contact')
# def contact():
#      return render_template(
#            "contact.html",
#            heading="contact",
#            subheading="..."
#      )

if __name__ == '__main__':
     app.run(debug=True)

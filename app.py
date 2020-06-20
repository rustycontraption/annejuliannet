import json
import requests
from urllib.parse import urlparse
from flask import Flask, Response, render_template, redirect, session, request, g, url_for, jsonify, Blueprint
from gevent.pywsgi import WSGIServer

app = Flask(__name__)

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
               {"name":"fusebox","details":"FUN FACT: I wired the first ignition coil wrong and it exploded."},
               {"name":"fuelpump","details":""},
               {"name":"regulator","details":""},
          ],
          'miniped':[
               {"name":"pitbike","details":"The pitbike soon after I got it.  It was in pretty bad shape."},
               {"name":"mountMockup","details":"I designed some motor mounts in Fusion 360 and 3D printed them to test fitment."},
               {"name":"bits","details":"Transmission bits all cleaned and ready to be put back together."},
               {"name":"pedTrans","details":"Transmission bits installed.  Also, steel motor mounts I cut out with a plasma cutter."},
               {"name":"exhaust","details":""},
               {"name":"protoSprocket","details":"Prototype and finished rear sprocket."},
               
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
          ],
          'about':[]
     }

     return (jsonify(gallery[page]), 200, {'Content-Type':'application/json'})

if __name__ == '__main__':
     app.run(debug=True)

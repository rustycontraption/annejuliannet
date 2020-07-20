import json
import requests
import boto3
import smtplib
import email.utils
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from botocore.exceptions import ClientError
from urllib.parse import urlparse
from flask import Flask, Response, render_template, redirect, session, request, g, url_for, jsonify, Blueprint
from gevent.pywsgi import WSGIServer

app = Flask(__name__)

def get_smtp_creds():

     # Get credentials for AWS SMTP from AWS Secrets Manager
     region_name = "us-west-2"
     secret_name = "smtp_creds"

     session = boto3.session.Session(profile_name='annejulian')
     client = session.client(
          service_name='secretsmanager',
          region_name=region_name
     )

     try:
          get_secret_value_response = client.get_secret_value(SecretId=secret_name)
     except ClientError as e:
          if e.response['Error']['Code'] == 'DecryptionFailureException':
               # Secrets Manager can't decrypt the protected secret text using the provided KMS key.
               # Deal with the exception here, and/or rethrow at your discretion.
               raise e
          elif e.response['Error']['Code'] == 'InternalServiceErrorException':
               # An error occurred on the server side.
               # Deal with the exception here, and/or rethrow at your discretion.
               raise e
          elif e.response['Error']['Code'] == 'InvalidParameterException':
               # You provided an invalid value for a parameter.
               # Deal with the exception here, and/or rethrow at your discretion.
               raise e
          elif e.response['Error']['Code'] == 'InvalidRequestException':
               # You provided a parameter value that is not valid for the current state of the resource.
               # Deal with the exception here, and/or rethrow at your discretion.
               raise e
          elif e.response['Error']['Code'] == 'ResourceNotFoundException':
               # We can't find the resource that you asked for.
               # Deal with the exception here, and/or rethrow at your discretion.
               raise e
     else:
          # Decrypts secret using the associated KMS CMK.
          # Depending on whether the secret is a string or binary, one of these fields will be populated.
          if 'SecretString' in get_secret_value_response:
               secret = get_secret_value_response['SecretString']
          else:
               secret = ""

     return json.loads(secret)

@app.route('/', defaults={ 'path': ''})
@app.route('/<path:path>/')
def test(path):
     return render_template(
          "index_react.html",
          path=path
     )

@app.route('/make_contact', methods=['POST'])
def make_contact():

     creds = get_smtp_creds()
     data = request.get_json()

     SENDER = 'service@annejulian.net'
     SENDERNAME = 'Service'
     RECIPIENT = 'praxis@annejulian.net'
     USERNAME_SMTP = creds['user']
     PASSWORD_SMTP = creds['password']

     HOST = "email-smtp.us-west-2.amazonaws.com"
     PORT = 587

     SUBJECT = "annejulian.net/contact"
     BODY_TEXT = ("Received the following info:\n"
                    "Name: " + data['name'] + "\n"
                    "Return email: " + data['email'] + "\n"
                    "Message: " + data['message']
               )
     BODY_HTML = """<html>
          <head />
          <body>
               <h3>Received the following info:</h3>
               Name: """ + data['name'] + """<br />
               Return email: """ + data['email'] + """<br />
               Message: """ + data['message'] + """
          </body>
          </html>
     """

     msg = MIMEMultipart('alternative')
     msg['Subject'] = SUBJECT
     msg['From'] = email.utils.formataddr((SENDERNAME, SENDER))
     msg['To'] = RECIPIENT

     part1 = MIMEText(BODY_TEXT, 'plain')
     part2 = MIMEText(BODY_HTML, 'html')

     msg.attach(part1)
     msg.attach(part2)

     try:
          server = smtplib.SMTP(HOST, PORT)
          server.ehlo()
          server.starttls()
          server.ehlo()
          server.login(USERNAME_SMTP, PASSWORD_SMTP)
          server.sendmail(SENDER, RECIPIENT, msg.as_string())
          server.close()
     except Exception as e:
          print ("SMTP error: ", e)
          httpCode = 503
     else:
          httpCode = 200
          print ("Success")

     return (jsonify(""), httpCode, {'Content-Type':'application/json'})

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
     app.run(debug=False)

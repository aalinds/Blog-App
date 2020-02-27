from flask import Blueprint, request
from auth_helpers import *
import json
import jwt

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login():
  email = request.json.get('email')
  password = request.json.get('password')

  logging = login_user(email, password)

  if not logging['error']:
    encoded_data = jwt.encode({"id": logging["user"]["id"], "email": logging["user"]["email"]}, "secret", algorithm="HS256")
    return json.dumps({'error': False, 'message': logging['message'], 'token': encoded_data.decode()})
  return json.dumps(logging)

@auth.route('/register', methods=['POST'])
def register():
  email = request.json.get('email')
  password = request.json.get('password')

  registration = register_user(email, password)
  return json.dumps(registration)

@auth.route('/details')
def details():
  token = request.headers.get("Authorization").split(" ")[1]
  decoded_data = jwt.decode(token, 'secret', algorithm=["HS256"])
  user = get_user(decoded_data['id'])
  
  if len(user):
    return json.dumps({
      'error': False,
      'message': 'User Found',
      'email': user['email']
    })
  else:
    return json.dumps({
      'error': True,
      'message': 'No User Found',
    })

@auth.route('/picture', methods=["POST"])
def post_picture():
  token = request.headers.get("Authorization").split(" ")[1]
  decoded_data = jwt.decode(token, 'secret', algorithm=["HS256"])

  img = request.files['profile_pic']
  location = './static/img/' + str(decoded_data["id"])
  img.save(location)
  
  return json.dumps({'path': location})
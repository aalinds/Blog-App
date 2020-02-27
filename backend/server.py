from flask import Flask
from flask_mysqldb import MySQL

app = Flask(__name__)

mysql = MySQL(app)
app.config['MYSQL_USER'] = 'aalinds'
app.config['MYSQL_PASSWORD'] = 'mysqlaalind'
app.config['MYSQL_DB'] = 'blog_app'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

from blueprint_auth import auth
from blueprint_article import article
app.register_blueprint(auth, url_prefix='/auth')
app.register_blueprint(article, url_prefix="/articles")

@app.after_request
def add_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
    return response
    
@app.route('/testing')
def testing():
  cur = mysql.connection.cursor()
  cur.execute(''' SELECT * FROM `users` ''')
  result = cur.fetchall()

  return 'TESTING'

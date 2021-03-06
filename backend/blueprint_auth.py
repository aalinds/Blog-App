from flask import Blueprint, request
from auth_helpers import login_user, register_user, get_user, get_user_articles
import json
import jwt

auth = Blueprint("auth", __name__)


@auth.route("/login", methods=["POST"])
def login():
    email = request.json.get("email")
    password = request.json.get("password")

    logging = login_user(email, password)

    if not logging["error"]:
        encoded_data = jwt.encode(
            {
                "id": logging["user"]["id"],
                "email": logging["user"]["email"],
                "name": logging["user"]["name"],
            },
            "secret",
            algorithm="HS256",
        )
        return json.dumps(
            {
                "error": False,
                "message": logging["message"],
                "token": encoded_data.decode(),
            }
        )
    return json.dumps(logging)


@auth.route("/register", methods=["POST"])
def register():
    name = request.json.get("name")
    email = request.json.get("email")
    password = request.json.get("password")

    registration = register_user(name, email, password)
    return json.dumps(registration)


@auth.route("/details")
def details():
    token = request.headers.get("Authorization").split(" ")[1]
    decoded_data = jwt.decode(token, "secret", algorithm=["HS256"])
    user = get_user(decoded_data["id"])

    if user:
        return json.dumps(
            {
                "error": False,
                "message": "User Found",
                "user": {
                    "user_id": user["id"],
                    "email": user["email"],
                    "name": user["name"],
                },
            }
        )
    else:
        return json.dumps({"error": True, "message": "No User Found",})


@auth.route("/picture", methods=["POST"])
def post_picture():
    token = request.headers.get("Authorization").split(" ")[1]
    decoded_data = jwt.decode(token, "secret", algorithm=["HS256"])

    img = request.files["profile_pic"]
    location = "./static/img/" + str(decoded_data["id"])
    img.save(location)

    return json.dumps({"path": location})


@auth.route("/articles")
def get_articles():
    user_token = request.headers.get("Authorization").split(" ")[1]
    user_id = jwt.decode(user_token, "secret", algorithm=["HS256"])["id"]
    articles = get_user_articles(user_id)

    return json.dumps(
        {"error": False, "message": "Articles Found", "articles": articles}
    )

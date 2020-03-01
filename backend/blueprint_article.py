from flask import Blueprint, request
from article_helpers import *
import jwt

article = Blueprint("article", __name__)


@article.route("", methods=["POST"])
def add_article():
    title = request.json.get("title")
    content = request.json.get("content")
    category_id = request.json.get("category_id")
    user_token = request.headers.get("Authorization").split(" ")[1]
    user_id = jwt.decode(user_token, "secret", algorithm=["HS256"])["id"]
    creation = create_article(title, content, category_id, user_id)

    return creation


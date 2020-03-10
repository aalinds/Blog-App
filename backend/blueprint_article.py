from flask import Blueprint, request
from article_helpers import (
    create_article,
    get_articles,
    get_article_by_id,
    get_article_comments,
    add_comment,
)
import jwt
import json

article = Blueprint("article", __name__)


@article.route("", methods=["GET", "POST"])
def articles():
    user_token = request.headers.get("Authorization").split(" ")[1]
    user_id = jwt.decode(user_token, "secret", algorithm=["HS256"])["id"]

    if request.method == "POST":
        title = request.json.get("title")
        content = request.json.get("content")
        category_id = request.json.get("category_id")
        creation = create_article(title, content, category_id, user_id)
        return json.dumps(creation)
    elif request.method == "GET":
        all_articles = get_articles()
        all_articles = [
            article for article in all_articles if article["user_id"] != user_id
        ]
        return json.dumps(all_articles)


@article.route("/<int:article_id>")
def get_article(article_id):
    user_token = request.headers.get("Authorization").split(" ")[1]
    user_id = jwt.decode(user_token, "secret", algorithm=["HS256"])["id"]
    article = get_article_by_id(article_id, user_id)

    if article:
        return json.dumps(
            {"error": False, "message": "Article found", "article": article[0]}
        )
    else:
        return json.dumps({"error": True, "message": "Article does not exist"})


@article.route("/<int:article_id>/comments", methods=["GET", "POST"])
def article_comments(article_id):
    if request.method == "GET":
        comments = get_article_comments(article_id)

        if comments:
            return json.dumps(
                {"error": False, "message": "Comments Found", "comments": comments}
            )
        else:
            return json.dumps({"error": True, "message": "No Comments Found"})
    elif request.method == "POST":
        user_token = request.headers.get("Authorization").split(" ")[1]
        user_id = jwt.decode(user_token, "secret", algorithm=["HS256"])["id"]

        data = request.json.get("data")

        creation = add_comment(data, user_id, article_id)

        return creation

from flask import Blueprint, request
from article_helpers import (
    create_article,
    get_articles,
    get_article_by_id,
    get_article_comments,
    add_comment,
    edit_article,
    delete_article_by_id,
    delete_comment_by_id,
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


@article.route("/<int:article_id>", methods=["GET", "PATCH", "DELETE"])
def get_article(article_id):
    user_token = request.headers.get("Authorization").split(" ")[1]
    user_id = jwt.decode(user_token, "secret", algorithm=["HS256"])["id"]

    if request.method == "GET":
        article = get_article_by_id(article_id)

        if article:
            return json.dumps(
                {"error": False, "message": "Article found", "article": article}
            )
        else:
            return json.dumps({"error": True, "message": "Article does not exist"})
    elif request.method == "PATCH":
        title = request.json.get("title")
        content = request.json.get("content")
        category_id = request.json.get("category_id")

        updation = edit_article(article_id, title, content, category_id, user_id)

        return updation
    elif request.method == "DELETE":
        deletion = delete_article_by_id(article_id, user_id)

        return deletion


@article.route("/<int:article_id>/comments", methods=["GET", "POST"])
def article_comments(article_id):
    if request.method == "GET":
        comments = get_article_comments(article_id)

        return json.dumps(
            {"error": False, "message": "Comments Found!", "comments": comments}
        )
    elif request.method == "POST":
        user_token = request.headers.get("Authorization").split(" ")[1]
        user_id = jwt.decode(user_token, "secret", algorithm=["HS256"])["id"]

        data = request.json.get("data")

        creation = add_comment(data, user_id, article_id)

        return creation


@article.route("/<int:article_id>/comments/<int:comment_id>", methods=["DELETE"])
def delete_comment(article_id, comment_id):
    user_token = request.headers.get("Authorization").split(" ")[1]
    user_id = jwt.decode(user_token, "secret", algorithm=["HS256"])["id"]

    deletion = delete_comment_by_id(comment_id, user_id)

    return json.dumps(deletion)

from server import mysql


def create_article(title, content, category_id, user_id):
    cur = mysql.connection.cursor()

    cur.execute(
        """
      INSERT INTO `articles` (title, content, category_id, user_id) VALUES (%s, %s, %s, %s)
    """,
        (title, content, category_id, user_id),
    )
    mysql.connection.commit()
    cur.close()

    return {"error": False, "message": "Article Created Succeffully!"}


def get_articles():
    cur = mysql.connection.cursor()
    cur.execute(
        """
       SELECT articles.id, articles.user_id, title, content, category_id, name FROM `articles` JOIN `users` ON articles.user_id=users.id;

    """
    )
    result = cur.fetchall()
    cur.close()

    return result


def get_article_by_id(article_id, user_id):
    cur = mysql.connection.cursor()
    cur.execute(
        """
        select articles.id, title, category_id, content, name as username, category_name from articles join users on articles.user_id=users.id join categories on articles.category_id=categories.id where articles.id=%s and articles.user_id=%s
    """,
        (article_id, user_id),
    )
    result = cur.fetchall()
    cur.close()

    return result


def get_article_comments(article_id):
    cur = mysql.connection.cursor()
    cur.execute(
        """
        SELECT * FROM `comments` WHERE article_id=%s
    """,
        (article_id,),
    )
    result = cur.fetchall()
    cur.close()

    return result


def add_comment(data, user_id, article_id):
    cur = mysql.connection.cursor()
    cur.execute(
        """
        INSERT INTO `comments` (data, article_id, user_id) VALUES (%s, %s, %s)
    """,
        (data, article_id, user_id),
    )
    mysql.connection.commit()
    cur.close()

    return {"error": False, "message": "Comment created"}

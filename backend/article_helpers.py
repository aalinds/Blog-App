from server import mysql


def delete_comments_of_article(article_id):
    cur = mysql.connection.cursor()
    cur.execute(
        """
        DELETE FROM `comments` WHERE article_id=%s
    """,
        (article_id,),
    )
    mysql.connection.commit()
    cur.close()


def delete_article_by_id(article_id, user_id):
    article = get_article_by_id(article_id)

    if article and article["user_id"] == user_id:
        delete_comments_of_article(article_id)
        cur = mysql.connection.cursor()
        cur.execute(
            """
            DELETE FROM `articles` WHERE id=%s
        """,
            (article_id,),
        )
        mysql.connection.commit()
        cur.close()

        return {"error": False, "message": "Article Deleted!"}
    else:
        return {"error": True, "message": "Cannot Delete Article!"}


def edit_article(article_id, title, content, category_id, user_id):
    article = get_article_by_id(article_id)

    if article["user_id"] == user_id:
        cur = mysql.connection.cursor()
        cur.execute(
            """
            UPDATE `articles` SET content=%s, category_id=%s, title=%s where id=%s
        """,
            (content, category_id, title, article_id),
        )
        mysql.connection.commit()
        cur.close()

        return {"error": False, "message": "Article Updated Successfuly!"}
    else:
        return {"error": True, "message": "Article Updation Failed!"}


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


def get_article_by_id(article_id):
    cur = mysql.connection.cursor()
    cur.execute(
        """
        select articles.id, title, category_id, content, name as username, users.id as user_id, category_name from articles join users on articles.user_id=users.id join categories on articles.category_id=categories.id where articles.id=%s
    """,
        (article_id,),
    )
    result = cur.fetchone()
    cur.close()

    return result


def get_article_comments(article_id):
    cur = mysql.connection.cursor()
    cur.execute(
        """
        SELECT * FROM `comments` JOIN `users` ON comments.user_id=users.id WHERE article_id=%s ORDER BY comments.id DESC
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

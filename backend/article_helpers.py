from server import mysql

def create_article(title, content, category_id, user_id):
  cur = mysql.connection.cursor()

  cur.execute(
    """
      INSERT INTO `articles` (title, content, category_id, user_id) VALUES (%s, %s, %s, %s)
    """,
    (title, content, category_id, user_id)
  )
  mysql.connection.commit()
  cur.close()

  return {"error": False, "message": "Article Created Succeffully!"}
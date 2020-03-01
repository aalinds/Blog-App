import hashlib
import secrets
from server import mysql


def register_user(name, email, password):
    user_exists = does_user_exist(email)

    if not user_exists:
        cur = mysql.connection.cursor()
        salt = get_salt()
        password = generate_password(password, salt)
        cur.execute(
            """
                INSERT INTO `users` (name, email, password, salt) VALUES (%s, %s, %s, %s)
            """,
            (name, email, password, salt),
        )
        mysql.connection.commit()
        cur.close()

        return {"error": False, "message": "Registration Successful"}

    return {"error": True, "message": "User already exists"}


def login_user(email, password):
    cur = mysql.connection.cursor()
    cur.execute(
        """
            SELECT * FROM `users` WHERE email=%s
        """,
        (email,),
    )
    user = cur.fetchall()

    if user:
        user = user[0]
        password = generate_password(password, user["salt"])

        if password == user["password"]:
            return {"error": False, "message": "Login Successful", "user": user}
        else:
            return {"error": True, "message": "Wrong Password"}

    return {"error": True, "message": "No user found"}


def get_user(user_id):
    cur = mysql.connection.cursor()
    cur.execute(
        """
        SELECT * FROM `users` WHERE id=%s
    """,
        (user_id,),
    )
    result = cur.fetchall()
    return result[0] if result else result


def does_user_exist(email):
    cur = mysql.connection.cursor()

    cur.execute("""SELECT * FROM `users` WHERE email=%s""", (email,))
    result = cur.fetchall()
    cur.close()

    return True if result else False


def get_hash(string):
    return hashlib.sha256(string.encode("utf-8")).hexdigest()


def get_salt():
    return secrets.token_urlsafe(16)


def generate_password(string, salt):
    return get_hash(get_hash(string) + salt)

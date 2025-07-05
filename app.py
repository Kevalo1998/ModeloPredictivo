
from flask import Flask, render_template, request, redirect, session, url_for
import pymysql

app = Flask(__name__)
app.secret_key = 'clave_secreta_segura'

def get_db_connection():
    return pymysql.connect(
        host='localhost',
        user='root',
        password='',
        db='farmedic',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

@app.route('/')
def index():
    if 'us_tipo' in session:
        return redirect(url_for('catalogo'))
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        dni = request.form['dni']
        password = request.form['password']
        conn = get_db_connection()
        with conn.cursor() as cursor:
            sql = """
            SELECT * FROM usuario 
            INNER JOIN tipo_us ON us_tipo = id_tipo_us 
            WHERE dni_us = %s AND contrasena_us = %s
            """
            cursor.execute(sql, (dni, password))
            user = cursor.fetchone()
        conn.close()
        if user:
            session['usuario'] = user['id_usuario']
            session['us_tipo'] = user['us_tipo']
            session['nombre_us'] = user['nombre_us']
            return redirect(url_for('catalogo'))
        else:
            return render_template('login.html', error='Credenciales inválidas')
    return render_template('login.html')

@app.route('/catalogo')
def catalogo():
    if 'us_tipo' not in session:
        return redirect(url_for('login'))
    return render_template('adm_catalogo.html', nombre=session.get('nombre_us'))

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))
@app.route('/productos')
def productos():
    return render_template('adm_productos.html')
@app.route('/ventas')
def ventas():
    return render_template('adm_ventas.html')  
@app.route('/usuarios')
def usuarios():
    return render_template('adm_usuarios.html') 
@app.route('/datos_personales', methods=['GET', 'POST'])
def datos_personales():
    return render_template('editor_datos_personales.html', nombre=session.get('nombre_us'))
@app.route('/proveedores')
def proveedores():
    return render_template('adm_proveedores.html')  
if __name__ == '__main__':
    app.run(debug=True)

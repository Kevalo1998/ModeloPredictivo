from flask import Blueprint, render_template, request, redirect, url_for, jsonify,session
from datetime import datetime
from app.models.usuario import Usuario


usuario_bp = Blueprint('usuario', __name__)
usuario_model = Usuario()



@usuario_bp.route('/usuarios')
def usuarios():
    if 'us_tipo' not in session:
        return redirect(url_for('login.login'))
    return render_template('adm_usuarios.html')

@usuario_bp.route('/datos_personales')
def datos_personales():
    if 'us_tipo' not in session:
        return redirect(url_for('login.login'))
    return render_template('editor_datos_personales.html', nombre=session.get('nombre_us'))


@usuario_bp.route('/usuario/buscar', methods=['POST'])
def buscar_usuario():
    id_usuario = request.form.get('dato')
    datos = usuario_model.obtener_datos(id_usuario)
    if datos:
        u = datos[0]
        edad = datetime.now().year - datetime.strptime(u['edad'], "%Y-%m-%d").year
        return jsonify({
            'nombre': u['nombre_us'],
            'apellidos': u['apellidos_us'],
            'edad': edad,
            'dni': u['dni_us'],
            'tipo': u['nombre_tipo'],
            'telefono': u['telefono_us'],
            'residencia': u['residencia_us'],
            'correo': u['correo_us'],
            'sexo': u['sexo_us'],
            'adicional': u['adicional_us'],
            'avatar': url_for('static', filename=f'img/{u["avatar"]}')
        })
    return jsonify({})

@usuario_bp.route('/usuario/capturar', methods=['POST'])
def capturar_datos():
    id_usuario = request.form.get('id_usuario')
    datos = usuario_model.obtener_datos(id_usuario)
    if datos:
        u = datos[0]
        return jsonify({
            'telefono': u['telefono_us'],
            'residencia': u['residencia_us'],
            'correo': u['correo_us'],
            'sexo': u['sexo_us'],
            'adicional': u['adicional_us']
        })
    return jsonify({})

@usuario_bp.route('/usuario/editar', methods=['POST'])
def editar_usuario():
    id_usuario = request.form.get('id_usuario')
    telefono = request.form.get('telefono')
    residencia = request.form.get('residencia')
    correo = request.form.get('correo')
    sexo = request.form.get('sexo')
    adicional = request.form.get('adicional')
    usuario_model.editar(id_usuario, telefono, residencia, correo, sexo, adicional)
    return 'editado'

@usuario_bp.route('/usuario/cambiar_contra', methods=['POST'])
def cambiar_contra():
    id_usuario = request.form.get('id_usuario')
    oldpass = request.form.get('oldpass')
    newpass = request.form.get('newpass')
    resultado = usuario_model.cambiar_contra(id_usuario, oldpass, newpass)
    return resultado

@usuario_bp.route('/usuario/cambiar_foto', methods=['POST'])
def cambiar_foto():
    id_usuario = session.get('usuario')
    if 'photo' in request.files:
        photo = request.files['photo']
        if photo and photo.filename != '':
            ext = os.path.splitext(photo.filename)[1]
            filename = f"{id_usuario}_{datetime.now().timestamp()}{ext}"
            ruta = os.path.join('app', 'static', 'img', filename)
            photo.save(ruta)
            anteriores = usuario_model.cambiar_photo(id_usuario, filename)
            if anteriores:
                anterior = anteriores[0]['avatar']
                anterior_path = os.path.join('app', 'static', 'img', anterior)
                if os.path.exists(anterior_path):
                    os.remove(anterior_path)
            return jsonify({'ruta': url_for('static', filename=f'img/{filename}'), 'alert': 'edit'})
    return jsonify({'alert': 'noedit'})

@usuario_bp.route('/usuario/crear', methods=['POST'])
def crear_usuario():
    data = request.form
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    edad = data.get('edad')
    dni = data.get('dni')
    password = data.get('pass')
    tipo = 4
    avatar = 'default.jpg'
    usuario_model.crear(nombre, apellido, edad, dni, password, tipo, avatar)
    return jsonify({'msg': 'usuario_creado'})

@usuario_bp.route('/usuario/ascender', methods=['POST'])
def ascender_usuario():
    id_usuario = session.get('usuario')
    pass_admin = request.form.get('pass')
    id_ascendido = request.form.get('id_usuario')
    resultado = usuario_model.ascender(pass_admin, id_ascendido, id_usuario)
    return jsonify({'msg': resultado})

@usuario_bp.route('/usuario/descender', methods=['POST'])
def descender_usuario():
    id_usuario = session.get('usuario')
    pass_admin = request.form.get('pass')
    id_descendido = request.form.get('id_usuario')
    resultado = usuario_model.descender(pass_admin, id_descendido, id_usuario)
    return jsonify({'msg': resultado})

@usuario_bp.route('/usuario/borrar', methods=['POST'])
def borrar_usuario():
    id_usuario = session.get('usuario')
    pass_admin = request.form.get('pass')
    id_borrado = request.form.get('id_usuario')
    resultado = usuario_model.borrar(pass_admin, id_borrado, id_usuario)
    return jsonify({'msg': resultado})
import os
import uuid
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from app.models.proveedor import Proveedor
from flask import Blueprint, render_template, request, jsonify, redirect, url_for, session
from app.models.proveedor import Proveedor

proveedor_bp = Blueprint('proveedor', __name__)
proveedor_model = Proveedor()
@proveedor_bp.route('/proveedores')
def proveedores():
    if 'us_tipo' not in session:
        return redirect(url_for('login.login'))
    return render_template('adm_proveedor.html', tipo_usuario=session['us_tipo'], nombre=session.get('nombre_us'))


@proveedor_bp.route('/proveedor/crear', methods=['POST'])
def crear_proveedor():
    data = request.form
    resultado = proveedor_model.crear(
        nombre=data.get('nombre'),
        telefono=data.get('telefono'),
        correo=data.get('correo'),
        direccion=data.get('direccion'),
        avatar='prov_default.png'
    )
    return jsonify({'msg': resultado})

@proveedor_bp.route('/proveedor/editar', methods=['POST'])
def editar_proveedor():
    data = request.form
    resultado = proveedor_model.editar(
        id=data.get('id'),
        nombre=data.get('nombre'),
        telefono=data.get('telefono'),
        correo=data.get('correo'),
        direccion=data.get('direccion')
    )
    return jsonify({'msg': resultado})

@proveedor_bp.route('/proveedor/buscar', methods=['POST'])
def buscar_proveedores():
    consulta = request.form.get('consulta', '')
    proveedores = proveedor_model.buscar(consulta)
    resultado = []
    for p in proveedores:
        resultado.append({
            'id': p['id_proveedor'],
            'nombre': p['nombre'],
            'telefono': p['telefono'],
            'correo': p['correo'],
            'direccion': p['direccion'],
            'avatar': f"../static/img/prov/{p['avatar']}"
        })
    return jsonify(resultado)

@proveedor_bp.route('/proveedor/cambiar_logo', methods=['POST'])
def cambiar_logo_proveedor():
    id_logo_prov = request.form.get('id_logo_prov')
    avatar_antiguo = request.form.get('avatar')
    archivo = request.files.get('photo')

    if archivo and archivo.mimetype in ['image/jpeg', 'image/png', 'image/gif']:
        nombre_archivo = f"{uuid.uuid4().hex}-{secure_filename(archivo.filename)}"
        ruta_guardado = os.path.join('static', 'img', 'prov', nombre_archivo)
        archivo.save(ruta_guardado)

        proveedor_model.cambiar_logo(id_logo_prov, nombre_archivo)

        if avatar_antiguo != '../img/prov/prov_default.png':
            ruta_anterior = avatar_antiguo.replace('../', '')
            if os.path.exists(ruta_anterior):
                os.remove(ruta_anterior)

        return jsonify({'ruta': f'../static/img/prov/{nombre_archivo}', 'alert': 'edit'})
    else:
        return jsonify({'alert': 'noedit'})

@proveedor_bp.route('/proveedor/borrar', methods=['POST'])
def borrar_proveedor():
    id = request.form.get('id')
    resultado = proveedor_model.borrar(id)
    return jsonify({'msg': resultado})

@proveedor_bp.route('/producto/rellenar_proveedores', methods=['POST'])  # Ojo: JS espera esta ruta
def rellenar_proveedores():
    proveedores = proveedor_model.rellenar_proveedores()
    resultado = [{'id': p['id_proveedor'], 'nombre': p['nombre']} for p in proveedores]
    return jsonify(resultado)
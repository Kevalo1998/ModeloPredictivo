from flask import Blueprint, request, jsonify
from app.models.lote import Lote
from datetime import datetime

lote_bp = Blueprint('lote', __name__)
lote_model = Lote()

@lote_bp.route('/lote/crear', methods=['POST'])
def crear_lote():
    data = request.form
    lote_model.crear_lote(
        data['id_producto'],
        data['proveedor'],
        data['stock'],
        data['vencimiento']
    )
    return jsonify({'status': 'ok'})

@lote_bp.route('/lote/editar', methods=['POST'])
def editar_lote():
    data = request.form
    lote_model.editar_lote(data['id'], data['stock'])
    return jsonify({'status': 'ok'})

@lote_bp.route('/lote/buscar', methods=['POST'])
def buscar_lotes():
    objetos = lote_model.buscar()
    json = []
    fecha_actual = datetime.now()

    for obj in objetos:
        vencimiento = datetime.strptime(obj['vencimiento'], '%Y-%m-%d')
        diferencia = vencimiento - fecha_actual
        dias = abs(diferencia.days)
        mes = abs(diferencia.days // 30)
        estado = 'light'
        if diferencia.days < 0:
            estado = 'danger'
        elif mes <= 3:
            estado = 'warning'

        json.append({
            'id': obj['id_lote'],
            'nombre': obj['prod_nom'],
            'concentracion': obj['concentracion'],
            'adicional': obj['adicional'],
            'vencimiento': obj['vencimiento'],
            'proveedor': obj['proveedor'],
            'stock': obj['stock'],
            'laboratorio': obj['lab_nom'],
            'tipo': obj['tip_nom'],
            'presentacion': obj['pre_nom'],
            'avatar': f"/static/img/prod/{obj['logo']}",
            'mes': mes,
            'dia': dias % 30,
            'estado': estado,
            'invert': 1 if diferencia.days >= 0 else 0
        })
    return jsonify(json)

@lote_bp.route('/lote/borrar', methods=['POST'])
def borrar_lote():
    data = request.form
    lote_model.borrar_lote(data['id'])
    return jsonify({'status': 'borrado'})
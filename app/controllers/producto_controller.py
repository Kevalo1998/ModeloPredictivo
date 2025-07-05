from flask import Blueprint, render_template
from app.models.producto import Producto

producto_bp = Blueprint('producto', __name__)

@producto_bp.route('/productos')
def listar_productos():
    productos = Producto.query.all()
    return render_template('productos.html', productos=productos)
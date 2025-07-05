from flask import Blueprint, render_template, request, redirect, url_for, session

proveedor_bp = Blueprint('proveedor', __name__)

@proveedor_bp.route('/proveedores')
def proveedores():
    if 'us_tipo' not in session:
        return redirect(url_for('login.login'))
    return render_template('adm_proveedor.html')
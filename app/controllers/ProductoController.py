from flask import Blueprint, render_template, session, redirect, url_for

producto_bp = Blueprint('producto', __name__)

@producto_bp.route('/productos')
def productos():
    if 'us_tipo' not in session:
        return redirect(url_for('login.login'))
    return render_template('adm_productos.html', tipo_usuario=session['us_tipo'], nombre=session.get('nombre_us'))
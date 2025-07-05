from flask import Blueprint, render_template, session, redirect, url_for

venta_bp = Blueprint('venta', __name__)

@venta_bp.route('/ventas')
def ventas():
    if 'us_tipo' not in session:
        return redirect(url_for('login.login'))  # Asegúrate que esto coincida con tu blueprint de login
    return render_template('adm_ventas.html', nombre=session.get('nombre_us'))
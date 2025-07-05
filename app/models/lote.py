from app.db import get_db

class Lote:
    def __init__(self):
        self.objetos = []

    def crearlote(self, id_producto, proveedor, stock, vencimiento):
        db = get_db()
        cursor = db.cursor()
        sql = """INSERT INTO lote (stock, vencimiento, lote_id_prod, lote_id_prov) 
                 VALUES (%s, %s, %s, %s)"""
        cursor.execute(sql, (stock, vencimiento, id_producto, proveedor))
        db.commit()
        return 'add'

    def buscar(self, consulta=None):
        db = get_db()
        cursor = db.cursor()
        if consulta:
            sql = """
                SELECT id_lote, stock, vencimiento, concentracion, adicional,
                       producto.nombre AS prod_nom, laboratorio.nombre AS lab_nom,
                       tipo_producto.nombre AS tip_nom, presentacion.nombre AS pre_nom,
                       proveedor.nombre AS proveedor, producto.avatar AS logo
                FROM lote
                JOIN proveedor ON lote_id_prov = id_proveedor
                JOIN producto ON lote_id_prod = id_producto
                JOIN laboratorio ON prod_lab = id_laboratorio
                JOIN tipo_producto ON prod_tip_prod = id_tip_prod
                JOIN presentacion ON prod_present = id_presentacion
                WHERE producto.nombre LIKE %s
                ORDER BY producto.nombre
                LIMIT 25
            """
            cursor.execute(sql, (f"%{consulta}%",))
        else:
            sql = """
                SELECT id_lote, stock, vencimiento, concentracion, adicional,
                       producto.nombre AS prod_nom, laboratorio.nombre AS lab_nom,
                       tipo_producto.nombre AS tip_nom, presentacion.nombre AS pre_nom,
                       proveedor.nombre AS proveedor, producto.avatar AS logo
                FROM lote
                JOIN proveedor ON lote_id_prov = id_proveedor
                JOIN producto ON lote_id_prod = id_producto
                JOIN laboratorio ON prod_lab = id_laboratorio
                JOIN tipo_producto ON prod_tip_prod = id_tip_prod
                JOIN presentacion ON prod_present = id_presentacion
                WHERE producto.nombre NOT LIKE ''
                ORDER BY producto.nombre
                LIMIT 25
            """
            cursor.execute(sql)

        self.objetos = cursor.fetchall()
        return self.objetos

    def editarlote(self, id_lote, stock):
        db = get_db()
        cursor = db.cursor()
        sql = "UPDATE lote SET stock = %s WHERE id_lote = %s"
        cursor.execute(sql, (stock, id_lote))
        db.commit()
        return 'edit'

    def borrarlote(self, id_lote):
        db = get_db()
        cursor = db.cursor()
        sql = "DELETE FROM lote WHERE id_lote = %s"
        cursor.execute(sql, (id_lote,))
        db.commit()
        return 'borrado' if cursor.rowcount > 0 else 'noborrado'
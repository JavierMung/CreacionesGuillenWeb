import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatterDolar } from "../helpers/Functions";

// Estilos para el PDF
const styles = StyleSheet.create({

  page: {
    fontFamily: 'Helvetica',
    flexDirection: 'column',
    padding: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: 'start',
    fontFamily: 'Times-Roman', 
    color:"#F57D76"
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'left',
    fontFamily: 'Times-Roman',
  },
  fecha: {
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'right',
    fontFamily: 'Times-Roman',
  },
  subtitleTotal: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'right',
    fontFamily: 'Times-Roman',
    color:"black"
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'Times-Roman',
  },
  textHeader: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Times-Roman',
    fontWeight:"ultrabold",
  },
  section: {
    marginBottom: 10,

  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 10,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
    justifyContent: "center",
    width: "100%",
  },
  tableCell: {
    margin: 'auto',
    padding: 5,
    justifyContent: "center",
    width: "100%",
  },
  tableHeader: {
    borderTop:"1px solid #F57D76",
    borderBottom:"1px solid #F57D76",

  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  }
});
const opciones = { day: '2-digit', month: 'long', year: 'numeric' };

// Componente MyDocument que generará el PDF
const OrderPdf = ({ pedido }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Creaciones Guillen</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>N° pedido: {pedido.idPedido}</Text>
          <Text style={[styles.subtitle, { textAlign: 'right' }]}>{new Date(pedido.fecha).toLocaleDateString('es-ES', opciones)}</Text>
        </View>
        <Text style={styles.subtitle}>{pedido.clienteNombre}</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableHeader]}><Text style={styles.textHeader}>Producto</Text></View>
            <View style={[styles.tableCell, styles.tableHeader]}><Text style={styles.textHeader}>Cantidad</Text></View>
            <View style={[styles.tableCell, styles.tableHeader]}><Text style={styles.textHeader}>Color</Text></View>
            <View style={[styles.tableCell, styles.tableHeader]}><Text style={styles.textHeader}>Tamaño</Text></View>
            <View style={[styles.tableCell, styles.tableHeader]}><Text style={styles.textHeader}>Precio U.</Text></View>
            <View style={[styles.tableCell, styles.tableHeader]}><Text style={styles.textHeader}>Subtotal</Text></View>
          </View>
          {pedido.productos.map((producto, index) => (
            <View key={index} style={styles.tableRow}  >
              <View style={styles.tableCell}><Text style={styles.text}>{producto.nombre}</Text></View>
              <View style={styles.tableCell}><Text style={styles.text}>{producto.cantidad}</Text></View>
              <View style={styles.tableCell}><Text style={styles.text}>{producto.color}</Text></View>
              <View style={styles.tableCell}><Text style={styles.text}>{producto.size}</Text></View>
              <View style={styles.tableCell}><Text style={styles.text}>{formatterDolar.format(producto.precio)} </Text></View>
              <View style={styles.tableCell}><Text style={styles.text}>{formatterDolar.format(producto.cantidad * producto.precio)} </Text></View>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitleTotal}>Total: {formatterDolar.format(pedido.total)} </Text>
      </View>
    </Page>
  </Document>
);

export default OrderPdf;

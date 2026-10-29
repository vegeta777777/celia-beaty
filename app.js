/**
 * CELIA beauty — lógica de la tienda.
 *
 * Módulos (todos en JavaScript estándar, sin dependencias):
 *   CONFIG    → constantes de negocio (WhatsApp, cupones, claves de storage)
 *   Storage   → lectura/escritura segura en localStorage
 *   Catalog   → productos y renderizado del catálogo + búsqueda
 *   Cart      → estado del carrito (agregar, sumar, restar, eliminar)
 *   Pricing   → subtotal, descuento y total
 *   WhatsApp  → generación de URLs codificadas para wa.me
 *   UI        → drawer, modales, toast, iconos
 *   Checkout  → validación del formulario y registro de la orden
 *   Admin     → panel "Base de Datos Local"
 */
(function () {
  'use strict';

  /* ============================== CONFIG ============================== */
  const CONFIG = {
    whatsappNumber: '14085051897',
    currency: 'USD',
    locale: 'en-US',
    coupons: {
      CELIA10: { rate: 0.10, label: '10%' },
    },
    storageKeys: {
      cart: 'celia_cart',
      coupon: 'celia_coupon',
      customers: 'celia_customers',
      orders: 'celia_orders',
    },
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const money = (n) =>
    new Intl.NumberFormat(CONFIG.locale, { style: 'currency', currency: CONFIG.currency }).format(n);

  const round2 = (n) => Math.round(n * 100) / 100;


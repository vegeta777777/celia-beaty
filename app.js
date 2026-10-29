/**
 * CELIA beauty — Store business logic.
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

  const escapeHTML = (value) =>
    String(value ?? '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));

  /* ============================== STORAGE ============================= */
  const Storage = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (_) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (_) {
        return false;
      }
    },
    remove(key) {
      try { localStorage.removeItem(key); } catch (_) {}
    },
  };

  /* ============================== CATALOG ============================= */
  const Catalog = {
    products: [
      {
        id: 'suero-hialuronico',
        name: 'Suero Hidratante Ácido Hialurónico',
        description: 'Hidratación profunda y efecto relleno para una piel luminosa y elástica.',
        price: 32.0,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80',
        tags: 'suero serum hidratante acido hialuronico hidratacion hyaluronic acid',
      },
      {
        id: 'gel-limpiador',
        name: 'Gel Limpiador Facial Espumoso',
        description: 'Limpieza suave que retira impurezas y exceso de grasa sin resecar.',
        price: 24.0,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
        tags: 'gel limpiador facial espumoso limpieza cleanser',
      },
      {
        id: 'crema-ceramidas',
        name: 'Crema Reparadora con Ceramidas',
        description: 'Restaura la barrera cutánea y calma la piel sensible o irritada.',
        price: 28.0,
        image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=900&q=80',
        tags: 'crema reparadora ceramidas barrera hidratante',
      },
      {
        id: 'protector-solar',
        name: 'Protector Solar Facial Fluido SPF 50+',
        description: 'Textura ultraligera de acabado invisible. Protección UVA/UVB muy alta.',
        price: 30.0,
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
        tags: 'protector solar facial fluido spf 50 bloqueador sol',
      },
      {
        id: 'contorno-ojos',
        name: 'Contorno de Ojos Revitalizante',
        description: 'Reduce bolsas y ojeras visibles, devolviendo frescura a la mirada.',
        price: 26.0,
        image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80',
        tags: 'contorno ojos revitalizante ojeras bolsas',
      },
    ],

    byId(id) {
      return this.products.find((p) => p.id === id);
    },

    normalize(text) {
      return String(text).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    },

    filter(query) {
      const q = this.normalize(query.trim());
      if (!q) return this.products;
      return this.products.filter((p) =>
        this.normalize(`${p.name} ${p.description} ${p.tags}`).includes(q)
      );
    },

    cardHTML(p) {
      return `
        <article class="group flex flex-col rounded-3xl bg-white shadow-soft overflow-hidden fade-in border border-black/5">
          <div class="relative aspect-[4/5] overflow-hidden img-fallback bg-[#F7F1EC]">
            <img src="${p.image}" alt="${escapeHTML(p.name)}" loading="lazy"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onerror="this.style.display='none'" />
            <span class="absolute top-3 left-3 rounded-full bg-white/85 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#876E79] font-semibold">CELIA beauty</span>
          </div>
          <div class="flex flex-col flex-1 p-5">
            <h3 class="font-serif text-lg leading-snug text-[#282324]">${escapeHTML(p.name)}</h3>
            <p class="text-sm text-[#7A6A66] mt-2 flex-1 leading-relaxed">${escapeHTML(p.description)}</p>
            <div class="mt-4 flex items-center justify-between gap-3">
              <span class="font-serif text-xl font-semibold text-[#282324]">${money(p.price)}</span>
            </div>
            <button type="button" data-add="${p.id}"
              class="mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded-full border border-[#282324] py-2.5 text-sm font-medium hover:bg-[#282324] hover:text-white transition active:scale-[0.98] cursor-pointer">
              <i data-lucide="plus" class="w-4 h-4"></i> Agregar al Carrito
            </button>
          </div>
        </article>`;
    },

    render(query = '') {
      const list = this.filter(query);
      const grid = $('#product-grid') || $('#catalog-grid') || document.querySelector('[data-catalog-grid]');
      if (!grid) return;
      grid.innerHTML = list.map((p) => this.cardHTML(p)).join('');

      const emptyEl = $('#empty-search');
      if (emptyEl) emptyEl.classList.toggle('hidden', list.length > 0);

      const statusEl = $('#search-status');
      if (statusEl) {
        statusEl.textContent = query.trim()
          ? `${list.length} resultado${list.length === 1 ? '' : 's'} para “${query.trim()}”`
          : '';
      }
      UI.icons();
    },
  };

  /* =============================== CART =============================== */
  const Cart = {
    items: {},
    coupon: null,

    load() {
      const saved = Storage.get(CONFIG.storageKeys.cart, {});
      this.items = Object.fromEntries(
        Object.entries(saved).filter(([id, qty]) => Catalog.byId(id) && qty > 0)
      );
      const code = Storage.get(CONFIG.storageKeys.coupon, null);
      this.coupon = code && CONFIG.coupons[code] ? code : null;
    },

    save() {
      Storage.set(CONFIG.storageKeys.cart, this.items);
      if (this.coupon) Storage.set(CONFIG.storageKeys.coupon, this.coupon);
      else Storage.remove(CONFIG.storageKeys.coupon);
    },

    add(id, qty = 1) {
      if (!Catalog.byId(id)) return;
      this.items[id] = (this.items[id] || 0) + qty;
      this.commit();
    },

    setQty(id, qty) {
      if (qty <= 0) delete this.items[id];
      else this.items[id] = qty;
      this.commit();
    },

    increment(id) { this.setQty(id, (this.items[id] || 0) + 1); },
    decrement(id) { this.setQty(id, (this.items[id] || 0) - 1); },
    remove(id) { this.setQty(id, 0); },

    clear() {
      this.items = {};
      this.coupon = null;
      this.commit();
    },

    applyCoupon(code) {
      const normalized = String(code || '').trim().toUpperCase();
      if (!CONFIG.coupons[normalized]) return false;
      this.coupon = normalized;
      this.commit();
      return true;
    },

    removeCoupon() {
      this.coupon = null;
      this.commit();
    },

    lines() {
      return Object.entries(this.items).map(([id, qty]) => {
        const product = Catalog.byId(id);
        return { id, qty, product, lineTotal: round2(product.price * qty) };
      });
    },

    count() {
      return Object.values(this.items).reduce((a, b) => a + b, 0);
    },

    isEmpty() {
      return this.count() === 0;
    },

    commit() {
      this.save();
      UI.renderCart();
    },
  };

  /* ============================== PRICING ============================= */
  const Pricing = {
    totals() {
      const subtotal = round2(Cart.lines().reduce((sum, l) => sum + l.lineTotal, 0));
      const coupon = Cart.coupon ? CONFIG.coupons[Cart.coupon] : null;
      const discount = coupon ? round2(subtotal * coupon.rate) : 0;
      const total = round2(subtotal - discount);
      return { subtotal, discount, total, coupon: Cart.coupon, couponLabel: coupon ? coupon.label : '' };
    },
  };

  /* ============================= WHATSAPP ============================= */
  const WhatsApp = {
    url(message) {
      const base = `https://wa.me/${CONFIG.whatsappNumber}`;
      return message ? `${base}?text=${encodeURIComponent(message)}` : base;
    },

    contactMessage() {
      return 'Hola CELIA beauty 👋, me gustaría recibir asesoría sobre sus productos.';
    },

    orderMessage(order) {
      const lines = order.items
        .map((i) => `• ${i.qty} x ${i.name} — ${money(i.lineTotal)}`)
        .join('\n');

      const parts = [
        `*NUEVO PEDIDO — CELIA beauty*`,
        `Orden: ${order.id}`,
        `Fecha: ${new Date(order.createdAt).toLocaleString('es-US')}`,
        '',
        `*Cliente:* ${order.customer.name}`,
        `*Teléfono:* ${order.customer.phone}`,
        `*Correo:* ${order.customer.email}`,
        `*Dirección de entrega:* ${order.customer.address}`,
        '',
        `*Productos:*`,
        lines,
        '',
        `Subtotal: ${money(order.subtotal)}`,
      ];
      if (order.discount > 0) parts.push(`Descuento (${order.coupon}): −${money(order.discount)}`);
      parts.push(`*TOTAL A PAGAR: ${money(order.total)}*`, '', `Método de pago: ${order.payment}`);
      return parts.join('\n');
    },
  };

  /* ================================ UI ================================ */
  const UI = {
    openPanel: null,

    icons() {
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    },

    toast(text) {
      const el = $('#toast');
      const textEl = $('#toast-text');
      if (el && textEl) {
        textEl.textContent = text;
        el.classList.remove('hidden');
        clearTimeout(this._toastTimer);
        this._toastTimer = setTimeout(() => el.classList.add('hidden'), 2200);
      }
    },

    lockScroll(lock) {
      document.body.classList.toggle('no-scroll', lock);
      const overlay = $('#overlay');
      if (overlay) overlay.classList.toggle('hidden', !lock);
    },

    open(id) {
      if (this.openPanel) this.close(false);
      const el = document.getElementById(id);
      if (!el) return;
      if (id === 'cart-drawer') {
        el.classList.remove('translate-x-full');
      } else {
        el.classList.remove('hidden');
        el.classList.add('flex');
      }
      el.setAttribute('aria-hidden', 'false');
      this.openPanel = id;
      this.lockScroll(true);
      const focusable = el.querySelector('input, button:not([data-close]), textarea');
      if (focusable) setTimeout(() => focusable.focus({ preventScroll: true }), 50);
    },

    close(unlock = true) {
      const id = this.openPanel;
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      if (id === 'cart-drawer') {
        el.classList.add('translate-x-full');
      } else {
        el.classList.add('hidden');
        el.classList.remove('flex');
      }
      el.setAttribute('aria-hidden', 'true');
      this.openPanel = null;
      if (unlock) this.lockScroll(false);
    },

    bumpBadge() {
      const badge = $('#cart-badge');
      if (!badge) return;
      badge.classList.remove('badge-pop');
      void badge.offsetWidth;
      badge.classList.add('badge-pop');
    },

    renderCart() {
      const count = Cart.count();
      const badge = $('#cart-badge');
      if (badge) {
        badge.textContent = count > 99 ? '99+' : String(count);
        badge.classList.toggle('opacity-0', count === 0);
      }

      const empty = Cart.isEmpty();
      const cartItems = $('#cart-items');
      const cartEmpty = $('#cart-empty');
      const checkoutBtn = $('#checkout-button');

      if (cartItems) cartItems.classList.toggle('hidden', empty);
      if (cartEmpty) {
        cartEmpty.classList.toggle('hidden', !empty);
        cartEmpty.classList.toggle('flex', empty);
      }
      if (checkoutBtn) checkoutBtn.disabled = empty;

      if (cartItems) {
        cartItems.innerHTML = Cart.lines().map((l) => `
          <div class="flex gap-4 fade-in py-3 border-b border-black/5">
            <div class="w-16 h-20 rounded-xl overflow-hidden shrink-0 bg-[#F7F1EC]">
              <img src="${l.product.image}" alt="" class="w-full h-full object-cover" onerror="this.style.display='none'" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <p class="font-serif text-sm leading-snug">${escapeHTML(l.product.name)}</p>
                <button type="button" data-remove="${l.id}" class="p-1 text-[#7A6A66] hover:text-red-600" aria-label="Eliminar ${escapeHTML(l.product.name)}">
                  <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
              </div>
              <p class="text-xs text-[#7A6A66] mt-0.5">${money(l.product.price)} c/u</p>
              <div class="mt-2 flex items-center justify-between">
                <div class="inline-flex items-center rounded-full border border-[#EADFD6] bg-white">
                  <button type="button" data-dec="${l.id}" class="w-7 h-7 flex items-center justify-center hover:text-rose" aria-label="Restar uno"><i data-lucide="minus" class="w-3 h-3"></i></button>
                  <span class="w-7 text-center text-xs font-medium" aria-live="polite">${l.qty}</span>
                  <button type="button" data-inc="${l.id}" class="w-7 h-7 flex items-center justify-center hover:text-rose" aria-label="Sumar uno"><i data-lucide="plus" class="w-3.5 h-3.5"></i></button>
                </div>
                <span class="font-semibold text-xs">${money(l.lineTotal)}</span>
              </div>
            </div>
          </div>`).join('');
      }

      this.renderTotals();
      this.icons();
    },

    renderTotals() {
      const t = Pricing.totals();
      const label = t.coupon ? `(${t.coupon} · ${t.couponLabel})` : '';

      const cartSub = $('#cart-subtotal');
      const cartDisc = $('#cart-discount');
      const cartDiscLbl = $('#cart-discount-label');
      const cartTot = $('#cart-total');

      if (cartSub) cartSub.textContent = money(t.subtotal);
      if (cartDisc) cartDisc.textContent = `−${money(t.discount)}`;
      if (cartDiscLbl) cartDiscLbl.textContent = label;
      if (cartTot) cartTot.textContent = money(t.total);

      const coSub = $('#co-subtotal');
      const coDisc = $('#co-discount');
      const coDiscLbl = $('#co-discount-label');
      const coTot = $('#co-total');

      if (coSub) coSub.textContent = money(t.subtotal);
      if (coDisc) coDisc.textContent = `−${money(t.discount)}`;
      if (coDiscLbl) coDiscLbl.textContent = label;
      if (coTot) coTot.textContent = money(t.total);

      const msg = $('#coupon-message');
      const couponInput = $('#coupon-input');

      if (msg) {
        if (t.coupon) {
          msg.innerHTML = `<span class="text-emerald-700">Cupón <b>${escapeHTML(t.coupon)}</b> aplicado.</span>
            <button type="button" id="coupon-remove" class="underline text-[#7A6A66] ml-1">Quitar</button>`;
          if (couponInput) couponInput.value = t.coupon;
        } else if ($('#coupon-remove')) {
          msg.textContent = '';
          if (couponInput) couponInput.value = '';
        }
      }

      const checkoutItems = $('#checkout-items');
      if (checkoutItems) {
        checkoutItems.innerHTML = Cart.lines().map((l) => `
          <li class="flex justify-between gap-3 text-xs">
            <span><span class="text-[#7A6A66]">${l.qty} ×</span> ${escapeHTML(l.product.name)}</span>
            <span class="font-medium whitespace-nowrap">${money(l.lineTotal)}</span>
          </li>`).join('');
      }
    },
  };

  /* ============================= CHECKOUT ============================= */
  const Checkout = {
    rules: {
      name: (v) => (v.trim().length >= 3 && /\s/.test(v.trim()) ? '' : 'Ingresa tu nombre y apellido.'),
      phone: (v) => (v.replace(/\D/g, '').length >= 7 && /^[\d\s()+\-.]+$/.test(v.trim()) ? '' : 'Ingresa un teléfono válido.'),
      email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Ingresa un correo válido.'),
      address: (v) => (v.trim().length >= 8 ? '' : 'Ingresa una dirección completa.'),
      card: (v) => (Checkout.luhn(v.replace(/\s/g, '')) ? '' : 'Número de tarjeta inválido.'),
      exp: (v) => (Checkout.validExpiry(v) ? '' : 'Fecha inválida.'),
      cvc: (v) => (/^\d{3,4}$/.test(v.trim()) ? '' : 'CVC inválido.'),
    },

    luhn(num) {
      if (!/^\d{13,19}$/.test(num)) return false;
      let sum = 0;
      let dbl = false;
      for (let i = num.length - 1; i >= 0; i--) {
        let d = Number(num[i]);
        if (dbl) { d *= 2; if (d > 9) d -= 9; }
        sum += d;
        dbl = !dbl;
      }
      return sum % 10 === 0;
    },

    validExpiry(v) {
      const m = /^(\d{2})\/(\d{2})$/.exec(v.trim());
      if (!m) return false;
      const month = Number(m[1]);
      const year = 2000 + Number(m[2]);
      if (month < 1 || month > 12) return false;
      const now = new Date();
      return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);
    },

    paymentMethod() {
      const checked = $('input[name="payment"]:checked');
      return checked ? checked.value : '';
    },

    isCard() {
      return this.paymentMethod() === 'Tarjeta (simulado)';
    },

    setError(input, message) {
      if (!input) return;
      const err = input.parentElement ? input.parentElement.querySelector('.field-error') : null;
      input.classList.toggle('border-red-400', !!message);
      input.setAttribute('aria-invalid', message ? 'true' : 'false');
      if (err) {
        err.textContent = message;
        err.classList.toggle('hidden', !message);
      }
    },

    validateField(input) {
      if (!input) return true;
      const rule = this.rules[input.name];
      if (!rule) return true;
      const message = rule(input.value);
      this.setError(input, message);
      return !message;
    },

    validate() {
      const form = $('#checkout-form');
      if (!form) return false;
      const fields = ['name', 'phone', 'email', 'address'];
      if (this.isCard()) fields.push('card', 'exp', 'cvc');

      let firstInvalid = null;
      fields.forEach((name) => {
        const input = form.elements[name];
        if (input && !this.validateField(input) && !firstInvalid) firstInvalid = input;
      });

      const payErr = $('#payment-error');
      const hasPayment = !!this.paymentMethod();
      if (payErr) {
        payErr.textContent = hasPayment ? '' : 'Selecciona un método de pago.';
        payErr.classList.toggle('hidden', hasPayment);
      }

      if (firstInvalid) firstInvalid.focus();
      return !firstInvalid && hasPayment;
    },

    buildOrder() {
      const form = $('#checkout-form');
      const t = Pricing.totals();
      const customer = {
        name: form.elements.name.value.trim(),
        phone: form.elements.phone.value.trim(),
        email: form.elements.email.value.trim().toLowerCase(),
        address: form.elements.address.value.trim(),
      };
      const payment = this.paymentMethod();
      const order = {
        id: `CB-${Date.now().toString(36).toUpperCase()}`,
        createdAt: new Date().toISOString(),
        customer,
        items: Cart.lines().map((l) => ({
          id: l.id, name: l.product.name, price: l.product.price, qty: l.qty, lineTotal: l.lineTotal,
        })),
        subtotal: t.subtotal,
        coupon: t.coupon,
        discount: t.discount,
        total: t.total,
        payment,
        status: 'Pendiente',
      };
      if (payment === 'Tarjeta (simulado)') {
        const digits = form.elements.card.value.replace(/\D/g, '');
        order.cardLast4 = digits.slice(-4);
        order.payment = `Tarjeta (simulado) •••• ${order.cardLast4}`;
      }
      return order;
    },

    persist(order) {
      const orders = Storage.get(CONFIG.storageKeys.orders, []);
      orders.push(order);
      Storage.set(CONFIG.storageKeys.orders, orders);

      const customers = Storage.get(CONFIG.storageKeys.customers, []);
      const key = order.customer.email;
      const existing = customers.find((c) => c.email === key);
      if (existing) {
        Object.assign(existing, order.customer, {
          updatedAt: order.createdAt,
          ordersCount: (existing.ordersCount || 0) + 1,
          totalSpent: round2((existing.totalSpent || 0) + order.total),
        });
      } else {
        customers.push({
          ...order.customer,
          id: `CL-${String(customers.length + 1).padStart(3, '0')}`,
          createdAt: order.createdAt,
          updatedAt: order.createdAt,
          ordersCount: 1,
          totalSpent: order.total,
        });
      }
      Storage.set(CONFIG.storageKeys.customers, customers);
    },

    submit(event) {
      event.preventDefault();
      if (Cart.isEmpty()) {
        UI.toast('Tu carrito está vacío.');
        return;
      }
      if (!this.validate()) return;

      const order = this.buildOrder();
      this.persist(order);
      const url = WhatsApp.url(WhatsApp.orderMessage(order));

      Cart.clear();
      $('#checkout-form').reset();
      this.toggleCardFields();
      UI.close();
      UI.toast(`Pedido ${order.id} registrado. Abriendo WhatsApp…`);

      setTimeout(() => { window.location.href = url; }, 700);
    },

    toggleCardFields() {
      const show = this.isCard();
      const cardContainer = $('#card-fields');
      if (cardContainer) cardContainer.classList.toggle('hidden', !show);
      if (!show) {
        const form = $('#checkout-form');
        if (form) ['card', 'exp', 'cvc'].forEach((n) => this.setError(form.elements[n], ''));
      }
    },

    bind() {
      const form = $('#checkout-form');
      if (!form) return;
      form.addEventListener('submit', (e) => this.submit(e));
      form.addEventListener('change', (e) => {
        if (e.target.name === 'payment') this.toggleCardFields();
      });
      form.addEventListener('focusout', (e) => {
        if (e.target.name && e.target.value) this.validateField(e.target);
      });
      form.addEventListener('input', (e) => {
        const t = e.target;
        if (t.name === 'card') {
          t.value = t.value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
        } else if (t.name === 'exp') {
          const d = t.value.replace(/\D/g, '').slice(0, 4);
          t.value = d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
        } else if (t.name === 'cvc') {
          t.value = t.value.replace(/\D/g, '').slice(0, 4);
        }
        if (t.getAttribute('aria-invalid') === 'true') this.validateField(t);
      });
    },
  };

  /* =============================== ADMIN ============================== */
  const Admin = {
    tab: 'customers',

    data() {
      return {
        customers: Storage.get(CONFIG.storageKeys.customers, []),
        orders: Storage.get(CONFIG.storageKeys.orders, []),
      };
    },

    formatDate(iso) {
      try { return new Date(iso).toLocaleString('es-US', { dateStyle: 'short', timeStyle: 'short' }); }
      catch (_) { return iso; }
    },

    render() {
      const { customers, orders } = this.data();
      const revenue = round2(orders.reduce((s, o) => s + (o.total || 0), 0));

      const statsEl = $('#admin-stats');
      if (statsEl) {
        statsEl.innerHTML = [
          ['Clientes', customers.length],
          ['Órdenes', orders.length],
          ['Ventas', money(revenue)],
        ].map(([label, value]) => `
          <div class="rounded-2xl bg-[#F7F1EC] px-4 py-3">
            <p class="text-[11px] uppercase tracking-wider text-[#7A6A66]">${label}</p>
            <p class="font-serif text-xl sm:text-2xl mt-0.5">${value}</p>
          </div>`).join('');
      }

      $$('.admin-tab').forEach((b) => {
        const active = b.dataset.tab === this.tab;
        b.classList.toggle('bg-white', active);
        b.classList.toggle('shadow-sm', active);
        b.classList.toggle('text-[#7A6A66]', !active);
        b.setAttribute('aria-selected', String(active));
      });

      const td = 'px-4 py-3 align-top';
      let head;
      let rows;

      if (this.tab === 'customers') {
        head = ['Nombre', 'Teléfono', 'Correo', 'Dirección', 'Órdenes', 'Total gastado', 'Último pedido'];
        rows = customers.slice().reverse().map((c) => `
          <tr class="hover:bg-[#F7F1EC]/60">
            <td class="${td} font-medium">${escapeHTML(c.name)}</td>
            <td class="${td} whitespace-nowrap">${escapeHTML(c.phone)}</td>
            <td class="${td}">${escapeHTML(c.email)}</td>
            <td class="${td} min-w-[12rem]">${escapeHTML(c.address)}</td>
            <td class="${td} text-center">${Number(c.ordersCount) || 0}</td>
            <td class="${td} whitespace-nowrap">${money(Number(c.totalSpent) || 0)}</td>
            <td class="${td} whitespace-nowrap text-[#7A6A66]">${escapeHTML(this.formatDate(c.updatedAt))}</td>
          </tr>`);
      } else {
        head = ['Orden', 'Fecha', 'Cliente', 'Productos', 'Pago', 'Descuento', 'Total'];
        rows = orders.slice().reverse().map((o) => `
          <tr class="hover:bg-[#F7F1EC]/60">
            <td class="${td} font-mono text-xs whitespace-nowrap">${escapeHTML(o.id)}</td>
            <td class="${td} whitespace-nowrap text-[#7A6A66]">${escapeHTML(this.formatDate(o.createdAt))}</td>
            <td class="${td}"><p class="font-medium">${escapeHTML(o.customer?.name)}</p><p class="text-xs text-[#7A6A66]">${escapeHTML(o.customer?.phone)}</p></td>
            <td class="${td} min-w-[14rem]">${(o.items || []).map((i) => `${Number(i.qty) || 0} × ${escapeHTML(i.name)}`).join('<br>')}</td>
            <td class="${td}">${escapeHTML(o.payment)}</td>
            <td class="${td} whitespace-nowrap text-[#876E79]">${o.discount ? `−${money(o.discount)} <span class="text-xs">(${escapeHTML(o.coupon)})</span>` : '—'}</td>
            <td class="${td} whitespace-nowrap font-semibold">${money(Number(o.total) || 0)}</td>
          </tr>`);
      }

      const thead = $('#admin-thead');
      const tbody = $('#admin-tbody');
      const emptyEl = $('#admin-empty');

      if (thead) thead.innerHTML = `<tr>${head.map((h) => `<th class="px-4 py-3 font-semibold">${h}</th>`).join('')}</tr>`;
      if (tbody) tbody.innerHTML = rows.join('');
      if (emptyEl) emptyEl.classList.toggle('hidden', rows.length > 0);
    },

    exportJSON() {
      const blob = new Blob([JSON.stringify(this.data(), null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `celia-beauty-db-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    },

    clear() {
      if (!confirm('¿Eliminar todos los clientes y órdenes guardados en este navegador? Esta acción no se puede deshacer.')) return;
      Storage.remove(CONFIG.storageKeys.customers);
      Storage.remove(CONFIG.storageKeys.orders);
      this.render();
      UI.toast('Base de datos local vaciada.');
    },

    bind() {
      const adminBtn = $('#admin-button');
      if (adminBtn) {
        adminBtn.addEventListener('click', () => {
          this.render();
          UI.open('admin-modal');
          UI.icons();
        });
      }
      $$('.admin-tab').forEach((b) =>
        b.addEventListener('click', () => { this.tab = b.dataset.tab; this.render(); })
      );
      const exportBtn = $('#admin-export');
      if (exportBtn) exportBtn.addEventListener('click', () => this.exportJSON());
      const clearBtn = $('#admin-clear');
      if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
    },
  };

  /* =============================== INIT =============================== */
  function bindGlobalEvents() {
    const searchInput = $('#search-input');
    if (searchInput) searchInput.addEventListener('input', (e) => Catalog.render(e.target.value));

    const productGrid = $('#product-grid') || $('#catalog-grid') || document.querySelector('[data-catalog-grid]');
    if (productGrid) {
      productGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-add]');
        if (!btn) return;
        const product = Catalog.byId(btn.dataset.add);
        if (!product) return;
        Cart.add(product.id);
        UI.bumpBadge();
        UI.toast(`${product.name} agregado al carrito`);
      });
    }

    const cartItems = $('#cart-items');
    if (cartItems) {
      cartItems.addEventListener('click', (e) => {
        const inc = e.target.closest('[data-inc]');
        const dec = e.target.closest('[data-dec]');
        const rem = e.target.closest('[data-remove]');
        if (inc) Cart.increment(inc.dataset.inc);
        else if (dec) Cart.decrement(dec.dataset.dec);
        else if (rem) Cart.remove(rem.dataset.remove);
      });
    }

    const couponForm = $('#coupon-form');
    if (couponForm) {
      couponForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = $('#coupon-input');
        const msg = $('#coupon-message');
        if (!input || !msg) return;
        if (!input.value.trim()) {
          msg.innerHTML = '<span class="text-[#7A6A66]">Escribe un código de descuento.</span>';
          return;
        }
        if (Cart.applyCoupon(input.value)) {
          UI.toast('¡Cupón aplicado! 10% de descuento');
        } else {
          msg.innerHTML = '<span class="text-red-600">Código no válido. Prueba con CELIA10.</span>';
        }
      });
    }

    const couponMessage = $('#coupon-message');
    if (couponMessage) {
      couponMessage.addEventListener('click', (e) => {
        if (e.target.id !== 'coupon-remove') return;
        Cart.removeCoupon();
        const input = $('#coupon-input');
        if (input) input.value = '';
        couponMessage.innerHTML = '<span class="text-[#7A6A66]">Cupón eliminado.</span>';
      });
    }

    $$('[data-copy-coupon]').forEach((b) =>
      b.addEventListener('click', () => {
        if (navigator.clipboard) navigator.clipboard.writeText('CELIA10').catch(() => {});
        UI.toast('Cupón CELIA10 copiado');
      })
    );

    const cartBtn = $('#cart-button');
    if (cartBtn) cartBtn.addEventListener('click', () => UI.open('cart-drawer'));

    const checkoutBtn = $('#checkout-button');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (Cart.isEmpty()) return;
        UI.renderTotals();
        UI.open('checkout-modal');
      });
    }

    $$('[data-close]').forEach((b) => b.addEventListener('click', () => UI.close()));

    const overlay = $('#overlay');
    if (overlay) overlay.addEventListener('click', () => UI.close());

    ['checkout-modal', 'admin-modal'].forEach((id) => {
      const modal = document.getElementById(id);
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target.id === id) UI.close();
        });
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') UI.close();
    });

    const waContact = $('#whatsapp-contact');
    if (waContact) waContact.href = WhatsApp.url(WhatsApp.contactMessage());

    window.addEventListener('storage', (e) => {
      if (e.key === CONFIG.storageKeys.cart || e.key === CONFIG.storageKeys.coupon) {
        Cart.load();
        UI.renderCart();
      }
    });
  }

  function init() {
    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    Cart.load();
    Catalog.render();
    UI.renderCart();
    bindGlobalEvents();
    Checkout.bind();
    Admin.bind();
    UI.icons();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.CeliaBeauty = { CONFIG, Cart, Pricing, WhatsApp, Storage };
})();

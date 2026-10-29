<!DOCTYPE html>
<html lang="es" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CELIA beauty · Dermocosmética y Estética</title>
  <meta name="description" content="CELIA beauty — dermocosmética y cuidado facial. Sueros, limpiadores, cremas reparadoras, protección solar y contorno de ojos." />
  <meta name="theme-color" content="#F7F1EC" />

  <!-- Tipografías: Playfair Display (títulos) + Inter (texto y botones) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet" />

  <!-- Tailwind CSS vía CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            serif: ['"Playfair Display"', 'Georgia', 'serif'],
            sans: ['Inter', 'system-ui', 'sans-serif'],
          },
          colors: {
            cream: '#F7F1EC',
            sand: '#EADFD6',
            blush: '#D9A9A0',
            rose: { DEFAULT: '#B76E79', dark: '#9A5762' },
            ink: '#2B2324',
            taupe: '#7A6A66',
          },
          boxShadow: {
            soft: '0 10px 30px -12px rgba(43, 35, 36, 0.18)',
          },
        },
      },
    };
  </script>

  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js"></script>

  <style>
    body { -webkit-font-smoothing: antialiased; }
    .no-scroll { overflow: hidden; }
    .img-fallback {
      background: radial-gradient(circle at 30% 30%, #fff 0%, #F3E6DF 45%, #E4CFC5 100%);
    }
    .fade-in { animation: fadeIn .35s ease both; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
    .badge-pop { animation: pop .3s ease; }
    @keyframes pop { 0% { transform: scale(1); } 50% { transform: scale(1.35); } 100% { transform: scale(1); } }
    input:focus, select:focus, textarea:focus { outline: none; }
  </style>
</head>

<body class="bg-cream font-sans text-ink">

  <!-- ===================== BANNER DE PROMOCIONES ===================== -->
  <div class="bg-ink text-cream text-xs sm:text-sm">
    <div class="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-center">
      <i data-lucide="sparkles" class="w-4 h-4 text-blush shrink-0"></i>
      <p>Usa el cupón <button type="button" data-copy-coupon class="font-semibold tracking-widest text-blush underline decoration-dotted underline-offset-4 hover:text-white">CELIA10</button> para un 10% de descuento en tu orden</p>
    </div>
  </div>

  <!-- ============================ HEADER ============================ -->
  <header class="sticky top-0 z-30 bg-cream/90 backdrop-blur border-b border-sand">
    <div class="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-wrap items-center gap-3 sm:gap-6">

      <!-- Logotipo tipográfico con espacio para isotipo -->
      <a href="#" class="flex items-center gap-3 shrink-0" aria-label="CELIA beauty — inicio">
        <span id="isotipo" class="w-10 h-10 rounded-full border border-rose/40 bg-white flex items-center justify-center font-serif italic text-rose text-lg" aria-hidden="true">C</span>
        <span class="leading-none">
          <span class="font-serif text-2xl sm:text-[1.7rem] font-semibold tracking-[0.18em]">CELIA</span>
          <span class="font-serif italic text-rose text-lg sm:text-xl ml-1">beauty</span>
        </span>
      </a>

      <!-- Barra de búsqueda -->
      <form id="search-form" class="order-3 sm:order-none w-full sm:w-auto sm:flex-1 sm:max-w-md sm:mx-auto" role="search" onsubmit="return false;">
        <label for="search-input" class="sr-only">Buscar productos</label>
        <div class="relative">
          <i data-lucide="search" class="w-4 h-4 text-taupe absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"></i>
          <input id="search-input" type="search" placeholder="@vargasg04" autocomplete="off"
            class="w-full rounded-full bg-white border border-sand pl-11 pr-4 py-2.5 text-sm placeholder:text-taupe/70 focus:border-rose focus:ring-2 focus:ring-rose/20 transition" />
        </div>
      </form>

      <div class="flex items-center gap-2 sm:gap-3 ml-auto">
        <!-- Contacto WhatsApp -->
        <a id="whatsapp-contact" href="https://wa.me/14085051897" target="_blank" rel="noopener"
          class="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-3 sm:px-4 py-2.5 text-sm font-medium hover:border-rose hover:text-rose transition"
          aria-label="Contactar por WhatsApp al +1 (408) 505-1897">
          <i data-lucide="message-circle" class="w-4 h-4"></i>
          <span class="hidden md:inline">WhatsApp</span>
        </a>

        <!-- Carrito con badge -->
        <button id="cart-button" type="button"
          class="relative inline-flex items-center gap-2 rounded-full bg-ink text-cream px-3 sm:px-4 py-2.5 text-sm font-medium hover:bg-rose-dark transition"
          aria-label="Abrir carrito de compras">
          <i data-lucide="shopping-bag" class="w-4 h-4"></i>
          <span class="hidden md:inline">Carrito</span>
          <span id="cart-badge" class="absolute -top-1.5 -right-1.5 min-w-[1.35rem] h-[1.35rem] px-1 rounded-full bg-rose text-white text-[11px] font-semibold flex items-center justify-center ring-2 ring-cream" aria-live="polite">0</span>
        </button>
      </div>
    </div>
  </header>

  <!-- ============================= HERO ============================= -->
  <section class="max-w-7xl mx-auto px-4 pt-10 sm:pt-16 pb-8 grid md:grid-cols-2 gap-8 items-center">
    <div>
      <p class="text-xs uppercase tracking-[0.3em] text-rose font-semibold mb-4">Dermocosmética · Estética</p>
      <h1 class="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.08]">Tu piel, <em class="text-rose">en su mejor</em> versión.</h1>
      <p class="mt-5 text-taupe max-w-md leading-relaxed">Fórmulas esenciales seleccionadas por CELIA beauty para hidratar, reparar y proteger. Rutinas simples, resultados visibles.</p>
      <div class="mt-7 flex flex-wrap gap-3">
        <a href="#catalogo" class="inline-flex items-center gap-2 rounded-full bg-ink text-cream px-6 py-3 text-sm font-medium hover:bg-rose-dark transition">
          Ver catálogo <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </a>
        <a href="https://wa.me/14085051897" target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-medium hover:border-rose hover:text-rose transition">
          Asesoría personalizada
        </a>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-3 text-center">
      <div class="rounded-2xl bg-white p-5 shadow-soft"><i data-lucide="droplets" class="w-6 h-6 mx-auto text-rose"></i><p class="mt-3 font-serif text-lg">Hidratación</p><p class="text-xs text-taupe mt-1">Ácido hialurónico</p></div>
      <div class="rounded-2xl bg-white p-5 shadow-soft translate-y-4"><i data-lucide="shield-check" class="w-6 h-6 mx-auto text-rose"></i><p class="mt-3 font-serif text-lg">Protección</p><p class="text-xs text-taupe mt-1">SPF 50+</p></div>
      <div class="rounded-2xl bg-white p-5 shadow-soft"><i data-lucide="heart-handshake" class="w-6 h-6 mx-auto text-rose"></i><p class="mt-3 font-serif text-lg">Reparación</p><p class="text-xs text-taupe mt-1">Ceramidas</p></div>
    </div>
  </section>

  <!-- =========================== CATÁLOGO =========================== -->
  <main id="catalogo" class="max-w-7xl mx-auto px-4 py-10 sm:py-14">
    <div class="flex flex-wrap items-end justify-between gap-3 mb-8">
      <div>
        <h2 class="font-serif text-3xl sm:text-4xl">Catálogo esencial</h2>
        <p class="text-taupe mt-2 text-sm">5 productos clave para una rutina completa.</p>
      </div>
      <p id="search-status" class="text-sm text-taupe" aria-live="polite"></p>
    </div>

    <div id="product-grid" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"></div>

    <div id="empty-search" class="hidden text-center py-16">
      <i data-lucide="search-x" class="w-10 h-10 mx-auto text-blush"></i>
      <p class="font-serif text-xl mt-4">No encontramos productos</p>
      <p class="text-sm text-taupe mt-1">Prueba con otra palabra, por ejemplo “suero” o “SPF”.</p>
    </div>
  </main>

  <!-- ============================ FOOTER ============================ -->
  <footer class="border-t border-sand mt-10">
    <div class="max-w-7xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-3 text-sm">
      <div>
        <p class="font-serif text-xl tracking-[0.18em] font-semibold">CELIA <span class="italic text-rose tracking-normal font-normal">beauty</span></p>
        <p class="text-taupe mt-2 max-w-xs">Dermocosmética y estética con asesoría cercana.</p>
      </div>
      <div class="space-y-2">
        <p class="font-semibold">Contacto</p>
        <a href="https://wa.me/14085051897" target="_blank" rel="noopener" class="flex items-center gap-2 text-taupe hover:text-rose"><i data-lucide="phone" class="w-4 h-4"></i> +1 (408) 505-1897</a>
        <p class="flex items-center gap-2 text-taupe"><i data-lucide="at-sign" class="w-4 h-4"></i> vargasg04</p>
      </div>
      <div class="space-y-2">
        <p class="font-semibold">Pagos aceptados</p>
        <p class="text-taupe">WhatsApp · Zelle / Transferencia · Tarjeta</p>
      </div>
    </div>
    <div class="border-t border-sand">
      <div class="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3 text-xs text-taupe">
        <p>© <span id="year"></span> CELIA beauty. Todos los derechos reservados.</p>
        <button id="admin-button" type="button" class="inline-flex items-center gap-1.5 opacity-60 hover:opacity-100 hover:text-rose transition">
          <i data-lucide="database" class="w-3.5 h-3.5"></i> Base de Datos Local
        </button>
      </div>
    </div>
  </footer>

  <!-- Overlay compartido -->
  <div id="overlay" class="fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px] hidden" aria-hidden="true"></div>

  <!-- ====================== DRAWER DEL CARRITO ====================== -->
  <aside id="cart-drawer" class="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-cream shadow-2xl translate-x-full transition-transform duration-300 flex flex-col"
    role="dialog" aria-modal="true" aria-labelledby="cart-title" aria-hidden="true">
    <div class="flex items-center justify-between px-6 py-5 border-b border-sand">
      <h2 id="cart-title" class="font-serif text-2xl">Tu carrito</h2>
      <button type="button" data-close class="p-2 rounded-full hover:bg-sand" aria-label="Cerrar carrito"><i data-lucide="x" class="w-5 h-5"></i></button>
    </div>

    <div id="cart-items" class="flex-1 overflow-y-auto px-6 py-4 space-y-4"></div>

    <div id="cart-empty" class="hidden flex-1 flex-col items-center justify-center text-center px-6">
      <i data-lucide="shopping-bag" class="w-12 h-12 text-blush"></i>
      <p class="font-serif text-xl mt-4">Tu carrito está vacío</p>
      <p class="text-sm text-taupe mt-1">Agrega productos del catálogo para comenzar.</p>
    </div>

    <div id="cart-footer" class="border-t border-sand px-6 py-5 space-y-4 bg-white/60">
      <!-- Cupón -->
      <form id="coupon-form" class="flex gap-2" novalidate>
        <label for="coupon-input" class="sr-only">Código de descuento</label>
        <input id="coupon-input" type="text" placeholder="Código de descuento" autocomplete="off"
          class="flex-1 rounded-full border border-sand bg-white px-4 py-2.5 text-sm uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal focus:border-rose focus:ring-2 focus:ring-rose/20" />
        <button type="submit" class="rounded-full border border-ink px-4 py-2.5 text-sm font-medium hover:bg-ink hover:text-cream transition">Aplicar</button>
      </form>
      <p id="coupon-message" class="text-xs -mt-2 min-h-[1rem]" aria-live="polite"></p>

      <!-- Desglose -->
      <dl class="space-y-2 text-sm">
        <div class="flex justify-between"><dt class="text-taupe">Subtotal</dt><dd id="cart-subtotal" class="font-medium">$0.00</dd></div>
        <div class="flex justify-between"><dt class="text-taupe">Descuento aplicado <span id="cart-discount-label" class="text-rose"></span></dt><dd id="cart-discount" class="font-medium text-rose">−$0.00</dd></div>
        <div class="flex justify-between pt-3 border-t border-sand text-base"><dt class="font-semibold">Total a pagar</dt><dd id="cart-total" class="font-serif text-2xl font-semibold">$0.00</dd></div>
      </dl>

      <button id="checkout-button" type="button"
        class="w-full inline-flex items-center justify-center gap-2 rounded-full bg-rose text-white py-3.5 text-sm font-semibold tracking-wide hover:bg-rose-dark transition disabled:opacity-40 disabled:cursor-not-allowed">
        Pasar al Checkout <i data-lucide="arrow-right" class="w-4 h-4"></i>
      </button>
    </div>
  </aside>

  <!-- ======================== MODAL CHECKOUT ======================== -->
  <div id="checkout-modal" class="fixed inset-0 z-50 hidden items-start sm:items-center justify-center overflow-y-auto p-0 sm:p-6"
    role="dialog" aria-modal="true" aria-labelledby="checkout-title" aria-hidden="true">
    <div class="relative w-full max-w-4xl bg-cream sm:rounded-3xl shadow-2xl fade-in min-h-full sm:min-h-0">
      <div class="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-sand">
        <div>
          <p class="text-[11px] uppercase tracking-[0.3em] text-rose font-semibold">Checkout</p>
          <h2 id="checkout-title" class="font-serif text-2xl sm:text-3xl">Datos de entrega y pago</h2>
        </div>
        <button type="button" data-close class="p-2 rounded-full hover:bg-sand" aria-label="Cerrar checkout"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>

      <div class="grid md:grid-cols-5">
        <form id="checkout-form" class="md:col-span-3 px-6 sm:px-8 py-6 space-y-5" novalidate>
          <div>
            <label for="f-name" class="block text-sm font-medium mb-1.5">Nombre completo *</label>
            <input id="f-name" name="name" type="text" autocomplete="name" required minlength="3"
              class="w-full rounded-xl border border-sand bg-white px-4 py-3 text-sm focus:border-rose focus:ring-2 focus:ring-rose/20" />
            <p class="field-error hidden text-xs text-red-600 mt-1"></p>
          </div>
          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label for="f-phone" class="block text-sm font-medium mb-1.5">Teléfono *</label>
              <input id="f-phone" name="phone" type="tel" autocomplete="tel" required placeholder="+1 (408) 555-0123"
                class="w-full rounded-xl border border-sand bg-white px-4 py-3 text-sm focus:border-rose focus:ring-2 focus:ring-rose/20" />
              <p class="field-error hidden text-xs text-red-600 mt-1"></p>
            </div>
            <div>
              <label for="f-email" class="block text-sm font-medium mb-1.5">Correo electrónico *</label>
              <input id="f-email" name="email" type="email" autocomplete="email" required placeholder="tu@correo.com"
                class="w-full rounded-xl border border-sand bg-white px-4 py-3 text-sm focus:border-rose focus:ring-2 focus:ring-rose/20" />
              <p class="field-error hidden text-xs text-red-600 mt-1"></p>
            </div>
          </div>
          <div>
            <label for="f-address" class="block text-sm font-medium mb-1.5">Dirección de entrega *</label>
            <textarea id="f-address" name="address" rows="2" autocomplete="street-address" required placeholder="Calle, número, ciudad, estado, código postal"
              class="w-full rounded-xl border border-sand bg-white px-4 py-3 text-sm focus:border-rose focus:ring-2 focus:ring-rose/20 resize-none"></textarea>
            <p class="field-error hidden text-xs text-red-600 mt-1"></p>
          </div>

          <fieldset>
            <legend class="block text-sm font-medium mb-2">Método de pago *</legend>
            <div class="grid gap-2.5" id="payment-options">
              <label class="flex items-center gap-3 rounded-xl border border-sand bg-white px-4 py-3 cursor-pointer has-[:checked]:border-rose has-[:checked]:ring-2 has-[:checked]:ring-rose/20">
                <input type="radio" name="payment" value="Pago coordinado por WhatsApp" class="accent-[#B76E79]" checked />
                <i data-lucide="message-circle" class="w-4 h-4 text-rose"></i>
                <span class="text-sm">Pago coordinado por WhatsApp</span>
              </label>
              <label class="flex items-center gap-3 rounded-xl border border-sand bg-white px-4 py-3 cursor-pointer has-[:checked]:border-rose has-[:checked]:ring-2 has-[:checked]:ring-rose/20">
                <input type="radio" name="payment" value="Zelle / Transferencia bancaria" class="accent-[#B76E79]" />
                <i data-lucide="landmark" class="w-4 h-4 text-rose"></i>
                <span class="text-sm">Zelle / Transferencia bancaria</span>
              </label>
              <label class="flex items-center gap-3 rounded-xl border border-sand bg-white px-4 py-3 cursor-pointer has-[:checked]:border-rose has-[:checked]:ring-2 has-[:checked]:ring-rose/20">
                <input type="radio" name="payment" value="Tarjeta (simulado)" class="accent-[#B76E79]" />
                <i data-lucide="credit-card" class="w-4 h-4 text-rose"></i>
                <span class="text-sm">Tarjeta (simulado)</span>
              </label>
            </div>
            <p id="payment-error" class="hidden text-xs text-red-600 mt-1"></p>
          </fieldset>

          <!-- Campos de tarjeta simulados -->
          <div id="card-fields" class="hidden rounded-2xl border border-dashed border-blush bg-white/70 p-4 space-y-3">
            <p class="text-xs text-taupe flex items-center gap-1.5"><i data-lucide="info" class="w-3.5 h-3.5"></i> Pago simulado: no se realiza ningún cargo ni se guardan datos de la tarjeta.</p>
            <div>
              <label for="f-card" class="block text-xs font-medium mb-1">Número de tarjeta</label>
              <input id="f-card" name="card" type="text" inputmode="numeric" autocomplete="off" placeholder="4242 4242 4242 4242" maxlength="19"
                class="w-full rounded-xl border border-sand bg-white px-4 py-2.5 text-sm tracking-wider focus:border-rose focus:ring-2 focus:ring-rose/20" />
              <p class="field-error hidden text-xs text-red-600 mt-1"></p>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label for="f-exp" class="block text-xs font-medium mb-1">Vencimiento (MM/AA)</label>
                <input id="f-exp" name="exp" type="text" inputmode="numeric" autocomplete="off" placeholder="12/28" maxlength="5"
                  class="w-full rounded-xl border border-sand bg-white px-4 py-2.5 text-sm focus:border-rose focus:ring-2 focus:ring-rose/20" />
                <p class="field-error hidden text-xs text-red-600 mt-1"></p>
              </div>
              <div>
                <label for="f-cvc" class="block text-xs font-medium mb-1">CVC</label>
                <input id="f-cvc" name="cvc" type="text" inputmode="numeric" autocomplete="off" placeholder="123" maxlength="4"
                  class="w-full rounded-xl border border-sand bg-white px-4 py-2.5 text-sm focus:border-rose focus:ring-2 focus:ring-rose/20" />
                <p class="field-error hidden text-xs text-red-600 mt-1"></p>
              </div>
            </div>
          </div>

          <button type="submit" id="confirm-order"
            class="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream py-4 text-sm font-semibold tracking-wide hover:bg-rose-dark transition">
            <i data-lucide="send" class="w-4 h-4"></i> Confirmar pedido y enviar por WhatsApp
          </button>
          <p class="text-xs text-taupe text-center">Al confirmar se guardará tu pedido y abriremos WhatsApp con el resumen para finalizar la compra.</p>
        </form>

        <!-- Resumen del pedido -->
        <aside class="md:col-span-2 bg-white/70 border-t md:border-t-0 md:border-l border-sand px-6 sm:px-8 py-6 sm:rounded-br-3xl">
          <h3 class="font-serif text-xl mb-4">Resumen del pedido</h3>
          <ul id="checkout-items" class="space-y-3 text-sm"></ul>
          <dl class="mt-5 pt-4 border-t border-sand space-y-2 text-sm">
            <div class="flex justify-between"><dt class="text-taupe">Subtotal</dt><dd id="co-subtotal">$0.00</dd></div>
            <div class="flex justify-between"><dt class="text-taupe">Descuento <span id="co-discount-label" class="text-rose"></span></dt><dd id="co-discount" class="text-rose">−$0.00</dd></div>
            <div class="flex justify-between pt-3 border-t border-sand"><dt class="font-semibold">Total a pagar</dt><dd id="co-total" class="font-serif text-2xl font-semibold">$0.00</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  </div>

  <!-- ===================== MODAL ADMINISTRATIVO ===================== -->
  <div id="admin-modal" class="fixed inset-0 z-50 hidden items-start sm:items-center justify-center overflow-y-auto p-0 sm:p-6"
    role="dialog" aria-modal="true" aria-labelledby="admin-title" aria-hidden="true">
    <div class="relative w-full max-w-6xl bg-white sm:rounded-3xl shadow-2xl fade-in min-h-full sm:min-h-0">
      <div class="flex flex-wrap items-center justify-between gap-3 px-6 py-5 border-b border-sand">
        <div class="flex items-center gap-3">
          <span class="w-10 h-10 rounded-full bg-sand flex items-center justify-center"><i data-lucide="database" class="w-5 h-5 text-rose"></i></span>
          <div>
            <h2 id="admin-title" class="font-serif text-2xl">Base de Datos Local</h2>
            <p class="text-xs text-taupe">Registros guardados en el localStorage de este navegador.</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button id="admin-export" type="button" class="inline-flex items-center gap-1.5 rounded-full border border-sand px-3 py-2 text-xs font-medium hover:border-rose hover:text-rose"><i data-lucide="download" class="w-3.5 h-3.5"></i> Exportar JSON</button>
          <button id="admin-clear" type="button" class="inline-flex items-center gap-1.5 rounded-full border border-red-200 text-red-600 px-3 py-2 text-xs font-medium hover:bg-red-50"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Vaciar</button>
          <button type="button" data-close class="p-2 rounded-full hover:bg-sand" aria-label="Cerrar panel"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>
      </div>

      <div class="px-6 pt-5">
        <div class="grid grid-cols-3 gap-3 mb-5" id="admin-stats"></div>
        <div class="inline-flex rounded-full bg-cream p-1 text-sm" role="tablist">
          <button type="button" role="tab" data-tab="customers" class="admin-tab rounded-full px-4 py-1.5 font-medium">Clientes</button>
          <button type="button" role="tab" data-tab="orders" class="admin-tab rounded-full px-4 py-1.5 font-medium">Órdenes</button>
        </div>
      </div>

      <div class="px-6 py-5">
        <div class="overflow-x-auto rounded-2xl border border-sand">
          <table class="w-full text-sm text-left">
            <thead id="admin-thead" class="bg-cream text-xs uppercase tracking-wider text-taupe"></thead>
            <tbody id="admin-tbody" class="divide-y divide-sand"></tbody>
          </table>
        </div>
        <p id="admin-empty" class="hidden text-center text-sm text-taupe py-10">Aún no hay registros.</p>
      </div>
    </div>
  </div>

  <!-- Toast -->
  <div id="toast" class="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] hidden">
    <div class="flex items-center gap-2 rounded-full bg-ink text-cream px-5 py-3 text-sm shadow-soft fade-in">
      <i data-lucide="check-circle-2" class="w-4 h-4 text-blush"></i><span id="toast-text"></span>
    </div>
  </div>

  <script src="app.js"></script>
</body>
</html>

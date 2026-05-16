# 🎵 El Arpa – Leña y Tradición | Sitio Web

## 📁 Estructura de carpetas

```
el-arpa-web/
│
├── index.html                  ← Página principal (abre esto en el navegador)
│
├── css/
│   ├── style.css               ← Estilos principales
│   └── responsive.css          ← Diseño responsive (móvil y tablet)
│
├── js/
│   └── script.js               ← Funcionalidades JS
│
└── assets/
    └── images/
        │
        ├── hero-bg.jpg          ← HERO: Foto impactante del restaurante o carne a la brasa
        ├── nosotros.jpg         ← NOSOTROS: Interior del restaurante o parrilla con leña
        │
        ├── plato-chicharron.jpg ← MENÚ: Chicharrón llanero
        ├── plato-mamona.jpg     ← MENÚ: Carne mamona
        ├── plato-punta-anca.jpg ← MENÚ: Punta de anca
        ├── plato-angus.jpg      ← MENÚ: New York Angus 1 kg
        ├── plato-frijoles.jpg   ← MENÚ: Frijolada criolla
        ├── plato-picada.jpg     ← MENÚ: Picada colombiana
        │
        ├── galeria-1.jpg        ← GALERÍA: Foto ambiente (tall)
        ├── galeria-2.jpg        ← GALERÍA: Foto plato
        ├── galeria-3.jpg        ← GALERÍA: Foto carne a la leña
        ├── galeria-4.jpg        ← GALERÍA: Foto picada (wide)
        ├── galeria-5.jpg        ← GALERÍA: Foto punta de anca
        └── galeria-6.jpg        ← GALERÍA: Foto ambiente / música
```

---

## 🖼️ Guía de imágenes

### Tamaños recomendados
| Imagen           | Ancho × Alto  | Proporción |
|------------------|---------------|------------|
| `hero-bg.jpg`    | 1920 × 1080px | 16:9       |
| `nosotros.jpg`   | 800 × 1000px  | 4:5        |
| `plato-*.jpg`    | 800 × 450px   | 16:9       |
| `galeria-1.jpg`  | 600 × 900px   | 2:3 (tall) |
| `galeria-4.jpg`  | 1200 × 600px  | 2:1 (wide) |
| Resto galería    | 600 × 600px   | 1:1        |

### Dónde conseguir las fotos
1. **Instagram** `@elarparestaurante` → descarga desde publicaciones
2. **TikTok** `@elarpatulua` → capturas de pantalla en alta calidad
3. **Facebook** de El Arpa Tuluá → álbum de fotos
4. Fotos propias del restaurante (preferidas)

### Formato recomendado
- Usar **JPG** o **WebP** para fotos
- Comprimir a ≤ 200 KB cada una con [Squoosh](https://squoosh.app) o [TinyJPG](https://tinyjpg.com)

---

## 🚀 Cómo usar el sitio

1. **Descarga** o copia todas las carpetas manteniendo la estructura exacta
2. **Agrega las imágenes** en `assets/images/` con los nombres indicados arriba
3. **Abre `index.html`** en tu navegador (doble clic o arrastrar al navegador)
4. Para publicarlo en internet, sube la carpeta completa a cualquier hosting:
   - **Gratis**: Netlify Drop (drag & drop en netlify.com/drop) ✅
   - **Gratis**: GitHub Pages
   - **Compartido**: Hostinger, SiteGround, etc.

---

## 📞 Datos de contacto (ya configurados)

Los datos ya están escritos en el HTML. Si cambian, búscalos y edítalos en `index.html`:

| Dato              | Valor actual            |
|-------------------|-------------------------|
| WhatsApp Tuluá    | +57 320 960 1716        |
| WhatsApp Armenia  | +57 311 704 3142        |
| Dirección Tuluá   | Cra. 40 #24-32, Tuluá   |
| Instagram         | @elarparestaurante      |
| Facebook          | /El-Arpa-Tuluá          |

---

## 📧 Activar el formulario de contacto

El formulario muestra un mensaje de éxito pero **no envía emails** por defecto
(los sitios HTML estáticos no tienen backend). Para activarlo:

### Opción A – Formspree (más fácil, gratis)
1. Ve a [formspree.io](https://formspree.io) y crea una cuenta
2. Crea un nuevo formulario → copia tu endpoint (ej: `https://formspree.io/f/xabcdefg`)
3. En `js/script.js`, busca el comentario `OPCIÓN A – Formspree` y reemplaza la simulación con:

```js
const response = await fetch('https://formspree.io/f/TU_ID_AQUI', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombre:  form.nombre.value,
    email:   form.email.value,
    telefono: form.telefono.value,
    mensaje: form.mensaje.value,
  })
});
if (!response.ok) throw new Error('Error al enviar');
```

---

## 🎨 Personalización de colores

Abre `css/style.css` y edita las variables al inicio del archivo:

```css
:root {
  --color-gold:   #d4a03c;  /* Oro principal → cambia por tu color */
  --color-ember:  #c44a1a;  /* Rojo brasa / acento */
  --color-bg:     #0e0c0a;  /* Fondo oscuro */
  --color-text:   #f0e8d8;  /* Texto claro */
}
```

---

## ✅ Checklist antes de publicar

- [ ] Imágenes colocadas en `assets/images/`
- [ ] Números de WhatsApp correctos en el HTML
- [ ] Dirección actualizada (si es diferente a la actual)
- [ ] Horarios correctos en el footer
- [ ] Formulario de contacto conectado a Formspree (opcional)
- [ ] Probar en móvil (Chrome DevTools → toggle device toolbar)
- [ ] Verificar que todos los links de redes sociales funcionan

---

Hecho con ❤️ para El Arpa – Leña y Tradición 🇨🇴

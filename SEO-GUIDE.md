# Guía de SEO para GitHub Pages

Este sitio incluye las siguientes optimizaciones SEO:

## ✅ Implementado

### 1. Meta Tags SEO
- Title optimizado con palabras clave
- Meta description descriptiva
- Keywords relevantes
- Open Graph para redes sociales
- Twitter Cards
- Schema.org structured data (JSON-LD)

### 2. Archivos SEO
- `robots.txt` - Instrucciones para crawlers
- `sitemap.xml` - Mapa del sitio para indexación
- Canonical URLs para evitar contenido duplicado

### 3. Optimizaciones técnicas
- HTML semántico con etiquetas apropiadas
- URLs amigables con anchors (#)
- Responsive design
- Performance optimizado

## 📊 Herramientas de verificación

### Google Search Console
1. Ve a https://search.google.com/search-console
2. Añade tu propiedad: `https://castordafonte.github.io/github-page-castordafonte/`
3. Verifica la propiedad mediante HTML tag o archivo
4. Envía el sitemap: `https://castordafonte.github.io/github-page-castordafonte/sitemap.xml`

### Bing Webmaster Tools
1. Ve a https://www.bing.com/webmasters
2. Añade tu sitio
3. Importa desde Google Search Console (más rápido)
4. Envía el sitemap

### LinkedIn
Para que tu perfil de LinkedIn enlace correctamente:
1. Asegúrate de incluir la URL en tu perfil
2. LinkedIn indexará automáticamente la página

## 🚀 Siguientes pasos recomendados

### 1. Crear imágenes para redes sociales
Crea estas imágenes en `assets/images/`:
- `og-image.jpg` (1200x630px) - Para Facebook/LinkedIn
- `twitter-image.jpg` (1200x600px) - Para Twitter
- `favicon.ico` (32x32px) - Icono del sitio
- `apple-touch-icon.png` (180x180px) - iOS

### 2. Google Analytics (opcional)
Añade al final del `<head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 3. Mejorar rendimiento
- Comprimir imágenes (TinyPNG, Squoosh)
- Usar formato WebP para imágenes
- Minificar CSS y JS en producción

### 4. Backlinks
- Comparte en LinkedIn, Twitter
- Añade la URL a tu perfil de GitHub
- Participa en comunidades Microsoft
- Escribe artículos en Medium/Dev.to enlazando a tu sitio

## 🔍 Keywords principales

El sitio está optimizado para estas búsquedas:
- "Consultor Microsoft Dynamics 365"
- "Experto Business Central"
- "Consultor Power Platform"
- "Dynamics NAV especialista"
- "Certificaciones Microsoft España"
- "Castor Dafonte"

## 📈 Monitorización

Herramientas para verificar SEO:
- Google Search Console - rendimiento en búsquedas
- PageSpeed Insights - velocidad de carga
- Mobile-Friendly Test - compatibilidad móvil
- Rich Results Test - datos estructurados

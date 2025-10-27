# Configuración de EmailJS para el Formulario de Contacto

## ✅ Ya está implementado en tu código
He preparado todo el código necesario. Solo necesitas obtener tus credenciales de EmailJS y pegarlas en el archivo `script.js`.

---

## 📋 Pasos para configurar EmailJS (5 minutos)

### 1. Crear cuenta gratuita en EmailJS

1. Ve a: **https://www.emailjs.com/**
2. Haz clic en **"Sign Up"** (arriba derecha)
3. Regístrate con tu email (o usa Google/GitHub)
4. Confirma tu email

---

### 2. Configurar tu servicio de email

1. Una vez dentro, ve a **"Email Services"** (menú izquierda)
2. Haz clic en **"Add New Service"**
3. Selecciona **"Outlook"** (ya que usas castordafonte@outlook.es)
4. Completa los datos:
   - **Service ID**: Puedes dejarlo como está o cambiarlo (ejemplo: `outlook_service`)
   - **Service Name**: Ponle un nombre (ejemplo: "Outlook - Contacto")
   - Haz clic en **"Connect Account"** y autoriza tu cuenta de Outlook
5. Haz clic en **"Create Service"**
6. **COPIA el Service ID** que aparece (lo necesitarás después)

---

### 3. Crear tu plantilla de email

1. Ve a **"Email Templates"** (menú izquierda)
2. Haz clic en **"Create New Template"**
3. Verás un editor. **Borra todo** y pega esta plantilla:

```
Subject: Nuevo mensaje de {{from_name}} - {{subject}}

De: {{from_name}}
Email: {{reply_to}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde tu sitio web castordafonte.com
```

4. En la parte derecha, configura:
   - **Template Name**: "Formulario Contacto"
   - **From Email**: Deja el que sale por defecto
   - **To Email**: **castordafonte@outlook.es**
   - **Reply To**: `{{reply_to}}`
   
5. Haz clic en **"Save"**
6. **COPIA el Template ID** que aparece arriba (ejemplo: `template_xxxxxxx`)

---

### 4. Obtener tu Public Key

1. Ve a **"Account"** (menú izquierda)
2. En la sección **"General"**, encontrarás tu **"Public Key"**
3. **COPIA tu Public Key** (ejemplo: `xYz123AbC456...`)

---

### 5. Pegar las credenciales en tu código

1. Abre el archivo **`script.js`** de tu proyecto
2. Busca estas líneas (están casi al final del archivo):

```javascript
const EMAILJS_CONFIG = {
    serviceID: 'TU_SERVICE_ID',      // Reemplazar con tu Service ID
    templateID: 'TU_TEMPLATE_ID',    // Reemplazar con tu Template ID
    publicKey: 'TU_PUBLIC_KEY'       // Reemplazar con tu Public Key
};
```

3. **Reemplaza** los valores:

```javascript
const EMAILJS_CONFIG = {
    serviceID: 'outlook_service',           // Tu Service ID de EmailJS
    templateID: 'template_xxxxxxx',         // Tu Template ID de EmailJS
    publicKey: 'xYz123AbC456DefGhi789...'   // Tu Public Key de EmailJS
};
```

---

## 🚀 ¡Listo! Prueba el formulario

1. Guarda los cambios en `script.js`
2. Despliega tu web a GitHub Pages (commit + push)
3. Ve a tu web y prueba el formulario de contacto
4. Deberías recibir el email en **castordafonte@outlook.es**

---

## 🔥 Ventajas de EmailJS vs FormSubmit

✅ **Funciona siempre** (sin errores SSL como FormSubmit)  
✅ **200 emails gratis al mes** (suficiente para un portfolio)  
✅ **Personalizable**: puedes cambiar la plantilla del email  
✅ **Sin confirmación previa**: funciona inmediatamente  
✅ **Respuestas automáticas**: puedes enviar un "gracias" automático al visitante  
✅ **Estadísticas**: ves cuántos emails se enviaron  

---

## 🆘 ¿Necesitas ayuda?

Si tienes algún problema:

1. Verifica que copiaste bien los 3 valores (Service ID, Template ID, Public Key)
2. Revisa la consola del navegador (F12 → Console) por errores
3. Asegúrate de que autorizaste tu cuenta de Outlook en EmailJS
4. Revisa tu carpeta de SPAM en Outlook por si acaso

---

## 📊 Plan gratuito de EmailJS

- ✅ 200 emails/mes gratis
- ✅ Sin tarjeta de crédito
- ✅ Sin fecha de caducidad

Si necesitas más de 200 emails/mes, puedes upgradear más adelante ($9/mes = 1000 emails).

---

**¿Listo?** Ve a https://www.emailjs.com/ y empieza con el paso 1 👆

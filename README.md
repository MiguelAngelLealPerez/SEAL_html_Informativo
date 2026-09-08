# SEAL · Micrositio de exposición

Sitio informativo completo en español para SEAL, Sistema de Elaboración y Automatización Legal de Contratos. HTML5, CSS3 y JavaScript vanilla, sin frameworks, paquetes externos, fuentes remotas, analítica ni servicios de terceros en el navegador.

## Ejecutar

Abre `index.html` directamente en cualquier navegador moderno. No requiere instalación ni compilación.

Opcionalmente, con Node.js 18 o superior:

```sh
npm run dev
```

Vista local: `http://127.0.0.1:4173`. No hace falta ejecutar `npm install`.

## Personalizar

- **Demostración:** se realiza únicamente en el stand. La sección muestra el recorrido y la invitación presencial; no contiene enlaces de acceso al sistema.
- **Equipo y roles:** bloque comentado `EDITAR NOMBRES / ROLES AQUÍ`, dentro de `#equipo`. Los roles se dejaron como Equipo de Desarrollo, sin asignaciones individuales no confirmadas.
- **Logo:** `logo-seal.jpg` es el archivo oficial proporcionado por el equipo. Se muestra en la cabecera, portada y seguridad; también se utiliza como icono del sitio.
- **Capturas:** los mockups están construidos con HTML/CSS y marcados con `REEMPLAZAR CAPTURAS` o `REEMPLAZAR CAPTURA`. Son ilustrativos; no se etiquetan como pantallas reales. Cuando incorpores capturas reales, cambia la leyenda a “Pantallas reales · Datos ficticios de demostración”, utiliza WebP/AVIF, define width/height y un alt descriptivo.
- **Redes y contacto:** comentario correspondiente en el footer.
- **Colores y tipografía:** variables `:root` al principio de `styles.css`. La serif Georgia y la sans del sistema evitan solicitudes de fuentes externas.
- **SEO:** título, descripción y Open Graph en `<head>`. Cambia `og:url` por el dominio final; puedes añadir `og:image` con una URL absoluta de una captura oficial.
- **Métricas:** bloque comentado `MÉTRICAS DEL SISTEMA`. Los números son los resultados proporcionados para SEAL, no mediciones de este micrositio. Para cambiar un contador, edita el texto y su atributo `data-count`; usa `data-decimals` cuando corresponda.

## Publicar el contenido estático

- **GitHub Pages:** publica la raíz del repositorio, que ya contiene `index.html`.
- **Netlify:** arrastra una carpeta con los cuatro archivos públicos, o utiliza `npm run build` y directorio de publicación `dist`.
- **Vercel:** proyecto estático / Other, comando `npm run build`, directorio `dist`.

Los recursos usan rutas relativas para funcionar también en un subdirectorio de GitHub Pages. El micrositio no necesita variables de entorno ni claves. La configuración de `.openai/hosting.json` corresponde exclusivamente a Sites.

## Interacciones

- Menú sticky y navegación móvil con `aria-expanded`, cierre con Escape y enlaces internos.
- Historial de versiones con `<details>` nativo, utilizables sin JavaScript.
- Animaciones discretas al entrar en pantalla y contadores de una sola ejecución. Se respeta `prefers-reduced-motion`, incluso al cambiar la preferencia durante la sesión.
- Canvas de firma ilustrativa con soporte táctil y ratón. No envía datos, no persiste trazos ni firma contratos. El botón Limpiar elimina el dibujo.
- Guardar borrador muestra una explicación de la simulación, sin almacenamiento real.

## Verificaciones

```sh
npm run check
npm run build
```

Se comprueban sintaxis JavaScript, IDs únicos, destinos internos, referencias ARIA, número de funcionalidades/métricas y presupuesto de carga. `build` copia únicamente `index.html`, `styles.css`, `script.js` y `logo-seal.jpg` a `dist`.

Los estilos incluyen puntos de adaptación para escritorio, tablet y móvil (hasta 320 px), estados de foco, enlace para saltar al contenido, contraste alto y estilos de impresión. Las verificaciones estáticas no sustituyen una revisión en dispositivos reales ni una auditoría formal de accesibilidad. Antes de usar el QR del stand, apunta a una URL pública y comprueba que la información del stand esté actualizada.

El sitio describe el sistema académico. No implementa el backend contractual, autenticación, IA ni la firma real de SEAL.

Alternativa sin npm: ejecuta node tools/serve.mjs para la vista previa local.

## Enfoque del contenido

El origen académico y los ocho meses de desarrollo se mencionan únicamente en el bloque del equipo. Scrum y documentación se resumen sin desplegable. Se eliminaron las etiquetas numeradas de sección y el apartado de aprendizajes.

El bloque ambiental cita el consumo mundial de papel cortado sin recubrimiento en 2022: 14.3 millones de toneladas. Fuente: Secretaría de Economía, publicación en el [Diario Oficial de la Federación, apartado 359.c](https://dof.gob.mx/nota_detalle_popup.php?codigo=5730887), basada en la publicación Global Outlook for Cut Size Uncoated Freesheet Paper Markets. Es contexto de mercado, no una medición del ahorro de SEAL.

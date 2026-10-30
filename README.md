# Portafolio personal – Kendrick Rocha

Sitio estático hecho con HTML, CSS y JavaScript (sin dependencias).

## Estructura

```
personal-portfolio/
├── index.html          # Página única
├── css/
│   └── style.css       # Estilos (variables en :root, responsive al final)
├── js/
│   ├── validacion.js   # Validación del formulario y envío por mailto
│   └── carrusel.js     # Carrusel de proyectos
└── assets/             # Imágenes e íconos
```

## Estructura del DOM

```
body
├── header.menu         # Menú fijo (sticky, z-index: var(--z-menu))
├── main.tudo           # Secciones: title, about, skills, hobbies,
│                       #   academic, experience (carrusel), formcontato
└── footer.footer
```

## Reglas para evitar solapamientos

- El menú es lo único con `z-index` alto (`--z-menu`); el resto del contenido no
  debe definir `z-index` mayores.
- Todo elemento con `position` o `transform` que se salga de su bloque
  (como el carrusel) debe vivir dentro de un contenedor con `isolation: isolate`.
- Cada sección va en su propio bloque dentro de `main`; no se anidan secciones.

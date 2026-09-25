# MacStorage Optimizer - MacBook Air M1

Aplicación web para optimizar el almacenamiento de tu MacBook Air M1 512GB.

## 🚀 Cómo ejecutar la aplicación

### Opción 1: Ejecutar localmente (Recomendado)

1. **Abre Terminal** en tu Mac (Cmd + Espacio → escribe "Terminal")

2. **Navega a la carpeta del proyecto**:
   ```bash
   cd /ruta/del/proyecto
   ```

3. **Instala las dependencias** (solo la primera vez):
   ```bash
   npm install
   ```

4. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

5. **Abre tu navegador** en:
   ```
   http://localhost:3000
   ```

### Opción 2: Abrir versión estática

Si prefieres una versión sin servidor:

1. **Construye la aplicación**:
   ```bash
   npm run build
   ```

2. **Abre el archivo generado**:
   ```bash
   open dist/index.html
   ```

## 📱 Funcionalidades

- 📊 **Dashboard** - Vista general con Health Score y estadísticas
- 📈 **Análisis** - Desglose detallado por categorías
- 📉 **Tendencias** - Evolución mensual y predicciones
- 📦 **Apps** - Gestor de aplicaciones con alternativas ligeras
- ☁️ **iCloud** - Decisor de qué mantener en Mac vs nube
- 📜 **Scripts** - 8 scripts bash listos para ejecutar
- 🔔 **Alertas** - Sistema de notificaciones configurables
- 💡 **Recomendaciones** - Acciones priorizadas con pasos detallados
- 🧪 **Simulador** - Compara antes/después de limpieza
- 🔧 **Herramientas** - Comandos útiles y calculadora

## 🎨 Tecnologías

- React 18
- TypeScript
- Tailwind CSS 4
- Vite
- Recharts (gráficos)
- Lucide React (iconos)

## 💻 Requisitos

- Node.js 18+ 
- npm 9+
- Navegador moderno (Chrome, Safari, Firefox)

## 📝 Scripts disponibles

```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Construir para producción
npm run preview  # Vista previa de la build
```

## 🎯 Uso

1. **Dashboard**: Revisa el estado general de tu almacenamiento
2. **Análisis**: Explora qué categorías usan más espacio
3. **Recomendaciones**: Sigue las acciones sugeridas para liberar espacio
4. **Scripts**: Copia y ejecuta los comandos en Terminal
5. **Simulador**: Prueba diferentes escenarios de limpieza

## ⚠️ Nota importante

Los scripts de limpieza son **simulaciones educativas**. Antes de ejecutar cualquier comando en tu Mac real:
- Lee cuidadosamente lo que hace cada comando
- Haz backup de tus datos importantes
- Ejecuta comandos con `sudo` solo si es necesario
- Algunos comandos requieren contraseña de administrador

## 📄 Licencia

MIT

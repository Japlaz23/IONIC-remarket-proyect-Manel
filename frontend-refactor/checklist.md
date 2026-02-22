# Checklist para evitar conflictos de dependencias en proyectos Ionic/Vite

1. **Antes de instalar dependencias:**
   - Elimina `node_modules` y `package-lock.json` si el proyecto fue movido o clonado.
   - Revisa el archivo `package.json` para verificar versiones compatibles de las dependencias principales.

2. **Instalación de dependencias:**
   - Usa siempre:
     ```sh
     npm install --legacy-peer-deps
     ```
   - Si necesitas instalar una dependencia específica:
     ```sh
     npm install <paquete> --save-dev --legacy-peer-deps
     ```

3. **Actualización de dependencias:**
   - Mantén actualizadas las versiones de `eslint`, `eslint-plugin-vue`, `vite`, y otros plugins principales.
   - Si actualizas una dependencia, revisa que sus peer dependencies sean compatibles.

4. **Arranque del proyecto:**
   - Ejecuta el comando de desarrollo desde la carpeta correcta:
     ```sh
     npm run dev
     ```
   - Si usas Ionic, asegúrate de tener `ionic.config.json` y ejecuta:
     ```sh
     ionic serve
     ```

5. **Solución de errores comunes:**
   - Si aparece un error de dependencias, repite la instalación con `--legacy-peer-deps`.
   - Si falta un plugin, instálalo con el mismo flag.

6. **Recomendaciones generales:**
   - No mezcles versiones antiguas y modernas de dependencias.
   - Documenta los pasos de instalación y arranque en el README del proyecto.

---

Este checklist te ayudará a evitar y resolver conflictos de dependencias en proyectos Ionic/Vite, especialmente al trabajar en diferentes entornos o equipos.
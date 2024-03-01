/*
Este script de Node.js se utiliza para generar automáticamente archivos para componentes Vue.js o composables en un proyecto. 
Se ejecuta desde la línea de comandos y acepta argumentos para determinar qué tipo de archivo generar y dónde colocarlo.

npm run create [component|composable] [NombreDelComponente|nombreDelComposable] [sub/ruta]

Aquí te dejo una guía paso a paso de cómo usarlo en la terminal:

1. Abre la terminal en la carpeta raiz del proyecto.

2. Para generar un nuevo componente Vue.js, usa el comando `node create component NombreDelComponente`. Por ejemplo:

   `node create component MiNuevoComponente`

   Esto creará un nuevo componente Vue.js llamado 'MiNuevoComponente' en la carpeta 'components' del proyecto.
   Tambien buscara si existe un archivo index.ts en la carpeta de destino y lo exportará al final del archivo


3. Para generar un nuevo composable, usa el comando `node create composable NombreDelComposable`. Por ejemplo:

   `node create composable miNuevoComposable`

   Esto creará un nuevo composable, con su carpeta, su index.ts y su achivo de composable llamado 'useMiNuevoComposable' en la carpeta 'composables' del proyecto.
   Tambien buscara si existe un archivo index.ts en la carpeta de composables y lo exportará al final del archivo
   (Ojo que a veces necesitaras mover el import para arriba si te da errores de definicion).
   No hace falta que escribas 'use' al principio del nombre del composable, el script lo añadirá automáticamente.


4. Si deseas colocar el nuevo archivo en una subcarpeta específica, puedes proporcionar una ruta como tercer argumento. Por ejemplo:

   node create component MiNuevoComponente subcarpeta/sybcarpeta

   Esto creará el componente 'MiNuevoComponente' dentro de la subcarpeta 'subcarpeta' en la carpeta 'components'.
*/

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import process from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const args = process.argv.slice(2);

const type = args[0];
const name = args[1];
const filePath = args[2] || "";

const composablesPath = path.join(__dirname, "..", "src", "composables");
const componentsPath = path.join(__dirname, "..", "src", "components");

if (!name || !type) {
  console.error("Please provide a name and type");
  process.exit(1);
}

const componentTemplate = `
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  prop: {
    type: String,
    required: true
  }
})
</script>
<template>
  <div></div>
</template>

<style scoped></style>
`;

function createComposable(name, dir) {
  name = "use" + name.charAt(0).toUpperCase() + name.slice(1);
  const dirPath = path.join(composablesPath, dir, name);
  const filePath = path.join(dirPath, `${name}.ts`);
  const indexFilePath = path.join(dirPath, "index.ts");
  const exportText = `export * from './${name}';`;
  const composablesIndexPath = path.join(composablesPath, dir, "index.ts");
  if (fs.existsSync(filePath)) return;

  fs.mkdirSync(dirPath, { recursive: true });

  fs.writeFileSync(filePath, `export function ${name} (){}`);
  fs.writeFileSync(indexFilePath, exportText);

  if (fs.existsSync(composablesIndexPath)) {
    fs.appendFileSync(composablesIndexPath, exportText);
  }
}

function createComponent(name, dir) {
  const dirPath = path.join(componentsPath, dir);
  const filePath = path.join(dirPath, `${name}.vue`);
  const indexFilePath = path.join(dirPath, "index.ts");
  const exportText = `export { default as ${name} } from './${name}.vue';`;
  console.log("Indexpath", indexFilePath);

  if (fs.existsSync(filePath)) return;
  fs.mkdirSync(dirPath, { recursive: true });

  fs.writeFileSync(filePath, componentTemplate);

  if (fs.existsSync(indexFilePath)) {
    fs.appendFileSync(indexFilePath, exportText);
  }
}

if (type === "composable") {
  createComposable(name, filePath);
} else if (type === "component") {
  createComponent(name, filePath);
}

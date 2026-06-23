# GitHub y LinkedIn

## GitHub

Nombre recomendado del repositorio:

```text
no-caigas-app
```

Descripcion recomendada:

```text
Aplicacion movil educativa para reconocer estafas y riesgos digitales, desarrollada con React Native, Expo y TypeScript.
```

Archivos que no deben subirse:

- `node_modules/`.
- `.expo/`.
- `dist/`.
- `web-build/`.
- `.env` o archivos con secretos.
- Carpetas nativas generadas `/android` o `/ios` si no se usan builds nativos.

Comandos iniciales:

```powershell
git init
git remote add origin https://github.com/Damian200520/no-caigas-app.git
git add .
git commit -m "Initial React Native quiz app"
git branch -M main
git push -u origin main
```

Comandos para commits posteriores:

```powershell
git status
git add .
git commit -m "Improve quiz feedback and documentation"
git push
```

Agregar capturas al README:

1. Crear carpeta `docs/images`.
2. Guardar capturas como `welcome.png`, `question.png`, `result.png`.
3. Referenciarlas en README con Markdown.

Ejemplo:

```markdown
![Pantalla de bienvenida](docs/images/welcome.png)
```

Crear una release basica:

1. En GitHub, entrar al repositorio.
2. Ir a `Releases`.
3. Seleccionar `Draft a new release`.
4. Tag sugerido: `v1.0.0`.
5. Titulo sugerido: `Primera version educativa`.
6. Describir funcionalidades principales.

## LinkedIn

Publicacion profesional:

```text
Desarrolle "No Caigas: Desafio de Seguridad Digital", una aplicacion movil educativa creada con React Native, Expo y TypeScript para practicar la deteccion de estafas digitales mediante situaciones reales.

La app presenta desafios sobre phishing, enlaces sospechosos, suplantacion de identidad, contrasenas inseguras, codigos QR falsos y solicitudes de acceso remoto. Cada respuesta entrega retroalimentacion educativa y guarda el mejor puntaje localmente con AsyncStorage.

Este proyecto me permitio aplicar componentizacion, manejo de estado con hooks, persistencia local, TypeScript, accesibilidad y buenas practicas de seguridad en una app movil ejecutada con Expo Go.

Tecnologias: React Native, Expo, TypeScript, AsyncStorage.
```

Texto corto para seccion Proyectos:

```text
Aplicacion movil educativa para reconocer estafas y riesgos digitales. Construida con React Native, Expo y TypeScript, incluye quiz interactivo, retroalimentacion, niveles de resultado y persistencia local del mejor puntaje con AsyncStorage.
```

Tecnologias:

- React Native.
- Expo.
- TypeScript.
- AsyncStorage.
- JSX / TSX.
- StyleSheet.

Habilidades demostradas:

- Componentizacion.
- Props y state.
- Hooks `useState` y `useEffect`.
- Persistencia local.
- Manejo de errores.
- Accesibilidad basica.
- Documentacion tecnica.
- Seguridad digital aplicada.

Guion para video de 45 a 60 segundos:

```text
Hola, soy Damian y presento No Caigas, una app movil educativa sobre seguridad digital.

La aplicacion muestra situaciones reales como phishing bancario, mensajes falsos, codigos QR sospechosos y solicitudes de acceso remoto. El usuario debe elegir la accion mas segura y recibe retroalimentacion inmediata.

Fue desarrollada con React Native, Expo y TypeScript. Dividi la interfaz en componentes reutilizables, use hooks para manejar el estado del quiz y AsyncStorage para guardar el mejor puntaje localmente.

El objetivo es concientizar sobre decisiones digitales seguras de una forma practica, simple y movil.
```

Capturas recomendadas:

- Bienvenida.
- Pregunta con opciones.
- Retroalimentacion correcta.
- Retroalimentacion incorrecta.
- Resultado final.

Hashtags sugeridos:

```text
#ReactNative #Expo #TypeScript #MobileDevelopment #Cybersecurity #EducacionDigital
```

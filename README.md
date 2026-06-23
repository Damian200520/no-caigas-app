# No Caigas: Desafio de Seguridad Digital

Aplicacion movil educativa desarrollada con React Native, Expo y TypeScript. Su objetivo es ayudar a reconocer estafas digitales, phishing, enlaces sospechosos, suplantacion de identidad y malas practicas de seguridad mediante un quiz interactivo.

## Problema que resuelve

Muchas personas responden mensajes, correos o enlaces falsos por urgencia, confianza o desconocimiento. Esta app presenta situaciones cercanas a la vida real para practicar decisiones seguras antes de compartir datos, pagar o instalar herramientas peligrosas.

## Capturas pendientes

- Pantalla de bienvenida.
- Pregunta con opciones.
- Retroalimentacion correcta e incorrecta.
- Pantalla de resultado final.

## Demo pendiente

- Video corto ejecutando la app en Expo Go.
- Recorrido por una respuesta correcta, una incorrecta y el mejor puntaje.

## Funcionalidades

- Pantalla de bienvenida con total de desafios, categorias, fases y mejor puntaje.
- 30 situaciones educativas originales de seguridad digital.
- Tres niveles progresivos: facil, medio y dificil, con 10 preguntas por fase.
- Una pregunta a la vez con cuatro alternativas.
- Seleccion de una sola opcion por desafio.
- Bloqueo de alternativas despues de responder.
- Retroalimentacion educativa inmediata.
- Puntaje actual, barra de avance general y barra de avance por nivel.
- Resultado final con porcentaje y nivel de seguridad digital.
- Persistencia del mejor puntaje con AsyncStorage.
- Reinicio del quiz sin borrar el mejor puntaje.
- Manejo de errores para evitar pantallas en blanco.

## Tecnologias

- React Native.
- Expo.
- TypeScript.
- JSX / TSX.
- AsyncStorage.
- StyleSheet.
- Flexbox.
- Expo Go para Android.

## Arquitectura

```text
no-caigas-app/
├── App.tsx
├── assets/
├── components/
│   ├── WelcomeScreen.tsx
│   ├── QuestionCard.tsx
│   ├── OptionButton.tsx
│   ├── QuizProgress.tsx
│   ├── ScoreBoard.tsx
│   ├── FeedbackCard.tsx
│   ├── ResultScreen.tsx
│   └── ErrorMessage.tsx
├── constants/
│   ├── colors.ts
│   └── storageKeys.ts
├── data/
│   └── questions.ts
├── services/
│   └── storage.ts
├── types/
│   └── quiz.ts
├── utils/
│   └── quizHelpers.ts
├── docs/
├── README.md
├── app.json
├── package.json
└── tsconfig.json
```

## Responsabilidad de archivos

- `App.tsx`: controla el flujo principal, estados, carga del mejor puntaje y transiciones.
- `components/`: contiene componentes visuales reutilizables.
- `constants/`: centraliza colores y claves de almacenamiento.
- `data/questions.ts`: contiene las preguntas del quiz.
- `services/storage.ts`: encapsula AsyncStorage.
- `types/quiz.ts`: define tipos e interfaces compartidas.
- `utils/quizHelpers.ts`: contiene calculos y validaciones puras.
- `docs/`: contiene material de defensa, informe, GitHub y LinkedIn.

## Instalacion

Verificar Node.js y npm:

```powershell
node -v
npm -v
```

Clonar el repositorio:

```powershell
git clone https://github.com/Damian200520/no-caigas-app.git
cd no-caigas-app
```

Instalar dependencias:

```powershell
npm install
```

Instalar AsyncStorage si se crea el proyecto desde cero:

```powershell
npx expo install @react-native-async-storage/async-storage
```

Ejecutar la aplicacion:

```powershell
npx expo start
```

Limpiar cache si aparece un error extraño:

```powershell
npx expo start -c
```

## Uso con Expo Go

1. Instalar Expo Go desde Google Play Store.
2. Ejecutar `npx expo start`.
3. Escanear el codigo QR con Expo Go.
4. Mantener celular y computador en la misma red Wi-Fi.
5. Si no conecta, desactivar VPN, revisar firewall o probar modo tunnel.

Para detener el servidor:

```powershell
Ctrl + C
```

## Pruebas manuales

| Prueba | Accion | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|---|
| Inicio | Abrir app en Expo Go | Se muestra bienvenida con titulo, descripcion, desafios y mejor puntaje | Pendiente | Pendiente de ejecutar |
| Carga mejor puntaje | Abrir app despues de guardar puntaje | Se recupera el mejor puntaje desde AsyncStorage | Pendiente | Pendiente de ejecutar |
| Respuesta correcta | Seleccionar alternativa correcta | Suma 1 punto y muestra retroalimentacion correcta | Pendiente | Pendiente de ejecutar |
| Respuesta incorrecta | Seleccionar alternativa incorrecta | No suma punto y muestra retroalimentacion incorrecta | Pendiente | Pendiente de ejecutar |
| Doble pulsacion | Tocar varias opciones despues de responder | Las opciones quedan bloqueadas | Pendiente | Pendiente de ejecutar |
| Avanzar sin responder | Intentar avanzar antes de responder | No se permite avanzar | Pendiente | Pendiente de ejecutar |
| Cambio de nivel | Completar el desafio 10 y avanzar | La app pasa de Nivel facil a Nivel medio | Pendiente | Pendiente de ejecutar |
| Cambio a dificil | Completar el desafio 20 y avanzar | La app pasa de Nivel medio a Nivel dificil | Pendiente | Pendiente de ejecutar |
| Ultima pregunta | Responder el desafio 30 | El boton cambia a Ver resultado | Pendiente | Pendiente de ejecutar |
| Resultado final | Terminar el quiz | Se muestra puntaje, porcentaje y nivel | Pendiente | Pendiente de ejecutar |
| Nuevo mejor puntaje | Superar el mejor puntaje anterior | Se guarda el nuevo mejor puntaje | Pendiente | Pendiente de ejecutar |
| Puntaje inferior | Obtener menos que el mejor puntaje | Se mantiene el mejor puntaje anterior | Pendiente | Pendiente de ejecutar |
| Reinicio | Presionar Volver a intentarlo | Reinicia el quiz sin borrar el mejor puntaje | Pendiente | Pendiente de ejecutar |
| Persistencia | Cerrar y abrir Expo Go | El mejor puntaje se mantiene | Pendiente | Pendiente de ejecutar |
| Error almacenamiento | Simular fallo de AsyncStorage | Se muestra aviso sin pantalla en blanco | Pendiente | Pendiente de ejecutar |
| Lista vacia | Probar `questions` como arreglo vacio en desarrollo | Se muestra mensaje de respaldo | Pendiente | Pendiente de ejecutar |

## Seguridad

- La app solo guarda el mejor puntaje.
- No almacena contrasenas, tokens, claves privadas ni datos sensibles.
- Las preguntas son locales y no consumen APIs externas.
- AsyncStorage se usa para un dato no sensible.
- Los errores se muestran con mensajes comprensibles para el usuario.

## Decisiones tecnicas

- Se usa TypeScript para reducir errores de props, estados y datos del quiz.
- Se evita Redux porque el estado es local y simple.
- Se evita navegacion compleja porque el flujo se resuelve con `quizStatus`.
- Se usa AsyncStorage porque el mejor puntaje debe persistir entre sesiones.
- Se separa la interfaz en componentes para facilitar mantenimiento y explicacion oral.

## Comandos utiles

```powershell
npx expo start
npx expo start -c
npm install
npx tsc --noEmit
```

## Autor

Damian.

## Licencia

Proyecto academico. Puedes adaptar la licencia antes de publicarlo oficialmente.

## Declaracion de uso de IA

Este proyecto conto con asistencia de IA para estructurar la arquitectura, generar componentes base, mejorar la documentacion y preparar material de defensa academica. El estudiante debe revisar, ejecutar, comprender y defender el codigo final.

# Defensa Oral y Video

## Guion de video maximo 5 minutos

Tiempo 0:00 a 0:30.

Que se muestra: pantalla de bienvenida en Expo Go.

Que se dice: "Esta aplicacion se llama No Caigas y busca educar sobre seguridad digital mediante un quiz de decisiones reales."

Codigo que se enseña: `WelcomeScreen.tsx`.

Tiempo 0:30 a 1:10.

Que se muestra: `App.tsx` y estados principales.

Que se dice: "El flujo se controla con quizStatus, currentQuestionIndex, score, selectedOptionId, answered y bestScore."

Codigo que se enseña: bloque de `useState`.

Tiempo 1:10 a 1:50.

Que se muestra: pregunta en el celular y `QuestionCard.tsx`.

Que se dice: "QuestionCard recibe la pregunta por props y renderiza opciones con OptionButton."

Codigo que se enseña: props de `QuestionCard` y uso de `FlatList`.

Tiempo 1:50 a 2:30.

Que se muestra: responder una alternativa.

Que se dice: "handleAnswer valida la opcion, impide doble respuesta, actualiza seleccion y suma puntaje solo si corresponde."

Codigo que se enseña: `handleAnswer`.

Tiempo 2:30 a 3:10.

Que se muestra: retroalimentacion educativa.

Que se dice: "Despues de responder, las opciones quedan bloqueadas y aparece una explicacion con un consejo de seguridad."

Codigo que se enseña: `FeedbackCard.tsx`.

Tiempo 3:10 a 3:50.

Que se muestra: `useEffect` y `services/storage.ts`.

Que se dice: "useEffect carga el mejor puntaje al iniciar. AsyncStorage es asincrono, por eso se usa async await y try catch."

Codigo que se enseña: `loadBestScore`, `updateBestScore`, `getBestScore`, `saveBestScore`.

Tiempo 3:50 a 4:30.

Que se muestra: resultado final y mejor puntaje.

Que se dice: "Al finalizar, se calcula el porcentaje, se obtiene un nivel de seguridad y se guarda el mejor puntaje si el nuevo es mayor."

Codigo que se enseña: `finishQuiz`, `ResultScreen.tsx`, `quizHelpers.ts`.

Tiempo 4:30 a 5:00.

Que se muestra: consola de Expo.

Que se dice: "La app se ejecuta con npx expo start y se prueba en Android usando Expo Go."

Codigo que se enseña: no aplica.

## Como demostrar conceptos

Props: mostrar `QuestionCardProps` y explicar que `question`, `answered` y `onSelectOption` llegan desde `App.tsx`.

State: mostrar `score`, `selectedOptionId` y `answered`, porque cambian durante el juego.

useState: responder una pregunta y mostrar como cambia el puntaje.

useEffect: abrir la app y explicar que carga el mejor puntaje una vez por el arreglo `[]`.

AsyncStorage: mostrar `storage.ts` y explicar que solo guarda `BEST_SCORE`.

Mejor puntaje: terminar un intento con puntaje alto y reiniciar la app.

Manejo de errores: mostrar `ErrorMessage.tsx` y las validaciones de pregunta invalida.

Consola Expo: ejecutar `npx expo start` y mostrar el QR.

## 25 preguntas posibles del profesor

1. ¿Por que utilizaron componentes?
Respuesta: para separar responsabilidades, reutilizar interfaz y hacer el codigo mas facil de explicar y mantener.

2. ¿Que diferencia hay entre props y state?
Respuesta: props son datos que un componente recibe; state son datos internos que cambian con la interaccion del usuario.

3. ¿Por que el puntaje esta en state?
Respuesta: porque cambia cuando el usuario responde correctamente y debe actualizar la interfaz.

4. ¿Como evitan responder dos veces?
Respuesta: con el estado `answered`; si ya es verdadero, `handleAnswer` retorna y los botones quedan deshabilitados.

5. ¿Por que utilizan igualdad estricta?
Respuesta: `===` compara valor y tipo, evitando conversiones implicitas inesperadas.

6. ¿Como mantienen la inmutabilidad?
Respuesta: no modifican arreglos directamente; usan spread y `filter` para crear nuevos arreglos.

7. ¿Para que sirve map?
Respuesta: permite transformar arreglos, por ejemplo obtener ids de opciones para validar duplicados.

8. ¿Para que sirve find?
Respuesta: permite localizar una opcion especifica por su id.

9. ¿Para que sirve filter?
Respuesta: permite obtener elementos que cumplen una condicion, como respuestas previas de otra pregunta o preguntas validas.

10. ¿Para que sirve reduce?
Respuesta: permite acumular un resultado, como contar respuestas correctas.

11. ¿Por que useEffect tiene []?
Respuesta: porque la carga del mejor puntaje debe ejecutarse solo una vez al iniciar.

12. ¿Que pasa si se elimina []?
Respuesta: el efecto podria ejecutarse en cada render y causar lecturas repetidas o bucles.

13. ¿Por que AsyncStorage es asincrono?
Respuesta: porque leer y escribir almacenamiento local puede tardar y no debe bloquear la interfaz.

14. ¿Que almacena la aplicacion?
Respuesta: solo el mejor puntaje.

15. ¿Que datos no deben almacenarse?
Respuesta: contrasenas, tokens, claves privadas, documentos o datos sensibles.

16. ¿Para que sirve try catch?
Respuesta: para capturar errores de lectura o escritura y mostrar un mensaje controlado.

17. ¿Que aporta TypeScript?
Respuesta: valida tipos de datos, props y estados antes de ejecutar la app.

18. ¿Que ocurre en la ultima pregunta?
Respuesta: despues de responder, el boton cambia a Ver resultado y se calcula el puntaje final.

19. ¿Como se calcula el porcentaje?
Respuesta: con `score / totalQuestions * 100`, redondeado con `Math.round`.

20. ¿Como se actualiza el mejor puntaje?
Respuesta: solo si el nuevo puntaje es mayor que el anterior, luego se guarda en AsyncStorage.

21. ¿Que errores maneja la app?
Respuesta: preguntas vacias, indice invalido, opcion inexistente, doble respuesta, avance sin responder y errores de almacenamiento.

22. ¿Por que no usan Redux?
Respuesta: porque el estado es pequeno y local; usar Redux agregaria complejidad innecesaria.

23. ¿Por que no usan Firebase?
Respuesta: el proyecto no necesita backend ni autenticacion; todo funciona localmente.

24. ¿Que mejorarian en una version futura?
Respuesta: mas categorias, estadisticas por tema, modo practica y soporte multilenguaje.

25. ¿Por que esta app ayuda a la seguridad digital?
Respuesta: porque entrena decisiones reales y explica por que una accion es mas segura que otra.

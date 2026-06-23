# Informe Academico

## 1. Portada

Que escribir: nombre de universidad, asignatura, titulo del proyecto, estudiante, docente y fecha.

Codigo a mostrar: no aplica.

Captura a incluir: pantalla de bienvenida.

Decision a justificar: eleccion del tema de seguridad digital.

## 2. Resumen

Que escribir: explicar en un parrafo que la app ensena a reconocer fraudes mediante un quiz movil.

Codigo a mostrar: no aplica.

Captura a incluir: resultado final.

Decision a justificar: enfoque educativo y practico.

## 3. Introduccion

Que escribir: contexto de estafas digitales y necesidad de educacion preventiva.

Codigo a mostrar: `data/questions.ts`.

Captura a incluir: ejemplo de pregunta.

Decision a justificar: uso de situaciones reales, no solo definiciones.

## 4. Planteamiento del problema

Que escribir: usuarios pueden caer en phishing, enlaces falsos o suplantacion por falta de verificacion.

Codigo a mostrar: estructura de preguntas en `types/quiz.ts`.

Captura a incluir: una pregunta de phishing.

Decision a justificar: preguntas basadas en decisiones.

## 5. Objetivo general

Que escribir: construir una app movil educativa para reconocer estafas y riesgos digitales.

Codigo a mostrar: no aplica.

Captura a incluir: bienvenida.

Decision a justificar: objetivo centrado en aprendizaje.

## 6. Objetivos especificos

Que escribir: listar funcionalidades como quiz, retroalimentacion, puntaje, persistencia y resultado final.

Codigo a mostrar: `App.tsx`.

Captura a incluir: flujo completo.

Decision a justificar: objetivos medibles y verificables.

## 7. Descripcion de la solucion

Que escribir: explicar pantallas, preguntas, opciones y retroalimentacion.

Codigo a mostrar: `WelcomeScreen.tsx`, `QuestionCard.tsx`, `FeedbackCard.tsx`.

Captura a incluir: pregunta y feedback.

Decision a justificar: interfaz simple para concentrarse en la decision.

## 8. Arquitectura

Que escribir: presentar carpetas `components`, `data`, `services`, `types`, `utils`.

Codigo a mostrar: arbol de carpetas.

Captura a incluir: explorador de VS Code.

Decision a justificar: separacion de responsabilidades.

## 9. Componentizacion

Que escribir: explicar que cada parte visual se separo en componentes reutilizables.

Codigo a mostrar: `QuestionCard` usando `OptionButton`.

Captura a incluir: pregunta con cuatro opciones.

Decision a justificar: facilita mantenimiento y pruebas.

## 10. Props y state

Que escribir: props comunican datos hacia componentes hijos; state guarda datos que cambian.

Codigo a mostrar: interfaces de props en `types/quiz.ts` y estados en `App.tsx`.

Captura a incluir: puntaje cambiando.

Decision a justificar: no duplicar datos calculables.

## 11. Logica ES6+

Que escribir: mencionar `map`, `find`, `filter`, `reduce`, spread, ternarios y template literals.

Codigo a mostrar: `QuestionCard.tsx`, `quizHelpers.ts`, `App.tsx`.

Captura a incluir: no aplica.

Decision a justificar: codigo moderno y legible.

## 12. Hooks

Que escribir: `useState` maneja quiz y `useEffect` carga mejor puntaje al iniciar.

Codigo a mostrar: estados y `useEffect` en `App.tsx`.

Captura a incluir: mejor puntaje recuperado.

Decision a justificar: `[]` evita cargas repetidas.

## 13. Persistencia

Que escribir: AsyncStorage guarda solo el mejor puntaje.

Codigo a mostrar: `services/storage.ts`.

Captura a incluir: puntaje conservado tras reiniciar app.

Decision a justificar: dato local no sensible.

## 14. TypeScript

Que escribir: TypeScript valida tipos de preguntas, opciones, props y estados.

Codigo a mostrar: `types/quiz.ts`.

Captura a incluir: VS Code sin errores de tipos.

Decision a justificar: reduce errores antes de ejecutar.

## 15. Manejo de errores

Que escribir: la app muestra mensajes comprensibles si falla una parte.

Codigo a mostrar: `ErrorMessage.tsx` y validaciones en `App.tsx`.

Captura a incluir: aviso de error.

Decision a justificar: evitar pantalla en blanco.

## 16. Seguridad

Que escribir: no se guardan contrasenas ni tokens; solo mejor puntaje.

Codigo a mostrar: `storageKeys.ts` y `storage.ts`.

Captura a incluir: no aplica.

Decision a justificar: AsyncStorage no debe guardar datos sensibles.

## 17. Pruebas

Que escribir: describir pruebas manuales del README.

Codigo a mostrar: no aplica.

Captura a incluir: tabla de pruebas completada.

Decision a justificar: pruebas manuales son adecuadas para validar Expo Go.

## 18. Resultados

Que escribir: explicar que la app permite jugar, puntuar, ver resultado y guardar mejor puntaje.

Codigo a mostrar: `ResultScreen.tsx`.

Captura a incluir: resultado final.

Decision a justificar: nivel de seguridad ayuda a interpretar el puntaje.

## 19. Limitaciones

Que escribir: no tiene backend, autenticacion ni panel administrativo.

Codigo a mostrar: no aplica.

Captura a incluir: no aplica.

Decision a justificar: alcance academico y uso local.

## 20. Mejoras futuras

Que escribir: agregar categorias, estadisticas por tema, modo practica y mas preguntas.

Codigo a mostrar: posibles cambios en `data/questions.ts`.

Captura a incluir: no aplica.

Decision a justificar: arquitectura permite crecer sin reescribir todo.

## 21. Conclusiones

Que escribir: aprendizajes sobre React Native, estado, props, persistencia y seguridad digital.

Codigo a mostrar: no aplica.

Captura a incluir: app funcionando en Expo Go.

Decision a justificar: valor educativo del proyecto.

## 22. Referencias

Que escribir: documentacion oficial de React Native, Expo, TypeScript y AsyncStorage.

Codigo a mostrar: no aplica.

Captura a incluir: no aplica.

Decision a justificar: fuentes tecnicas oficiales.

## 23. Declaracion de uso de IA

Que escribir: indicar que IA apoyo estructura, codigo base y documentacion, pero el estudiante reviso y comprende el resultado.

Codigo a mostrar: no aplica.

Captura a incluir: no aplica.

Decision a justificar: transparencia academica.

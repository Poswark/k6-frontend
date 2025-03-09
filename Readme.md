## Testeando k6 para aplicaciones Frontend 


Mas información: [Link Text](https://medium.com/@giovannyorjuel2/testeando-frontend-con-k6-8677ef57402e).





```bash
docker run --rm -i -v $(pwd):/home/k6/screenshots grafana/k6:master-with-browser run --out json=/home/k6/screenshots/test.json - <script.js
```

```bash
✓ status is 200 or 304

     browser_data_received.......: 123 MB  403 kB/s
     browser_data_sent...........: 609 kB  2.0 kB/s
     browser_http_req_duration...: avg=86.38ms  min=3.31ms med=56.18ms  max=1.01s   p(90)=211.06ms p(95)=255.46ms
     browser_http_req_failed.....: 0.00%   ✓ 0        ✗ 2944
     browser_web_vital_cls.......: avg=0        min=0      med=0        max=0       p(90)=0        p(95)=0       
     browser_web_vital_fcp.......: avg=726.55ms min=84.7ms med=607.75ms max=1.95s   p(90)=1.3s     p(95)=1.41s   
     browser_web_vital_lcp.......: avg=269.44ms min=84.7ms med=263.85ms max=604.6ms p(90)=362.03ms p(95)=410.37ms
     browser_web_vital_ttfb......: avg=60.79ms  min=4.5ms  med=56.25ms  max=995.6ms p(90)=121.1ms  p(95)=144.7ms 
     checks......................: 100.00% ✓ 736      ✗ 0   
     data_received...............: 0 B     0 B/s
     data_sent...................: 0 B     0 B/s
     http_req_duration...........: avg=0s       min=0s     med=0s       max=0s      p(90)=0s       p(95)=0s      
     ✓ { scenario:browser }......: avg=0s       min=0s     med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_failed.............: 0.00%   ✓ 0        ✗ 0   
     ✓ { scenario:browser }......: 0.00%   ✓ 0        ✗ 0   
     iteration_duration..........: avg=5.3s     min=3.46s  med=5.21s    max=7.08s   p(90)=5.99s    p(95)=6.25s   
     iterations..................: 368     1.205695/s
     vus.........................: 1       min=1      max=10
     vus_max.....................: 10      min=10     max=10
running (5m05.2s), 00/10 VUs, 368 complete and 0 interrupted iterations
browser ✓ [ 100% ] 10 VUs  5m0s
```

## Demo
Resumen 
⸻

📡 Tráfico de Datos

📌 browser_data_received → 123 MB | 403 kB/s
📌 browser_data_sent → 609 kB | 2.0 kB/s
🔹 Cantidad de datos recibidos y enviados por el navegador durante la prueba.

⸻

⏳ Tiempos de Respuesta HTTP

📌 browser_http_req_duration → Tiempo de respuesta de las solicitudes HTTP
	•	avg=86.38ms → Tiempo promedio de respuesta
	•	min=3.31ms → Tiempo más rápido registrado
	•	med=56.18ms → Mediana (valor medio)
	•	max=1.01s → Tiempo más largo registrado
	•	p(90)=211.06ms → 90% de las respuestas fueron menores a este valor
	•	p(95)=255.46ms → 95% de las respuestas fueron menores a este valor

📌 browser_http_req_failed → 0.00% (0 errores, 2944 solicitudes exitosas)
🔹 No hubo fallas en las solicitudes HTTP

⸻

🚀 Métricas de Web Vitals (Rendimiento de la carga de la página)

📌 browser_web_vital_cls → (Cumulative Layout Shift)
🔹 Mide el cambio de diseño inesperado. En este caso, todo está estable (0).

📌 browser_web_vital_fcp → (First Contentful Paint)
🔹 726.55ms (promedio)
🔹 Tiempo hasta que el primer contenido aparece en la pantalla.

📌 browser_web_vital_lcp → (Largest Contentful Paint)
🔹 269.44ms (promedio)
🔹 Tiempo hasta que el contenido más grande de la página se renderiza.

📌 browser_web_vital_ttfb → (Time to First Byte)
🔹 60.79ms (promedio)
🔹 Tiempo hasta que el navegador recibe el primer byte de respuesta del servidor.

⸻

✅ Validaciones y Iteraciones

📌 checks → 100% de validaciones pasaron (736 exitosas, 0 fallidas)
📌 iterations → 368 iteraciones con un ritmo de 1.2 iteraciones por segundo

⸻

📌 Otros Datos

📌 iteration_duration → Duración promedio de una iteración: 5.3s
📌 vus → 1 usuario virtual ejecutando la prueba
📌 vus_max → 10 usuarios máximos en el escenario

⸻

🎯 ¿Qué significa todo esto?

✅ Tu sitio carga rápido (FCP y LCP están bien).
✅ No hay errores HTTP y la prueba es estable.
✅ Tiempo de respuesta HTTP es aceptable, pero podríamos optimizar más.

📢 ¿Notas algo raro o necesitas mejorar algo? 🚀

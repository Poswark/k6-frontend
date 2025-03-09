docker run --rm -i -v $(pwd):/home/k6/screenshots grafana/k6:master-with-browser run --out json=/home/k6/screenshots/test.json - <script.js

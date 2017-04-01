Gaia test (backend)
================================

**Required components for running the application in development mode**
```
node v6.9.4
nodemon
```

**Install**
```
npm install
```

**Run tests**
```
Open a terminal
npm run all_test
npm run all_unit_test
npm run all_integration_test
```

**Start the application in development mode**
```
open a terminal
npm run dev_server
curl http://localhost:49160/terms/26681/longest-preview-media-url
```

**Start the application in prod mode**
```
Open a terminal
npm start
curl http://localhost:49160/terms/26681/longest-preview-media-url
```


**Start the app with with Docker image**
```
Open a terminal
cd to the project root dir
docker build -t <tag> .
docker run -p 49160:3000 -d <image tag from above>
curl http://localhost:49160/terms/26681/longest-preview-media-url
```
**Test the app with with Docker image**
```
Open a terminal
docker ps
docker exec -it <container id> /bin/bash
cd /usr/src/app
npm run all_test
npm run all_unit_test
npm run all_integration_test
```

**Informational**
```
There is a unit test for the controller
There is an integration test for the controller
There is a test for the service
There is a test for the api

These tests are not comprehensive.  It is meant to illustrate testing possibilities
Istanbul is enabled for all test targets
```
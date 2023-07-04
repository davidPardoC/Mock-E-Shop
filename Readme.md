# Mock E-Shop

Tech Stack:

- NodeJS & Express.js
- MongoDB
- Next.Js
- Zustand
- ChakraUI

### Run with docker-compose

Run the whole project with docker-compose in one line.

Prerequisites:

- Docker and docker-compose installed.

Just run:

```bash
docker-compose up
```

### Local development

Raise local database.

```bash
cd ./backend
docker-compose -f docker-compose.local.yml up -d
```

Run backend

```bash
npm run dev
```

Run frontend

```bash
npm run dev
```

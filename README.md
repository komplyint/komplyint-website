# KOMPLYINT OY Website

Independent public website for KOMPLYINT OY.

This repository is completely separate from Todiscope and any related platforms.

## Structure

```
komplyint-website/
├── frontend/          # Frontend website (port 3600)
│   ├── src/
│   ├── public/
│   └── server.js
└── backend/           # Minimal backend API (port 8600)
    └── app/
```

## Frontend

Simple static website with Express server.

```bash
cd frontend
npm install
npm run dev
```

Runs on http://localhost:3600

## Backend

Minimal backend for contact form handling.

```bash
cd backend
npm install
npm run dev
```

Runs on http://localhost:8600

## License

Copyright KOMPLYINT OY



## Public corporate website and private app access

This website deliberately has **no Login / Continue with Google button** and imposes **no authentication** on its home, software, privacy or contact pages. Komplyint's centralized ZITADEL login at `auth.komplyint.fi` is for protected administration and actual product functionality, not the corporate landing page.

See [PUBLIC_ACCESS_BOUNDARY.md](PUBLIC_ACCESS_BOUNDARY.md). `npm run build` runs the source guard `npm run test:public-access` before building the public site.

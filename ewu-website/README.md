# EWU Website

The public Next.js frontend for `cloud.ewubd.edu`.

## Run locally

```bash
cp .env.example .env
npm ci
npm run dev
```

Set the three degree-verification values in `.env` from private deployment
secrets. Do not commit `.env`.

## Production build

```bash
docker build --tag ewu-website:production .
docker run --rm --publish 3002:3002 --env-file .env ewu-website:production
```

The image uses `output: "standalone"` and listens on port `3002`.

## Required reverse-proxy routes

The frontend needs nginx (or an equivalent proxy) to route:

```nginx
location / { proxy_pass http://127.0.0.1:3002; }
location /backend/ { proxy_pass http://127.0.0.1:4000/; }
```

Historical CMS media URLs use `localcloud.ewubd.edu`. The frontend loader
converts image URLs to the public `cloud.ewubd.edu` origin; production nginx
must also route `/backend/uploads/` to the media archive until all legacy
uploads are migrated.

## GitHub

Commit `package-lock.json`, `Dockerfile`, `.dockerignore`, and `.env.example`.
Never commit `.env`, uploaded media, database dumps, or production credentials.

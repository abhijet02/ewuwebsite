# East West University website

This repository contains the three applications that make up the EWU website:

- `ewu-website/` — public Next.js website, served at `cloud.ewubd.edu`.
- `ewu-backend/` — NestJS GraphQL API and CMS services.
- `ewu-admin/` — administration frontend.

## Quick production deployment

1. Clone this repository on the server.
2. Create private `.env` files from the supplied `.env.example` files. Do not
   commit those files.
3. Keep uploaded files in persistent storage, for example
   `/home/ewuwebsite/ewu-backend/uploads`.
4. Start the backend with Docker Compose, build the public frontend image, and
   configure nginx as described in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

The upload archive and databases are operational data, not Git source. Back
them up independently before server changes.

## Documentation

- [Deployment and updates](docs/DEPLOYMENT.md)
- [Media uploads and legacy URLs](docs/MEDIA.md)

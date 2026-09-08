# Media uploads and legacy URLs

## How uploads work

CMS uploads are written by the API gateway into the persistent backend upload
directory. The Docker Compose configuration mounts:

```text
/home/ewuwebsite/ewu-backend/uploads:/usr/src/app/uploads
```

Back up that host directory separately. It is intentionally excluded from Git
because it contains user-managed images, PDFs, and videos.

## Existing `localcloud` records

The database contains historical URLs such as:

```text
https://localcloud.ewubd.edu/backend/uploads/office-member/photos/example.webp
```

The public frontend image loader rewrites image URLs to `cloud.ewubd.edu`.
nginx redirects `localcloud.ewubd.edu` to that canonical HTTPS origin, so old
CMS URLs, bookmarks, and new requests share one public host.

All `/backend/uploads/` requests are served from the complete local archive.
The archive lives at `/root/ewu/website/ewu-backend/uploads` and is bind-mounted
at `/home/ewuwebsite/ewu-backend/uploads`, which is the path available to nginx
and to the API gateway container. No media request is proxied to the legacy
server.

## Local archive mount

Install `deploy/systemd/home-ewuwebsite-ewu\\x2dbackend-uploads.mount` as
`/etc/systemd/system/home-ewuwebsite-ewu\\x2dbackend-uploads.mount`, then run:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now 'home-ewuwebsite-ewu\x2dbackend-uploads.mount'
```

This makes the media mount return automatically after a VM reboot. Confirm it
with `systemctl is-active 'home-ewuwebsite-ewu\x2dbackend-uploads.mount'`.

The uploaded media remains operational data: it is intentionally excluded from
Git and must be backed up separately from the repository and databases.

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
nginx proxies `/backend/uploads/` to the legacy archive while uploads are being
migrated, so old chairperson, department, office, and video records keep
working without a VPN.

## Future migration

Copy the archive to the current server with a checksum-preserving transfer,
then change the nginx upload location to the local API gateway. Do not update
database URLs in bulk until a backup exists and a representative set of images
and videos has been verified.

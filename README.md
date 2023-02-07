# ACME-Explorer

ACME-Explorer Backend Project

## UML Class Diagram

Problem domain models that are implemented in the developed system.

![UML Class Diagram](./docs/uml_acme-explorer.png)

## Endpoints

BASE_ENDPOINT: `/api/v1`

### Actors

- `POST /actors/login`
- `GET /actors`
- `GET /actors/{id}`
- `POST /actors`
- `PUT /actors/{id}`
- `PATCH /actors/{id}/ban`
- `PATCH /actors/{id}/update-password`
- `DELETE /actors/{id}`

### Trips

- `GET /trips`
- `GET /trips/{id}`
- `POST /trips`
- `PUT /trips/{id}`
- `PATCH /trips/{id}/change-status`
- `DELETE /trips/{id}`
- `GET /trips/sponsorships/sponsor/{id}`
- `PATCH /trips/{id}/sponsorships`
- `PATCH /trips/{id}/sponsorships/{id}/change-status`

### Application

- `GET /applications`
- `GET /applications/{id}`
- `POST /applications`
- `PATCH /applications/{id}/change-comment`
- `PATCH / applications /{id}/change-status`
- `DELETE /applications/{id}`

### Finder

- `GET /finder`
- `GET /finder/{id}`
- `POST /finder`

### Configuration

- `GET /configurations`
- `PUT /configurations/{id}`

# ACME-Explorer

ACME-Explorer Backend Project

## UML Class Diagram

Problem domain models that are implemented in the developed system.

![UML Class Diagram](./docs/uml_acme-explorer_110223.png)

## Endpoints

BASE_ENDPOINT: `/api/v1`

### Actors

- `GET /actors`
- `POST /actors`
- `GET /actors/{id}`
- `PUT /actors/{id}`
- `DELETE /actors/{id}`
- `POST /actors/login`
- `PATCH /actors/{id}/ban`
- `PATCH /actors/{id}/update-password`

### Trips

- `GET /trips`
- `POST /trips`
- `GET /trips/{id}`
- `PUT /trips/{id}`
- `DELETE /trips/{id}`
- `PATCH /trips/{id}/change-status`
- `PUT /trips/{id}/sponsorships`
- `PATCH /trips/{id}/sponsorships/{id}/change-status`
- `GET /trips/sponsorships/sponsor/{id}`

### Application

- `GET /applications`
- `POST /applications`
- `GET /applications/{id}`
- `PATCH /applications/{id}/change-comment`
- `PATCH /applications/{id}/change-status`
- `PATCH /applications/{id}/reject`

### Finder

- `GET /finder`
- `POST /finder`
- `GET /finder/{id}`

### Configuration

- `GET /configurations`
- `PUT /configurations/{id}`

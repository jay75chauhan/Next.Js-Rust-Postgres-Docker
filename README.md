# Next.Js-RustPrisma-Postgres-Docker

# Backend Rust (no framework, Serde for serialization)

```
cargo new backend
```

# Frontend (Next Js)

```
# npx create-next-app@latest --no-git

# npm run dev

# npm i axios

```

# DB - postgres:12 (docker)

```
# docker exec -it db psql -U postgres

# \l (List of database)

# \dt (relations)

```

# ORM (prisma)

```
# npx prisma init

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"

# npx prisma generate (Prisma schema loaded)

(sync database with prisma)
# docker exec -it backend npx prisma migrate dev --name init

(Run Studio)

# npx prisma studio
```

# Docker

```
# docker-compose up -d
```

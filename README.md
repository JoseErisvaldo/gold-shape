### npm init -y

### npm install --save-dev typescript @types/node

### npm install express tsx

### npm install --save-dev @types/express

### npx tsc --init

### npm i cors dotenv

### npm install zod

### npm install prisma @types/node @types/pg --save-dev

### npm install @prisma/client @prisma/adapter-pg pg dotenv

### criar a hash de senha https://www.md5hashgenerator.com/ e instalar npm install jsonwebtoken

### npx prisma init

---

1. Autenticação
   ├── POST /users
   ├── POST /session
   └── GET /me

---

## 🔒 Rotas Públicas

- ☐ `POST /users` — Criar usuário
- ☐ `POST /session` — Login (autenticação)

## 🔐 Rotas Autenticadas

### 👤 Usuários

- ☐ `GET /me` — Obter dados do usuário logado

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

# Checklist de Desenvolvimento

## 1. Autenticação

### Rotas Públicas

- [x] `POST /users` — Criar usuário
- [x] `POST /session` — Login

### Rotas Autenticadas

- [x] `GET /me` — Obter dados do usuário logado

---

## 2. Lojas (`stores`)

- [x] `POST /stores` — Criar loja
- [x] `GET /stores` — Listar lojas
- [x] `PATCH /stores/:id` — Atualizar loja

---

## 3. Categorias (`categories`)

- [x] `POST /categories` — Criar categoria
- [x] `GET /categories` — Listar categorias
- [x] `PATCH /categories/:id` — Atualizar categoria

---

## 4. Produtos (`products`)

- [ ] `POST /products` — Criar produto
- [ ] `GET /products` — Listar produtos
- [ ] `GET /products/:id` — Buscar produto por ID
- [ ] `PATCH /products/:id` — Atualizar produto
- [ ] `DELETE /products/:id` — Excluir produto
- [ ] `GET /products/slug/:slug` — Buscar produto pelo slug
- [ ] Implementar pesquisa por nome
- [ ] Implementar filtros por categoria e loja
- [ ] Implementar filtros por preço e disponibilidade
- [ ] Implementar paginação e ordenação

---

## 5. Categorias dos Produtos (`product_categories`)

- [ ] `PUT /products/:productId/categories` — Definir categorias do produto
- [ ] `POST /products/:productId/categories/:categoryId` — Vincular categoria
- [ ] `DELETE /products/:productId/categories/:categoryId` — Remover categoria do produto

---

## 6. Variações dos Produtos (`product_variants`)

- [ ] `POST /products/:productId/variants` — Criar variação
- [ ] `GET /products/:productId/variants` — Listar variações do produto
- [ ] `GET /products/:productId/variants/:variantId` — Buscar variação por ID
- [ ] `PATCH /products/:productId/variants/:variantId` — Atualizar variação
- [ ] `DELETE /products/:productId/variants/:variantId` — Excluir variação
- [ ] Definir preço por variação
- [ ] Definir estoque por variação
- [ ] Definir SKU por variação
- [ ] Controlar disponibilidade por variação

---

## 7. Áreas de Entrega (`delivery_areas`)

- [ ] `POST /delivery-areas` — Criar área de entrega
- [ ] `GET /delivery-areas` — Listar áreas de entrega
- [ ] `GET /delivery-areas/:id` — Buscar área por ID
- [ ] `PATCH /delivery-areas/:id` — Atualizar área de entrega
- [ ] `DELETE /delivery-areas/:id` — Excluir área de entrega
- [ ] Filtrar áreas por loja

---

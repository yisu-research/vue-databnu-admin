FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm@8.15.4

COPY . .

RUN pnpm install

RUN pnpm build

FROM nginx:stable-alpine

COPY --from=0 /app/dist /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/

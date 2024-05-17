FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm@8.15.4

COPY . .

RUN pnpm install

RUN pnpm build

FROM nginx:stable-alpine

COPY --from=0 /app/dist /usr/share/nginx/html/

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf.template /etc/nginx/templates/default.conf.template

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]

FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app
RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM nginx:alpine
ENV SOLR_URL="http://localhost:8983/solr"
ENV SOLR_CORE_SELECTOR="metadata"
# copy nginx config
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
# copy build
COPY --from=base /app/dist/www /usr/share/nginx/html
# copy bootstrap script
COPY docker/bootstrap.sh /docker-entrypoint.d/
RUN chmod 0775 /docker-entrypoint.d/bootstrap.sh

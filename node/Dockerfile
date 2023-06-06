# Node.jsのPID1対応
FROM node:18.16.0-bullseye-slim as tini
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini-static /tini
RUN chmod +x /tini

FROM node:18.16.0-bullseye-slim as deps
WORKDIR /hello
COPY package.json yarn.lock ./
RUN yarn install --prod --frozen-lockfile

FROM gcr.io/distroless/nodejs:18
USER nonroot
WORKDIR /hello
COPY --from=tini --chown=nonroot:nonroot /tini /tini
COPY --from=deps --chown=nonroot:nonroot /hello/node_modules ./node_modules
COPY --chown=nonroot:nonroot ./index.js ./index.js
ENTRYPOINT [ "/tini", "--", "/nodejs/bin/node", "index.js" ]

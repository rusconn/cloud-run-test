FROM denoland/deno:1.34.1
USER deno
WORKDIR /app
COPY . .
RUN deno cache main.ts
ENTRYPOINT ["deno", "run", "--allow-env", "--allow-net", "main.ts"]

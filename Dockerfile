FROM denoland/deno:1.17.1
EXPOSE 9000
ENV PORT 9000
USER deno
WORKDIR /app

COPY ./ /app/
RUN deno cache index.ts

# These steps will be re-run upon each file change in your working directory:
ADD . .
RUN deno cache index.ts

CMD ["run", "--allow-net", "--allow-env", "index.ts"]
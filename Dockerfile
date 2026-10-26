FROM node:22-alpine
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
WORKDIR /app
COPY --chown=node:node package.json /app/package.json
COPY --chown=node:node src /app/src
COPY --chown=node:node public /app/public
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>r.json()).then(x=>process.exit(x.ok && x.seedValidated ? 0 : 1)).catch(()=>process.exit(1))"
CMD ["node","src/server.mjs"]

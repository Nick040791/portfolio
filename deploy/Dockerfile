# Hugging Face Spaces (Docker SDK) image for portfolio-bot.
# Build context = this deploy/ directory.
#   docker build -t portfolio-bot .
# HF Spaces provides PORT (default 7860) and routes HTTPS to it.

FROM ollama/ollama:latest

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY proxy ./proxy
COPY Modelfile ./Modelfile
RUN cd proxy && npm install --omit=dev

# Bake the model into the image at build time so cold starts don't re-pull 4.6GB.
RUN ollama serve & \
    SERVER_PID=$!; \
    for i in $(seq 1 60); do ollama list >/dev/null 2>&1 && break; sleep 2; done; \
    ollama pull gemma4:e2b && \
    ollama create portfolio-bot -f /app/Modelfile; \
    kill $SERVER_PID 2>/dev/null || true; \
    wait $SERVER_PID 2>/dev/null || true

ENV OLLAMA_HOST=0.0.0.0:11434
ENV OLLAMA_URL=http://127.0.0.1:11434
ENV ALLOWED_ORIGIN=https://nick040791.github.io
ENV MODEL=portfolio-bot

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 7860
CMD ["/entrypoint.sh"]

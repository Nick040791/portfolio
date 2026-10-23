#!/bin/sh
set -e

# Start Ollama in the background.
ollama serve &
SERVER_PID=$!

# Wait for Ollama to be ready.
for i in $(seq 1 60); do
  if ollama list >/dev/null 2>&1; then break; fi
  sleep 2
done

# Start the rate-limited proxy in the foreground (HF Spaces routes to $PORT).
cd /app/proxy
exec node server.js

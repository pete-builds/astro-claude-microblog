#!/bin/bash
# Deploy your Stack to a remote server
# Copy this to deploy.sh and fill in your server details
set -e

SITE_DIR="$(cd "$(dirname "$0")" && pwd)"
REMOTE="your-user@yourserver.com"
REMOTE_PATH="/var/www/yoursite/"
SSH_OPTS=""  # e.g., "-p 2222" for custom SSH port

echo "=== Building site ==="
cd "$SITE_DIR"
npm run build

echo "=== Deploying ==="
rsync -avz --delete -e "ssh $SSH_OPTS" dist/ "$REMOTE:$REMOTE_PATH"

echo "=== Fixing ownership ==="
ssh $SSH_OPTS "$REMOTE" "sudo chown -R \$(whoami):www-data $REMOTE_PATH"

echo "=== Done ==="

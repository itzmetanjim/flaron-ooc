#!/bin/bash
set -euo pipefail
node=$(which node)
user=$(whoami)
cwd=$(pwd)
sudo tee /etc/systemd/system/flaron-ooc.service << EOF
[Unit]
Description=Flaron OOC
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=$user
WorkingDirectory=$cwd
ExecStart=$node app.js
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF
sudo systemctl daemon-reload
sudo systemctl enable --now flaron-ooc.service
echo done


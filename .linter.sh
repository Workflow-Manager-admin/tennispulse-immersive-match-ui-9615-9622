#!/bin/bash
cd /home/kavia/workspace/code-generation/tennispulse-immersive-match-ui-9615-9622/main_container_for_tennispulse
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


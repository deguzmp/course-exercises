#!/bin/zsh
notes_file="notes.json"

echo "" > ${notes_file}

node app.js add --title="buy" --body="buy something"
node app.js add --title="buy" --body="buy something"
node app.js add --title="buy again" --body="buy something"
node app.js remove --title="buy again" --body="buy something"
node app.js remove --title="buy again" --body="buy something"
node app.js add --title="buy again" --body="buy something"
node app.js read --title="buy"
node app.js list
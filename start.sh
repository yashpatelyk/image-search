cd ./image-upload-aws
npm install
cd server
npm install
cd ..
node server/index &
npm start
trap "exit" INT TERM
trap "kill 0" EXIT

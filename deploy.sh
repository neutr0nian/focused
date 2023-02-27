echo "====== preparing for build by navigating to the client directory ======="
cd client

echo "====== build in progress ======"
npm run build

echo "====== build complete, navigating to the server directory ======="
cd ../server

echo "====== stopping the server ======="
pm2 stop index.js

echo "====== running the server ======="
pm2 start index.js
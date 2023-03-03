echo "# Kill pm2"
sudo pm2 kill

echo "# Pulling from repo"
git pull

echo "# Preparing for client build"
cd client

echo "# Build in progress"
npm run build

# echo "# Build complete, navigating to the server directory"
# cd ../server

echo "Running the server"
pm2 start ecosystem.json
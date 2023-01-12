echo "Building app..."
npm run build

echo "Deploy"
scp -r build/* sergey@130.193.34.87:/var/www/dev.ferro-trade.ru

echo "Deployed successfully"
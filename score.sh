sudo apt-get remove node -y
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
cd angular/
npm install
npm test
npm run testscore




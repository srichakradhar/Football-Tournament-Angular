sudo apt-get remove node -y
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
bash dbinstall.sh
cd nodejs/
npm install
npm run dbsetup
cd ../angular/
rm -rf node_modules
npm install
fuser -k 8000/tcp
npm start
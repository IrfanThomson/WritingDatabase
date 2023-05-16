#script to manually restart processes
#delete existing processes
sudo pm2 delete writingdb
sudo pm2 delete writingdb-api
#frontend
cd ./frontend
sudo pm2 start npm --name writingdb -- start
cd ..
#backend
cd ./backend
sudo pm2 start python3 --name writingdb-api -- waitress_server.py
cd ..
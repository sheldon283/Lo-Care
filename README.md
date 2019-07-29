# LoCare

Roslyn Lu, Cian Costello, Sheldon Dong, Sahil Gandhi
CSM117
Spring 2018

## Mobile App

1. Make sure your Android device is connected to your computer. You need an actual device for full functionality, including gathering of location data and sending text messages
2. Clone the LoCare repository 
	
	```git clone https://github.com/sahilmgandhi/LoCare.git```
3. Install homebrew (if you don't already have it)
	
	```/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"```
4. Install node and watchman
	
	```brew install node``` 

	```brew install watchman```
5. Install React Native CLI
	
	```npm install -g react-native-cli```
6. Navigate to LoCare
7. Initialize your react native project 
	
	```react-native init MobileApp```
8. Run your project
	
	```cd MobileApp```
	
	```react-native run-android```
9. The app will install itself on your device and run

> If some of the above instructions will not run on your computer (ie the brew instructions will only run on macs), look up the alternative apt-get instructions for a linux environment

## Web Application/Server

1. Install mongodb if it is not already installed:
> Mac: https://treehouse.github.io/installation-guides/mac/mongo-mac.html

> Linux: https://docs.mongodb.com/manual/administration/install-on-linux/

2. Install node.js (should be installed in the web app part). 

3. In the cloned directory, go to the locare_web folder and install all node modules:

	```cd WebApp/locare_web ```

	``` npm install ```

4. Start mongo via the provided script. 

	``` chmod +x startMongo.sh ```

	``` ./startMongo.sh```
	
	If it results in an error, instead open two other terminal environments and in one type in ```mongod``` and in the other type in ```mongo```

5. Upload the preliminary data into the database

	``` mongo < createAndLoadDB.sh ```

6. Start up the server via:

	```node start```

7. To access the WebApp, go to localhost:5500 in a browser

8. To later close the mongo connection, either Ctrl+C the other two terminals you have up and running, or if you did it the script route do:

	``` chmod +x stopMongo.sh ```

	``` ./stopMongh.sh```

9. To stop the server, simply hit Ctrl+C in the terminal where you previously ran ```node start```

To see some examples of the API, refer to this postman link: https://www.getpostman.com/collections/831c066d07f6a46cdb46 

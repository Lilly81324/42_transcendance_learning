## Compile and run the project

```bash
$ npm install
```

```bash
$ npm run start
```

Visit localhost:3000 to see the live counter.
Visit localhost:3000/game to see the staticly served scene

Files you care about are:
./gamefiles/raw.html
-> Thats the whole babylon scene in an html, no imports, no ticks, just raw text that is given to the client

./src
-> This is where the files that create the node application are in

./src/main.ts
-> Main file that sets up our application on a port

./src/app.module.ts
-> Module which contains the Controllers (essentially the actors that trigger based on your chosen url)
	and Providers (basically just classes that give code for easier usage in controllers)

./src/controller.ts
-> Decides what to do when a Request is set to the application

./src/controller.ts
-> Decides what to do when a Request is set to the application

./src/LobbyManager.ts
-> Its supposed to be like the structure that controls the different lobbies/games we might have running simultaneuosly

./src/GameLobby.ts
-> Essentially a class with functions for controlling 1 Lobby / Scene / Game / Match


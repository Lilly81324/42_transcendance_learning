Html file template from:
https://doc.babylonjs.com/features/introductionToFeatures/chap1/first_app/

For Particles:
https://doc.babylonjs.com/features/featuresDeepDive/particles/

Important Notes:
Scene suddenly goes blank:
	If nothing shows up in your scene, its most likely that you are missing the 
	"new" keyword during Creation of some object.
	For example:
		particleSystem.addColorGradient(0.8, BABYLON.Color4(0, 0, 0, 0));
	makes the Scene go blank.
	(Dont ask me why, but its likely because of async functions,
	 and the renderer loosing the object here)
	However:
		particleSystem.addColorGradient(0.8, new BABYLON.Color4(0, 0, 0, 0));
	works.
Particle texture is missing texture
	If you access an html file like this in your browser:
		file:///home/user/index.html
	You MIGHT get a rendered scene, but NEVER any textures.
	This is because you are accessing a local file,
	which tries to access another local file trough an http Request.
	(Think of it like wanting to play in the comfort of your home, 
	without having to let people go in and out of your house.
	You sat down at your couch, but forgot the game.
	So you call a friend, to bring you the game, 
	which is near you on the ground, but just out of reach.
	The friend comes over, and tries to help you, but your door is closed,
	and you cant open it while sitting on your sofa)
	You will need to upload your files to be accessible through the internet,
	meaning you need to use something like Github Pages.
Particle texture file:
	In the Playground/Sandbox, you can reference the texture file for a particle like:
		BABYLON.Texture("textures/flare.png");
	(This works, because the Playground is a webpage, 
	and the server it hosts, has a file stored at
	https://playground.babylonjs.com/textures/flare.png)
	However, if you are going to run and host your own html file,
	then you also need to be hosting your own texture files.
	Meaning, that if you host your html with the script on:
		https://domain.com/folder1/folder2/index.html
	Then the text you put in the texture file path,
	(BABYLON.Texture(THIS_TEXT_RIGHT_HERE);)
	that text will be the root added to the directory that your html file is in.
	Meaning that if you host hte html on:
		https://aaa.bb/ccc/ddd/file.html
	And search for your texture like this:
		BABYLON.Texture("eee/image.png");
	Your browser will try to get the image file from:
		https://aaa.bb/ccc/ddd/eee/image.png
Particle transparency:
	If you use a png for the color, make sure you do 3 things:
	1) Set your particleSystem.particleTexture.hasAlpha = true;
	2) Set the blend mode to 2 or the ADD enum
		(particleSystem.blendMode = 2;)
	3) Use Color4, NOT Color3. Color4s extra parameter over Color3 is the alpha channel.
		That means, that Color3 will draw over your entire image, leaving nothing transparent.
		Use Color4, and set the last parameter to 1.
	(!Dont forget to use "new" objects when making Colors!)


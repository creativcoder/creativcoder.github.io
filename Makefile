deploy:
	hugo
	cp -r ./public/* ../deploy
	rm public -rf

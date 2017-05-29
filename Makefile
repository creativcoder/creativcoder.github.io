deploy:
	hugo
	cp -r ./public/* ~/Desktop/blog_deploy
	rm public -rf

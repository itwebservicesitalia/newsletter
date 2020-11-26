docker-mysql:
	docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql:5.7 && \
	docker run --name phpmyadmin -d --link mysql:db -p 8081:80 phpmyadmin/phpmyadmin

docker-start:
	docker start mysql && \
	docker start phpmyadmin
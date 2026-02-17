dev-build:
	cd docker && podman-compose down
	cd docker && podman-compose up --build

dev:
	cd docker && podman-compose down
	cd docker && podman-compose up

concept:
	feh	./zadanie/betting_dashboard_design_example.png &
	cd docs && make -f ../../plantuml-tools/Makefile dev 

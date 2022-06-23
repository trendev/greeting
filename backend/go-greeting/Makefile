run: clean build
	./bin/greeting
build: clean
	go build -o bin/greeting -v main.go
clean:
	rm -rf ./bin
test:
	go clean -testcache
	go test -v ./... 
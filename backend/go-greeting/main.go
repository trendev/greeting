package main

import (
	"fmt"
	greeter "go-greeting/contracts"
	"log"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
)

func main() {
	client, err := ethclient.Dial("https://api.avax-test.network/ext/bc/C/rpc")
	if err != nil {
		log.Fatal(err)
	}

	a := "0x97365BecdD17ed5A9E2489c121775AFC88E21260"
	address := common.HexToAddress(a)

	instance, err := greeter.NewGreeter(address, client)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("💎 Contract %s is loaded\n", a)

	greet, err := instance.Greet(nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("📩 Current greeting: %s\n", greet)
}

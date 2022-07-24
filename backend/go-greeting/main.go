package main

import (
	"context"
	"fmt"
	greeter "go-greeting/contracts"
	"log"
	"os"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
)

var networks = map[string]struct {
	url     string
	address string
}{
	"ropsten": {"https://ropsten.infura.io/v3", "0xD1441e1Cb432568B6a1D42aEBd9Ce73b2CE4f475"},
	"fuji":    {"https://avalanche-fuji.infura.io/v3", "0x97365BecdD17ed5A9E2489c121775AFC88E21260"},
}

func main() {
	id := os.Getenv("INFURA_PROJECT_ID")
	if id == "" {
		log.Fatalln("INFURA_PROJECT_ID must be set")
	}

	net := "ropsten"
	client, err := ethclient.Dial(fmt.Sprintf("%s/%s", networks[net].url, id))
	if err != nil {
		log.Fatal(err)
	}

	a := networks[net].address
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

	fmt.Println("🗃  Previous greets :")

	opts := &bind.FilterOpts{
		Context: context.Background(),
	}

	iter, err := instance.GreeterFilterer.FilterGreetingUpdated(opts, []common.Address{})
	if err != nil {
		fmt.Printf("🤯 error collecting logs and previous greetings: %s\n", err)
		os.Exit(1)
	}

	for iter.Next() {
		fmt.Printf(" 💬 %s\n", iter.Event.OldGreeting)
	}

	if iter.Error() != nil {
		log.Fatalf("error: %s\n", iter.Error())
	} else {
		fmt.Println("😎 That's all folks")
	}

}

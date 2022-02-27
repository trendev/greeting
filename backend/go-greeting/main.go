package main

import (
	"context"
	"fmt"
	greeter "go-greeting/contracts"
	"log"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
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

	fmt.Println("🗃  Previous greets :")

	opts := &bind.FilterOpts{
		Context: context.Background(),
	}

	iter, err := instance.GreeterFilterer.FilterGreetingUpdated(opts, []common.Address{})
	for iter.Next() {
		fmt.Printf(" 💬 %s\n", iter.Event.OldGreeting)
	}

	if iter.Error() != nil {
		log.Fatalf("error: %s\n", iter.Error())
	} else {
		fmt.Println("😎 That's all folks")
	}

}

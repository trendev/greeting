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
	"fuji":    {"https://avalanche-fuji.infura.io/v3", "0x97365BecdD17ed5A9E2489c121775AFC88E21260"},
	"goerli":  {"https://goerli.infura.io/v3", "0x7a3Ace07788C42214Db961aa270e5dF19aA27893"},
	"sepolia": {"https://sepolia.infura.io/v3", "0xb3d3D851661ca42CB2dE66E3E446C3C38D072cdB"},
}

func main() {
	id := os.Getenv("INFURA_PROJECT_ID")
	if id == "" {
		log.Fatalln("INFURA_PROJECT_ID must be set")
	}

	net := "sepolia"
	fmt.Printf("🔗 Network %q\n", net)

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

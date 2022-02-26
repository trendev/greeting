package main

import (
	"context"
	"fmt"
	greeter "go-greeting/contracts"
	"log"
	"strings"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
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

	query := ethereum.FilterQuery{
		Addresses: []common.Address{
			address,
		},
	}

	logs, err := client.FilterLogs(context.Background(), query)
	if err != nil {
		log.Fatal(err)
	}

	l := len(logs)
	fmt.Printf("🗃 Previous greets : %d\n", l)

	contractAbi, err := abi.JSON(strings.NewReader(string(greeter.GreeterABI)))
	if err != nil {
		log.Fatal(err)
	}

	logGreetingUpdatedSig := []byte("GreetingUpdated(address,string,string)")
	logGreetingUpdatedSigHash := crypto.Keccak256Hash(logGreetingUpdatedSig)

	for _, lg := range logs {
		switch lg.Topics[0].Hex() {
		case logGreetingUpdatedSigHash.Hex():
			var event greeter.GreeterGreetingUpdated

			err := contractAbi.UnpackIntoInterface(&event, "GreetingUpdated", lg.Data)
			if err != nil {
				log.Fatal(err)
			}

			fmt.Printf(" 💬 %s\n", event.OldGreeting)
		}
	}

}

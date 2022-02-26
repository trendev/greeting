# greeting

[![pages-build-deployment](https://github.com/trendev/greeting/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/trendev/greeting/actions/workflows/pages/pages-build-deployment)

[![built-with openzeppelin](https://img.shields.io/badge/built%20with-OpenZeppelin-3677FF)](https://docs.openzeppelin.com/)

[![Test/Build Github Actions](https://github.com/trendev/greeting/actions/workflows/main.yml/badge.svg)](https://github.com/trendev/greeting/actions/workflows/main.yml)

### D-App using:
* smart contracts (developed with `solidity` and minted on `avalanche` c-chain) for backend 🤖
* `angular` for frontend 🌐

### 📚 This repository can be used for learning purposes 👨🏻‍💻

## Build or deploy

```
ng build --base-href "/greeting/"

ng deploy --base-href "/greeting/"
```

## Go contract binding
```
solc --abi backend/contracts/Greeter.sol --include-path backend/node_modules --base-path backend/contracts -o backend/go-greeting/build
mkdir -p backend/go-greeting/contracts
abigen --abi=backend/go-greeting/build/Greeter.abi --pkg=greeter --out=backend/go-greeting/contracts/Greeter.go
```

#Ticker

An exchange rate ticker for [OpenStore](https://github.com/aakilfernandes/OpenStore). Ticker runs every 6 hours as long as the price has changed at least 1%.

##Usage

	OpenStore.getValue("0xdc99b79555385ab2fe0ff28c3c954a07b28aac5e",symbol)
	OpenStore.getTimestamp("0xdc99b79555385ab2fe0ff28c3c954a07b28aac5e",symbol)

###Symbols


####CoinMarketCapi.io

[https://coinmarketcap-nexuist.rhcloud.com/api/eth](https://coinmarketcap-nexuist.rhcloud.com/api/eth)

`CMC:ETH:USD`
`CMC:ETH:EUR`
`CMC:ETH:CNY`
`CMC:ETH:CAD`
`CMC:ETH:RUB`
`CMC:ETH:BTC`

## Installing

    git clone https://github.com/aakilfernandes/Ticker.git
    cd ticker
    npm install
    geth --rpc --unlock 0
    node ticker.js

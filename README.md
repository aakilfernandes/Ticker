#Ticker

An exchange rate ticker for [OpenStore](https://github.com/aakilfernandes/OpenStore). Ticker runs every 6 hours as long as the price has changed at least 1%.

##Usage

	OpenStore.getValue("0xdc99b79555385ab2fe0ff28c3c954a07b28aac5e",symbol)
	OpenStore.getTimestamp("0xdc99b79555385ab2fe0ff28c3c954a07b28aac5e",symbol)

###Symbols

###CoinMarketCap.io

`CMC:TETH:USD`
`CMC:TETH:EUR`
`CMC:TETH:CNY`
`CMC:TETH:CAD`
`CMC:TETH:RUB`
`CMC:TETH:BTC`

All values are returned it denominations of Tether (1000000000000 Ether). So the price of 1 USD is
	
	Ether = OpenStore.getValue("0xdc99b79555385ab2fe0ff28c3c954a07b28aac5e").div('1000000000000')

## Installing

    git clone https://github.com/aakilfernandes/Ticker.git
    cd ticker
    npm install
    geth --rpc --unlock 0
    node ticker.js

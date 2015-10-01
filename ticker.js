var web3 = require('web3')
	,BigNumber = require('bignumber.js')
	,request = require('request')
	,fs = require('fs')
	,rates = {}

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

var account = web3.eth.defaultAccount = web3.eth.accounts[0]
	,OpenStoreAbi = [{"constant":true,"inputs":[{"name":"addr","type":"address"},{"name":"key","type":"bytes32"}],"name":"getTimestamp","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"key","type":"bytes32"},{"name":"value","type":"bytes"}],"name":"setFromContract","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"},{"name":"key","type":"bytes32"}],"name":"getValue","outputs":[{"name":"","type":"bytes"}],"type":"function"},{"constant":false,"inputs":[{"name":"key","type":"bytes32"},{"name":"value","type":"bytes"}],"name":"set","outputs":[],"type":"function"}]
	,OpenStore = web3.eth.contract(OpenStoreAbi).at("0xaf527686227cc508ead0d69c7f8a98f76b63e191")

request('https://coinmarketcap-nexuist.rhcloud.com/api/eth',function(error,response,body){
	if(response.statusCode !== 200)
		throw new Error('blockchain.info returned '+response.statusCode)

	var data = JSON.parse(body);

	for(currency in data.price)
		rates[currency] = new BigNumber(data.price[currency]).times('1000000000000')

	for(currency in rates){

		var key = 'CMC:TETH:'+currency.toUpperCase()
			,newRate = rates[currency]
			,newRateRounded = newRate.round()
			,rateBytes = OpenStore.getValue(account,key)
			,rateBytesPadded = rateBytes.length===2 ? rateBytes+'00' : rateBytes
			,rate = web3.toBigNumber(rateBytesPadded)
			,timestamp = OpenStore.getTimestamp(account,currency)
			,difference = newRate.minus(rate)
			,percentChange = difference.div(rate)
			,absolutePercentChange = percentChange.greaterThanOrEqualTo(0) ? percentChange : percentChange.times('-1')
			,doSubmit = timestamp.equals(0) || absolutePercentChange.greaterThan('.01') || rate.equals(0) && newRate.notEqualTo(0)

		console.log(key,rate.toString(),newRateRounded.toString(),doSubmit)

		if(doSubmit){
			OpenStore.set(key,newRateRounded)
		}
	}

	process.exit()
})
import * as ethers from 'ethers'
import * as express from 'express'

const app = express()

const MNEMONIC = process.env.MNEMONIC
const CONTRACT_ADDRESS = '0x62694d2adf4943b03d20d0809f84103aa6bf03cf'
const ABI = [
    'function setValue(string value)',
    'function value() public view returns (string)'
]

app.get('/get', async (req, res) => {
    const provider = ethers.getDefaultProvider('rinkeby')
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
    try {
        const value = await contract.value()
        res.send(value)
    } catch (e) {
        res.send(e)
    }
})

app.get('/set/:value', async (req, res) => {
    const provider = ethers.getDefaultProvider('rinkeby')
    const wallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(provider)
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet)
    try {
        await contract.setValue(req.params.value)
        res.send('OK')
    } catch (e) {
        res.send(e)
    }
})

app.listen()
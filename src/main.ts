import * as core from '@actions/core'
import { ethers } from 'ethers'
import { contractAddress, abi } from './pattini'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const issue_number: string = core.getInput('ISSUE_NUMBER')
    const private_key: string = core.getInput('PRIVATE_KEY')

    //complete Here
    console.log('issue_number:', issue_number)
    console.log('private_key:', private_key)

    const provider = new ethers.JsonRpcProvider(
      'https://ethereum-sepolia.publicnode.com'
    )
    const blockNumber = await provider.getBlockNumber()
    console.log('Current block number:', blockNumber)

    // const specialSigner = new ethers.Wallet(privateKey, provider)

    // const pattini = new ethers.Contract(contractAddress, abi, specialSigner)
    const pattini = new ethers.Contract(contractAddress, abi, provider)

    // const issueNumber = 88888
    // const amount = 42
    // const contributor = '0xD8a394e7d7894bDF2C57139fF17e5CBAa29Dd977'
    // const previousCommitHash = 'abcde'

    const checkTokenAddress = await pattini.tokenAddress()

    console.log('token address:', checkTokenAddress) // Should return 0xe6BCD785b90dc16d667B022cc871c046587d9Ac5
    console.log('Should return 0xe6BCD785b90dc16d667B022cc871c046587d9Ac5')

    // TODO: trigger on-chain txs
    // const take = await pattini.take(
    //   issueNumber,
    //   amount,
    //   previousCommitHash,
    //   contributor
    // )
    // const takeReceipt = await take.wait(1)
    // console.log('take:', takeReceipt.hash)

    // pay
    // const pullRequestNumber = 88888
    // const commitHash = 'wxyz'
    // const pay = await pattini.pay(issueNumber, pullRequestNumber, commitHash)
    // const payReceipt = await pay.wait(1)
    // console.log('pay:', payReceipt.hash)

    // core.setOutput('payReceipt', payReceipt.hash)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

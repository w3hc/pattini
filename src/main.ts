import * as core from '@actions/core'
import { ethers } from 'ethers'
import { contractAddress, abi } from './pattini'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    //Get the inputs from the workflow file:
    const issueNumberData: string = core.getInput('ISSUE_NUMBER')
    const pullRequestNumber: string = core.getInput('PULL_REQUEST_NUMBER')
    const privateKey: string = core.getInput('PRIVATE_KEY')
    const action: string = core.getInput('ACTION')
    const repository: string = core.getInput('REPOSITORY')
    const githubToken: string = core.getInput('GITHUB_TOKEN')

    //Prepare the variables as needed:
    let amount = 0
    let address = ''
    //let abi = ''
    const issueNumberDataSplit = issueNumberData.split('-')
    const issueNumber = parseInt(issueNumberDataSplit[0])
    const recipientAddress =
      issueNumberDataSplit[issueNumberDataSplit.length - 1]

    const contractFetch = await fetch(
      `https://raw.githubusercontent.com/${repository}/test/.github/workflows/pattini.config.json`
    )
    const contract = await contractFetch.text()

    try {
      const contractJSON = JSON.parse(contract)
      address = contractJSON.address
      //abi = contractJSON.abi
    } catch (error) {
      if (error instanceof Error) core.setFailed(error.message)
    }

    //beginning of the action on chain
    if (action === 'push') {
      const response = await fetch(
        `https://api.github.com/repos/${repository}/issues/${issueNumber}`,
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: 'application/vnd.github.v3+json'
          }
        }
      )
      const issue = await response.json()
      const issueDescription = issue.body

      const issueDescriptionSplit = issueDescription.split('\n')
      for (let i = 0; i < issueDescriptionSplit.length; i++) {
        const line = issueDescriptionSplit[i]
        const [key, value] = line.split(':').map((item: string) => item.trim())
        if (key === 'Amount') {
          const numberArray = value.match(/\d+/g)?.join('') ?? ''
          amount = parseInt(numberArray)
          break
        }
      }

      console.log('action:', action)
      console.log('issueNumber:', issueNumber)
      console.log('addressContract:', address)
      console.log('recipientAddress:', recipientAddress)
      console.log('privateKey:', privateKey)
      console.log('amount:', amount)
    } else {
      console.log('action:', action)
      console.log('issueNumber:', issueNumber)
      console.log('addressContract:', address)
      console.log('pullRequestNumber:', pullRequestNumber)
      console.log('recipientAddress:', recipientAddress)
      console.log('privateKey:', privateKey)

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
    }

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

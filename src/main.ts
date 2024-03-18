import * as core from '@actions/core'
import { ethers } from 'ethers'

/**
 * The main function for the action.
 * @returns {Promise<string>} Resolves when the action is complete.
 */
export async function run(): Promise<string> {
  try {
    //Get the inputs from the workflow file:
    const issueNumberData: string = core.getInput('ISSUE_NUMBER')
    const pullRequestNumber: string = core.getInput('PULL_REQUEST_NUMBER')
    const privateKey: string = core.getInput('PRIVATE_KEY')
    const action: string = core.getInput('ACTION')
    const repository: string = core.getInput('REPOSITORY')
    const githubToken: string = core.getInput('GITHUB_TOKEN')

    if (action === 'test') {
      return 'Test'
    }

    const issueNumberDataSplit = issueNumberData.split('-')
    const issueNumber = parseInt(issueNumberDataSplit[0])
    const recipientAddress =
      issueNumberDataSplit[issueNumberDataSplit.length - 1]

    //Get the contract address and abi from the repository using Pattini:
    let amount = 0
    let contractAddress = ''
    let abi = ''

    const contractFetch = await fetch(
      `https://raw.githubusercontent.com/${repository}/main/.github/workflows/pattini.config.json`
    )
    const contract = await contractFetch.text()
    try {
      const contractJSON = JSON.parse(contract)
      contractAddress = contractJSON.address
      abi = contractJSON.abi
    } catch (errorContract) {
      if (errorContract instanceof Error) core.setFailed(errorContract.message)
      return 'Error contract'
    }

    const provider = new ethers.JsonRpcProvider(
      'https://ethereum-sepolia.publicnode.com'
    )
    const specialSigner = new ethers.Wallet(privateKey, provider)
    const pattini = new ethers.Contract(contractAddress, abi, specialSigner)

    //Beginning of the action on chain:
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
      console.log('contractAddress:', contractAddress)
      console.log('recipientAddress:', recipientAddress)
      console.log('amount:', amount)

      const take = await pattini.take(issueNumber, amount, recipientAddress)

      const takeReceipt = await take.wait(1)
      console.log('take:', takeReceipt.hash)
    } else if (action === 'pull_request') {
      console.log('action:', action)
      console.log('issueNumber:', issueNumber)
      console.log('contractAddress:', contractAddress)
      console.log('pullRequestNumber:', pullRequestNumber)
      console.log('recipientAddress:', recipientAddress)

      const pay = await pattini.pay(issueNumber, parseInt(pullRequestNumber))

      console.log('pay:', pay.hash)
    }

    // core.setOutput('payReceipt', payReceipt.hash)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }

  return 'Action completed'
}

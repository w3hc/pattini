import * as core from '@actions/core'
import { ethers } from 'ethers'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(
  issue_number: string,
  private_key: string
): Promise<void> {
  try {
    //complete Here
    console.log('issue_number:', issue_number)
    console.log('private_key:', private_key)

    console.log('OK')

    const provider = new ethers.JsonRpcProvider(
      'https://ethereum-sepolia.publicnode.com'
    )
    const bloclNumber = await provider.getBlockNumber()
    console.log('Current block number:', bloclNumber)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

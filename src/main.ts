import * as core from '@actions/core'
import { ethers } from 'ethers'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const provider = new ethers.JsonRpcProvider(
      'https://ethereum-sepolia.publicnode.com'
    )
    const bloclNumber = await provider.getBlockNumber()
    console.log('Current block number:', bloclNumber)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

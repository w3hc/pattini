# Pattini

Pattini is a GitHub Action designed to incentivize and reward contributors of a GitHub project. When an issue is merged by a maintainer, the pull request author automatically receives a certain amount of ERC-20 (USDC, DAI, ...).

Watch video: https://youtu.be/NbGHN4nkXLY

## Install

```
npm install
```

## Test

```
npm test
```

## Build

```
npm run bundle
```

## Use as a contributor

When you create a branch from the issue, add your wallet address at the end of the name of the branch with a hyphen (-).

```
-0x8CCbFaAe6BC02a73BBe8d6d8017cC8313E4C90A7
```

Your branch name should look like this example: 

```
15-Add-blog-page-to-website-0x8CCbFaAe6BC02a73BBe8d6d8017cC8313E4C90A7
```

The payment will be triggered when the branch is merged to main. 

Watch video: https://youtu.be/NbGHN4nkXLY

View a example directory that's using Pattini:
[Fables de La Fontaine](https://github.com/w3hc/fables-de-lafontaine)

_Mandatory format:_

```
<ISSUE_NUMBER>-<ISSUE_NAME>-<CONTRIBUTOR_WALLET_ADDRESS>
```

## Use Pattini as a repository maintainer

The repository maintainer should make sure that at least 1 review is required to allow merging.

Before merging, he should also verify if another no one else made a pull request before. 

### Config

To get Pattini up and running in your repository:

1. Use this directory [Pattini Contracts](https://github.com/w3hc/pattini-contracts) to retrieve the code for the contract to be deployed

2. Deploy the contract manually (in Hardhat: `pnpm deploy:sepolia`)

3. Once the contract has been deployed, copy the content of the `Pattini.json` file located in `deployments/sepolia`. In the directory where you want to add Pattini, create the folder `.github/workflows`, create the file `pattini.config.json` and paste the content you copied earlier.

4. In the same folder (`.github/workflows`), create the `pattini.yml` file and paste the following code:

```yml
name: Run Pattini

on:
  pull_request:
    types:
      - closed
  push:
    branches:
      - '*' 

jobs:
  branch-creation-check:
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && github.event.created
    steps:
      - name: Extract Issue Number
        run: echo "ISSUE_NUMBER=$(echo ${{ github.ref }} | awk -F/ '{print $3}')" >> $GITHUB_ENV
      - name: Pattini app
        uses: w3hc/pattini@vTest
        with:
          PRIVATE_KEY: ${{ secrets.WALLET_OWNER_PRIVATE_KEY }}
          ACTION: ${{ github.event_name }}
          ISSUE_NUMBER: ${{ env.ISSUE_NUMBER }}
          REPOSITORY: ${{ github.repository }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  on-merge-pull-request:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request' && github.event.action == 'closed' && github.event.pull_request.merged
    steps:
      - name: Extract Merged Branch Name
        id: extract-merged-branch
        run: echo "ISSUE_NUMBER=${{ github.event.pull_request.head.ref }}" >> $GITHUB_ENV

      - name: Pattini app
        uses: w3hc/pattini@vTest
        with:
          PRIVATE_KEY: ${{ secrets.WALLET_OWNER_PRIVATE_KEY }}
          ACTION: ${{ github.event_name }}
          ISSUE_NUMBER: ${{ env.ISSUE_NUMBER }}
          PULL_REQUEST_NUMBER: ${{ github.event.pull_request.number }}
          REPOSITORY: ${{ github.repository }}
```

5. Create a secret variable in the GitHub parameters of your repository. This must be called `WALLET_OWNER_PRIVATE_KEY` and stores your wallet's private key, which will be used to pay the fees for the contract to interact with the blockchain.

6. Once all these steps have been completed, the actions will be automatically executed each time a new branch is created and each time a branch is merged.

## Authors

- Julien BERANGER
- Théo CLAUDEL


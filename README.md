# Pattini

Pattini is a GitHub Action designed to incentivize and reward contributors of a GitHub project. When an issue is merged by a maintainer, the pull request author automatically receives a certain amount of ERC-20 (USDC, DAI, ...).

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

## Use

The directory owner creates an issue. At the end of the description, he adds the amount
of the reward that the contributor will receive if the branch he has created is merged.

Example of an issue description:

```
We need to add a /blog page where we could post some news.

Tasks:

1. Design and Layout:
  - Determine the layout and design of the Blog page.
  - Consider integrating it seamlessly with the existing website design.
2. Functionality:
  - Implement a backend system for managing blog posts.
  - Ensure proper routing/navigation to the Blog page.

Amount : 15 OP
```

_Mandatory format:_

```

DESCRIPTION...

Amount : AMOUNT OP
```

When the contributor creates a branch from the issue, the name of the branch:

- **MUST** begin with the number of the corresponding issue 
- **MUST** end with the contributor's wallet address

### Example

```
15-Add-blog-page-to-website-0x8CCbFaAe6BC02a73BBe8d6d8017cC8313E4C90A7
```

_Mandatory format:_

```
<ISSUE_NUMBER>-<ISSUE_NAME>-<CONTRIBUTOR_WALLET_ADDRESS>
```

When the branch is created, the address at the end is stored on-chain so that the account receiving the reward cannot change.

Only one person will be paid per issue (the first merge for that issue).

Sample directory using Pattini:
[Fables de La Fontaine](https://github.com/w3hc/fables-de-lafontaine)

## Add Pattini to your project

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


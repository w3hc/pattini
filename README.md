# Pattini

[![GitHub Super-Linter](https://github.com/actions/pattini/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/pattini/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/actions/pattini/actions/workflows/check-dist.yml/badge.svg)](https://github.com/actions/pattini/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/actions/pattini/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/actions/pattini/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

GitHub Action to reward contributors of a given GitHub repository.

## What is Pattini?

Pattini is a GitHub Action designed to incentivize and reward contributors to your project for their valuable contributions. With Pattini, when you merge an issue that has received a satisfactory response from a contributor, they receive a reward as a token of appreciation.

## Usage

The directory owner opens an issue. At the end of the description, he adds the amount of the reward that the contributor will receive if the branch he has created is merged.

<u>Example of description:</u>

```md

We want to enhance our website by adding a Blog page where we can regularly post articles, updates, and news related to our project/company. This will provide a platform for engaging with our audience and sharing valuable content.

Tasks:

1. Design and Layout:
  - Determine the layout and design of the Blog page.
  - Consider integrating it seamlessly with the existing website design.
2. Functionality:
  - Implement a backend system for managing blog posts (e.g., using a CMS or custom solution).
  - Ensure proper routing/navigation to the Blog page.
...

Amount : 15 OP

```
_Format:_

```md

DESCRIPTION...

Amount : AMOUNT OP

```

When the contributor opens a branch from the issue, the name of the branch must begin with the number of the issue to which he is responding and end with the number of his wallet on which he wishes to receive the reward if his code is merge.

<u>Example of a branch name:</u>

```texte

 15-Add-blog-page-to-website-0x1234567890

 ```

_Format:_

```texte

ISSUE_NUMBER-ISSUE_NAME-0xYOUR_WALLET_ADDRESS

```

When the branch is created, the address at the end is stored in the blockchain so that the account receiving the reward cannot change.

Only one person will be paid per issue (the first merge for that issue).

Sample directory using Pattini: [Fables de La Fontaine](https://github.com/w3hc/fables-de-lafontaine) 

## Integrate Pattini in your project

Here are the steps you need to take to get Pattini up and running in your repository:

1. Use this directory [Pattini Contracts](https://github.com/w3hc/pattini-contracts) to retrieve the code for the contract to be deployed

2. Deploy the contract manually.

3. Once the contract has been deployed, copy all the contents of the `Pattini.json` file located in `deployments/sepolia`. In the directory where you want to add pattini, create the folder `.github/workflows` and create the file `pattini.config.json` in which you paste the content you copied earlier.

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

4. Create a secret variable in the GitHub parameters of your repository.
This must be called `WALLET_OWNER_PRIVATE_KEY` and stores your wallet's private key, which will be used to pay the fees for the contract to interact with the blockchain.

5. Once all these steps have been completed, the actions will be automatically executed each time a new branch is created and each time a branch is merged.

## Autors

- Julien BERANGER
- Théo CLAUDEL

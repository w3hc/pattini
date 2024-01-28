/**
 * The entrypoint for the action.
 */
import { run } from './main'

const issue_number = process.env.INPUT_ISSUE_NUMBER as string
const private_key = process.env.INPUT_PRIVATE_KEY as string

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run(issue_number, private_key)

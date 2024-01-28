/**
 * The entrypoint for the action.
 */
import { run } from './main'

const issue_number = process.argv[2];
const private_key = process.argv[3]; 

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run(issue_number, private_key)

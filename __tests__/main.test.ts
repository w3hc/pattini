import * as main from '../src/main'

// Mock the action's entrypoint
const runMock = jest.spyOn(main, 'run').mockImplementation()

describe('main', () => {
  it('TO DO', async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../src/main')

    expect(runMock).toHaveBeenCalled()
  })
})

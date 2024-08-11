import { describe, it, expect } from 'vitest'

import { mountSuspended } from '@nuxt/test-utils/runtime'
import index from 'pages/index.vue'

describe('/index', () => {
  it('should render without crashing', async () => {
    const IndexWrapper = await mountSuspended(index)
    expect(IndexWrapper.isVisible()).toBe(true)
  })

  it('should render the placeholder text', async () => {
    const IndexWrapper = await mountSuspended(index)
    expect(
      IndexWrapper.html().includes(
        'This is just a primary content placeholder.',
      ),
    ).toBe(true)
  })
})

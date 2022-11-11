/* eslint-disable no-console */
import { mount } from '@vue/test-utils'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { vi } from 'vitest'
import { FullRequestParams } from 'lib/api/http-client'
import { getByTestId, getHTMLElement } from 'testUtils'
import LogInCard from './LogInCard.vue'

const token = 'jwt-token'
type fetchMockCall = [string, FullRequestParams]

const root = 'http://test.leaderboards.gg'

const handlers = [
  rest.post(`${root}/api/Users/login`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ token }))
  }),

  rest.get(`${root}/api/Users/me`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        admin: false,
        email: 'email',
        username: 'username',
      }),
    )
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(server.close)
afterEach(() => {
  // fetchMock.resetMocks()
  server.resetHandlers()
  vi.restoreAllMocks()
})

describe('<LogInCard />', () => {
  // beforeEach(() => {
  //   fetchMock.mockResponseOnce(JSON.stringify({ token }))
  // })

  it('should render without crashing', () => {
    const wrapper = mount(LogInCard)

    expect(wrapper.isVisible()).toBe(true)
  })

  describe('when the close button is clicked', () => {
    it('should emit the close event', async () => {
      const wrapper = mount(LogInCard)

      const closeButton = getByTestId(wrapper, 'close-button')

      await closeButton.trigger('click')

      expect(wrapper.emitted().close).toBeTruthy()
    })
  })

  describe('when the hide/show button is clicked', () => {
    it('changes the password input type to be text', async () => {
      const wrapper = mount(LogInCard)
      const passwordInputElement = getHTMLElement(
        getByTestId(wrapper, 'password-input'),
      ) as HTMLInputElement

      expect(passwordInputElement.type).toBe('password')

      await getByTestId(wrapper, 'hide-show-button').trigger('click')

      expect(passwordInputElement.type).toBe('text')
    })
  })

  describe('when enter key is released on the password input field', () => {
    it('emits the close event', async () => {
      const wrapper = mount(LogInCard)

      await getByTestId(wrapper, 'password-input').trigger('keyup.enter')

      expect(wrapper.emitted().close).toBeTruthy()
    })
  })

  describe('when the login button is clicked', () => {
    const emailAddress = 'strongbad@homestarrunner.com'
    const password = 'homestarsux'

    it('emits the close event', async () => {
      const wrapper = mount(LogInCard)

      await getByTestId(wrapper, 'login-button').trigger('click')

      expect(wrapper.emitted().close).toBeTruthy()
    })

    it('clears the state', async () => {
      const wrapper = mount(LogInCard)

      const emailInput = getByTestId(wrapper, 'email-input')
      const passwordInput = getByTestId(wrapper, 'password-input')

      await emailInput.setValue(emailAddress)
      await passwordInput.setValue(password)

      const emailInputElement = getHTMLElement(emailInput) as HTMLInputElement
      const passwordInputElement = getHTMLElement(
        passwordInput,
      ) as HTMLInputElement

      expect(emailInputElement.value).toBe(emailAddress)
      expect(passwordInputElement.value).toBe(password)

      await getByTestId(wrapper, 'login-button').trigger('click')

      expect(emailInputElement.value).toBe('')
      expect(passwordInputElement.value).toBe('')
    })

    // this test is still failing
    it.only('calls the api', async () => {
      const fetchSpy = vi.spyOn(window, 'fetch')
      const wrapper = mount(LogInCard)

      const emailInput = getByTestId(wrapper, 'email-input')
      const passwordInput = getByTestId(wrapper, 'password-input')

      await emailInput.setValue(emailAddress)
      await passwordInput.setValue(password)

      await getByTestId(wrapper, 'login-button').trigger('click')

      const apiCalls = fetchSpy.mock.calls as fetchMockCall[]
      console.log(apiCalls)
      expect(apiCalls?.[0]?.length).toBe(2)

      const loginApiCall = apiCalls[0]
      expect(loginApiCall?.[0]).toBe(
        `${process.env.BACKEND_BASE_URL}/api/Users/login`,
      )
      expect(loginApiCall?.[1].method).toBe('POST')
      expect(loginApiCall?.[1].body).toEqual(
        JSON.stringify({
          email: emailAddress,
          password,
        }),
      )

      const meApiCall = apiCalls[1]
      expect(meApiCall?.[0]).toBe(
        `${process.env.BACKEND_BASE_URL}/api/Users/me`,
      )
      expect(meApiCall?.[1].method).toBe('GET')

      const headers = meApiCall?.[1]?.headers as Record<string, string>
      expect(headers).toBeDefined()
      expect(Object.keys(headers)).toContain('Authorization')
      expect(headers.Authorization).toEqual(`Bearer ${token}`)
    })
  })

  describe('when the sign up button is clicked', () => {
    it('emits the sign up click event', async () => {
      const wrapper = mount(LogInCard)

      await getByTestId(wrapper, 'sign-up-button').trigger('click')

      expect(wrapper.emitted().signUpClick).toBeTruthy()
    })
  })
})

import { mount } from '@vue/test-utils'
import { getByTestId, getHTMLElement } from 'testUtils'
import SignUpCard from './SignUpCard.vue'

afterEach(() => {
  // fetchMock.resetMocks()
  vi.restoreAllMocks()
})

describe.skip('<SignUpCard />', () => {
  it('should render without crashing', () => {
    const wrapper = mount(SignUpCard)

    expect(wrapper.isVisible()).toBe(true)
  })

  describe('when the close button is clicked', () => {
    it('should emit the close event', async () => {
      const wrapper = mount(SignUpCard)

      await getByTestId(wrapper, 'close-button').trigger('click')

      expect(wrapper.emitted().close).toBeTruthy()
    })
  })

  describe('when the hide/show button is clicked', () => {
    it('changes the password input type to be text', async () => {
      const wrapper = mount(SignUpCard)

      const passwordInputElement = getHTMLElement(
        getByTestId(wrapper, 'password-input'),
      ) as HTMLInputElement
      const passwordConfirmInputElement = getHTMLElement(
        getByTestId(wrapper, 'password-confirm-input'),
      ) as HTMLInputElement

      expect(passwordInputElement.type).toBe('password')
      expect(passwordConfirmInputElement.type).toBe('password')

      await getByTestId(wrapper, 'hide-show-button').trigger('click')

      expect(passwordInputElement.type).toBe('text')
      expect(passwordConfirmInputElement.type).toBe('text')
    })
  })

  describe('when the login button is clicked', () => {
    it('emits the log in click event', async () => {
      const wrapper = mount(SignUpCard)

      await getByTestId(wrapper, 'login-button').trigger('click')

      expect(wrapper.emitted()).toHaveProperty('logInClick')
    })
  })

  describe('when the sign up button is clicked', () => {
    const emailAddress = 'strongbad@homestarrunner.com'
    const password = 'homestarsux'
    const username = 'strongbad'

    it('emits the sign up click event', async () => {
      const wrapper = mount(SignUpCard)

      await getByTestId(wrapper, 'sign-up-button').trigger('click')

      expect(wrapper.emitted().signUpClick).toBeTruthy()
    })

    it('clears the state', async () => {
      const wrapper = mount(SignUpCard)

      const emailInputElement = getHTMLElement(
        getByTestId(wrapper, 'email-input'),
      ) as HTMLInputElement
      const passwordInputElement = getHTMLElement(
        getByTestId(wrapper, 'password-input'),
      ) as HTMLInputElement
      const passwordConfirmInputElement = getHTMLElement(
        getByTestId(wrapper, 'password-confirm-input'),
      ) as HTMLInputElement
      const usernameInputElement = getHTMLElement(
        getByTestId(wrapper, 'username-input'),
      ) as HTMLInputElement

      await getByTestId(wrapper, 'email-input').setValue(emailAddress)
      await getByTestId(wrapper, 'username-input').setValue(username)
      await getByTestId(wrapper, 'password-input').setValue(password)
      await getByTestId(wrapper, 'password-confirm-input').setValue(password)

      expect(emailInputElement.value).toBe(emailAddress)
      expect(usernameInputElement.value).toBe(username)
      expect(passwordInputElement.value).toBe(password)
      expect(passwordConfirmInputElement.value).toBe(password)

      await getByTestId(wrapper, 'sign-up-button').trigger('click')

      expect(emailInputElement.value).toBe('')
      expect(usernameInputElement.value).toBe('')
      expect(passwordInputElement.value).toBe('')
      expect(passwordConfirmInputElement.value).toBe('')
    })

    it('calls the api', async () => {
      const wrapper = mount(SignUpCard)

      await getByTestId(wrapper, 'email-input').setValue(emailAddress)
      await getByTestId(wrapper, 'username-input').setValue(username)
      await getByTestId(wrapper, 'password-input').setValue(password)
      await getByTestId(wrapper, 'password-confirm-input').setValue(password)
      await getByTestId(wrapper, 'sign-up-button').trigger('click')

      const apiCall = fetchMock.mock.calls[0]
      expect(apiCall?.[0]).toEqual(
        `${process.env.BACKEND_BASE_URL}/api/Users/register`,
      )
      expect(apiCall?.[1]?.method).toEqual('POST')
      expect(apiCall?.[1]?.body).toEqual(
        JSON.stringify({
          email: emailAddress,
          password,
          passwordConfirm: password,
          username,
        }),
      )
    })
  })
})

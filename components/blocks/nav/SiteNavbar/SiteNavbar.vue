<script setup lang="ts">
import { computed, reactive } from 'vue'
import NavLinks from 'elements/nav/NavLinks/NavLinks.vue'
import LogoutButton from 'elements/buttons/LogoutButton/LogoutButton.vue'
import SignUpButton from 'elements/buttons/SignUpButton/SignUpButton.vue'
import LoginButton from 'elements/buttons/LoginButton/LoginButton.vue'
import ForgotPasswordCard from 'blocks/cards/ForgotPasswordCard/ForgotPasswordCard.vue'
import LogInCard from 'blocks/cards/LogInCard/LogInCard.vue'
import SignUpCard from 'blocks/cards/SignUpCard/SignUpCard.vue'
import BaseModal from 'elements/modals/BaseModal/BaseModal.vue'
import SearchBar from 'blocks/SearchBar/SearchBar.vue'
import { useSessionToken } from '#imports'
import { useLogoutUser } from '~/composables/api'

interface NavbarState {
  mobileNavIsActive: boolean
  showForgotPassword: boolean
  showLogin: boolean
  showModal: boolean
  showSignUp: boolean
}

const state: NavbarState = reactive({
  mobileNavIsActive: false,
  showForgotPassword: false,
  showLogin: false,
  showModal: false,
  showSignUp: false,
})

const token = useSessionToken()
const loggedIn = computed(() => !!token.value)

function showForgotPassword() {
  state.showForgotPassword = true
  state.showLogin = false
  state.showSignUp = false
}

function showLogin() {
  state.showForgotPassword = false
  state.showLogin = true
  state.showSignUp = false
}

function showSignUp() {
  state.showForgotPassword = false
  state.showLogin = false
  state.showSignUp = true
}

function toggleMenu() {
  state.mobileNavIsActive = !state.mobileNavIsActive
}

function toggleLoginModal() {
  state.showModal = !state.showModal
  showLogin()
}

function toggleSignUpModal() {
  state.showModal = !state.showModal
  showSignUp()
}

function logout() {
  useLogoutUser()
  state.showModal = false
}
</script>

<template>
  <div class="site-navbar">
    <div class="site-navbar__wrapper">
      <div class="site-logo">
        <NuxtLink class="site-navbar__homelink" to="/">
          <i-svg-clock class="mx-1 size-10" />
          <h1>leaderboards.gg</h1>
        </NuxtLink>
      </div>
      <div :class="{ hidden: !state.mobileNavIsActive }" class="mobile-menu">
        <NavLinks />
        <SearchBar />
      </div>
      <div class="mobile-navbar">
        <LoginButton
          v-if="!loggedIn"
          data-testid="site-navbar-login-button"
          @click="toggleLoginModal"
        />
        <SignUpButton
          v-if="!loggedIn"
          data-testid="site-navbar-sign-up-button"
          @click="toggleSignUpModal"
        />
        <LogoutButton
          v-if="loggedIn"
          data-testid="site-navbar-logout-button"
          @click="logout"
        />
        <button class="mobile-menu__toggle" @click="toggleMenu">
          <i-svg-menu class="mx-2 size-5 fill-current" />
        </button>
      </div>
    </div>

    <transition
      v-if="!loggedIn"
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-200"
      enter-to-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <BaseModal v-show="state.showModal" @close="state.showModal = false">
        <ForgotPasswordCard
          v-show="state.showForgotPassword"
          data-testid="forgot-password-card"
          class="shadow-xl"
          :modal="true"
          @close="state.showModal = false"
          @cancel-click="showLogin"
        />
        <LogInCard
          v-show="state.showLogin"
          data-testid="log-in-card"
          class="shadow-xl"
          :modal="true"
          @close="state.showModal = false"
          @sign-up-click="showSignUp"
          @forgot-password-click="showForgotPassword"
        />
        <SignUpCard
          v-show="state.showSignUp"
          data-testid="sign-up-card"
          class="shadow-xl"
          :modal="true"
          @close="state.showModal = false"
          @log-in-click="showLogin"
        />
      </BaseModal>
    </transition>
  </div>
</template>

<style lang="postcss" scoped>
.site-navbar {
  @apply border-b border-gray-300;
  & .site-navbar__wrapper {
    @apply container relative flex flex-wrap lg:flex-row justify-between mx-auto px-3 py-3;
    & .mobile-menu {
      @apply lg:flex border-t border-gray-300 lg:border-t-0 flex-col lg:flex-row mt-2 lg:mt-0 w-full lg:w-auto space-y-2 lg:space-y-0;
    }
    & .mobile-navbar {
      @apply flex flex-row items-center absolute right-2 top-4 lg:relative lg:right-0 lg:top-0 space-x-2 lg:space-x-0;
      & .mobile-menu__toggle {
        @apply items-center rounded text-black lg:hidden;
      }
    }
  }
  & .site-logo {
    @apply flex grow;
    & .site-navbar__homelink {
      @apply flex;
      & h1 {
        @apply w-full py-2 text-lg text-center md:text-left font-semibold leading-6 tracking-tight hidden md:inline;
      }
    }
  }
}
</style>

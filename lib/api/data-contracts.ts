/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** Represents a `Category` tied to a `Leaderboard`. */
export interface CategoryViewModel {
  /**
   * The unique identifier of the `Category`.
   * @format int64
   */
  id: number
  /**
   * The display name of the `Category`.
   * @example "Foo Bar Baz%"
   */
  name: string
  /**
   * The URL-scoped unique identifier of the `Category`.
   * @example "foo-bar-baz"
   */
  slug: string
  /**
   * Information pertaining to the `Category`.
   * @example "Video proof is required."
   */
  info: string | null
  type: RunType
  sortDirection: SortDirection
  /**
   * @format date-time
   * @example "1984-01-01T00:00:00Z"
   */
  createdAt: string
  /**
   * @format date-time
   * @example "1984-01-01T00:00:00Z"
   */
  updatedAt: string | null
  /**
   * @format date-time
   * @example "1984-01-01T00:00:00Z"
   */
  deletedAt: string | null
}

export interface ChangePasswordRequest {
  /** @minLength 1 */
  password: string
}

/** This request object is sent when creating a `Category`. */
export interface CreateCategoryRequest {
  /**
   * The display name of the `Category`.
   * @example "Foo Bar Baz%"
   */
  name: string
  /**
   * The URL-scoped unique identifier of the `Category`.
   *
   * Must be [2, 25] in length and consist only of alphanumeric characters and hyphens.
   * @example "foo-bar-baz"
   */
  slug: string
  /**
   * Information pertaining to the `Category`.
   * @example "Video proof is required."
   */
  info: string | null
  /**
   * The ID of the `Leaderboard` the `Category` is a part of.
   * @format int64
   */
  leaderboardId: number
  sortDirection: SortDirection
  type: RunType
}

/** This request object is sent when creating a `Leaderboard`. */
export interface CreateLeaderboardRequest {
  /**
   * The display name of the `Leaderboard` to create.
   * @minLength 1
   * @example "Foo Bar"
   */
  name: string
  /**
   * The URL-scoped unique identifier of the `Leaderboard`.
   *
   * Must be [2, 80] in length and consist only of alphanumeric characters and hyphens.
   * @minLength 1
   * @example "foo-bar"
   */
  slug: string
  info?: string
}

/** This request object is sent when creating a `Run`. */
export interface CreateRunRequest {
  info: string | null
  /**
   * The date the `Run` was played on.
   * @format date
   * @example "2000-01-01"
   */
  playedOn: string
  /**
   * The ID of the `Category` for the `Run`.
   * @format int64
   */
  categoryId: number
  /** @format int64 */
  timeOrScore: number
}

/** Represents a collection of `Leaderboard` entities. */
export interface LeaderboardViewModel {
  /**
   * The unique identifier of the `Leaderboard`.
   *
   * Generated on creation.
   * @format int64
   */
  id: number
  /**
   * The display name of the `Leaderboard` to create.
   * @example "Foo Bar"
   */
  name: string
  /**
   * The URL-scoped unique identifier of the `Leaderboard`.
   *
   * Must be [2, 80] in length and consist only of alphanumeric characters and hyphens.
   * @example "foo-bar"
   */
  slug: string
  /**
   * The general information for the Leaderboard.
   * @example "Timer starts on selecting New Game and ends when the final boss is beaten."
   */
  info: string
  /**
   * The time the Leaderboard was created.
   * @format date-time
   * @example "1984-01-01T00:00:00Z"
   */
  createdAt: string
  /**
   * The last time the Leaderboard was updated or null.
   * @format date-time
   * @example "1984-01-01T00:00:00Z"
   */
  updatedAt: string | null
  /**
   * The time at which the Leaderboard was deleted, or null if the Leaderboard has not been deleted.
   * @format date-time
   * @example "1984-01-01T00:00:00Z"
   */
  deletedAt: string | null
}

/** This request object is sent when a `User` is attempting to log in. */
export interface LoginRequest {
  /**
   * The `User`'s email address.
   * @format email
   * @minLength 1
   * @example "john.doe@example.com"
   */
  email: string
  /**
   * The `User`'s password. It:
   * <ul><li>supports Unicode;</li><li>must be [8, 80] in length;</li><li>must have at least:</li><ul><li>one uppercase letter;</li><li>one lowercase letter; and</li><li>one number.</li></ul></ul>
   * @minLength 1
   * @example "P4ssword"
   */
  password: string
}

/** This response object is received upon a successful log-in request. */
export interface LoginResponse {
  /**
   * A JSON Web Token to authenticate and authorize queries with.
   * @minLength 1
   */
  token: string
}

export interface ProblemDetails {
  type?: string | null
  title?: string | null
  /** @format int32 */
  status?: number | null
  detail?: string | null
  instance?: string | null
  [key: string]: any
}

export interface RecoverAccountRequest {
  /**
   * The user's name.
   * @minLength 1
   */
  username: string
  /**
   * The user's email address.
   * @format email
   * @minLength 1
   */
  email: string
}

/** This request object is sent when a `User` is attempting to register. */
export interface RegisterRequest {
  /**
   * The username of the `User`. It:
   * <ul><li>must be [2, 25] in length;</li><li>must be made up of letters sandwiching zero or one of:</li><ul><li>hyphen;</li><li>underscore; or</li><li>apostrophe</li></ul></ul>
   * Usernames are saved case-sensitively, but matched against case-insensitively.
   * A `User` may not register with the name 'Cool' when another `User` with the name 'cool'
   * exists.
   * @minLength 1
   * @example "J'on-Doe"
   */
  username: string
  /**
   * The `User`'s email address.
   * @minLength 1
   * @example "john.doe@example.com"
   */
  email: string
  /**
   * The `User`'s password. It:
   * <ul><li>supports Unicode;</li><li>must be [8, 80] in length;</li><li>must have at least:</li><ul><li>one uppercase letter;</li><li>one lowercase letter; and</li><li>one number.</li></ul></ul>
   * @minLength 1
   * @example "P4ssword"
   */
  password: string
}

export type RunType = 'Time' | 'Score'

export type RunViewModel = BaseRunViewModel &
  (
    | BaseRunViewModelTypeMapping<'Time', TimedRunViewModel>
    | BaseRunViewModelTypeMapping<'Score', ScoredRunViewModel>
  )

export type ScoredRunViewModel = BaseRunViewModel & {
  /**
   * The score achieved during the run.
   * @format int64
   */
  score: number
}

export type SortDirection = 'Ascending' | 'Descending'

export type TimedRunViewModel = BaseRunViewModel & {
  /**
   * The duration of the run.
   * @example "25:01:01.001"
   */
  time: string
}

export interface UpdateLeaderboardRequest {
  name?: string
  slug?: string
  info?: string
}

export type UserRole = 'Registered' | 'Confirmed' | 'Administrator' | 'Banned'

export interface UserViewModel {
  /**
   * The unique identifier of the `User`.
   *
   * Generated on creation.
   * @pattern ^[a-zA-Z0-9-_]{22}$
   */
  id: string
  /**
   * The username of the `User`. It:
   * <ul><li>must be [2, 25] in length;</li><li>must be made up of alphanumeric characters around zero or one of:</li><ul><li>hyphen;</li><li>underscore; or</li><li>apostrophe</li></ul></ul>
   * Usernames are saved case-sensitively, but matcehd against case-insensitively.
   * A `User` may not register with the name 'Cool' when another `User` with the name 'cool'
   * exists.
   * @example "J'on-Doe"
   */
  username: string
  role: UserRole
  /**
   * @format date-time
   * @example "1984-01-01T00:00:00Z"
   */
  createdAt: string
}

export interface ValidationProblemDetails {
  type?: string | null
  title?: string | null
  /** @format int32 */
  status?: number | null
  detail?: string | null
  instance?: string | null
  errors?: Record<string, string[]>
  [key: string]: any
}

interface BaseRunViewModel {
  $type: string
  /**
   * The unique identifier of the `Run`.
   *
   * Generated on creation.
   * @pattern ^[a-zA-Z0-9-_]{22}$
   */
  id: string
  /** User-provided details about the run. */
  info: string | null
  /**
   * The time the run was created.
   * @format date-time
   * @example "1984-01-01T00:00:00Z"
   */
  createdAt: string
  /**
   * The last time the run was updated or null.
   * @format date-time
   * @example "1984-01-01T00:00:00Z"
   */
  updatedAt: string | null
  /**
   * The time at which the run was deleted, or null if the run has not been deleted.
   * @format date-time
   * @example "1984-01-01T00:00:00Z"
   */
  deletedAt: string | null
  /**
   * The ID of the `Category` for `Run`.
   * @format int64
   */
  categoryId: number
  /**
   * The ID of the LeaderboardBackend.Models.Entities.User who submitted this run.
   * @pattern ^[a-zA-Z0-9-_]{22}$
   */
  userId: string
}

type BaseRunViewModelTypeMapping<Key, Type> = {
  $type: Key
} & Type

export interface GetLeaderboardBySlugParams {
  slug: string
}

export interface ListLeaderboardsParams {
  /** @default false */
  includeDeleted?: boolean
}

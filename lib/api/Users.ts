/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  LoginRequest,
  LoginResponse,
  ProblemDetails,
  RegisterRequest,
  User,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Users<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Users
   * @name UsersDetail
   * @summary Gets a User by ID.
   * @request GET:/api/Users/{id}
   * @response `200` `User` The User with the provided ID.
   * @response `400` `ProblemDetails` Bad Request
   * @response `404` `ProblemDetails` If no User is found with the provided ID.
   */
  usersDetail = (id: string, params: RequestParams = {}) =>
    this.request<User, ProblemDetails>({
      path: `/api/Users/${id}`,
      method: 'GET',
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags Users
   * @name UsersRegisterCreate
   * @summary Registers a new user.
   * @request POST:/api/Users/register
   * @response `201` `User` The created User object.
   * @response `400` `ProblemDetails` If the passwords don't match, or if the request is otherwise malformed.
   * @response `409` `ProblemDetails` If login details can't be found.
   */
  usersRegisterCreate = (data: RegisterRequest, params: RequestParams = {}) =>
    this.request<User, ProblemDetails>({
      path: `/api/Users/register`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags Users
   * @name UsersLoginCreate
   * @summary Logs a new user in.
   * @request POST:/api/Users/login
   * @response `200` `LoginResponse` A <code>LoginResponse</code> object.
   * @response `400` `ProblemDetails` If the request is malformed.
   * @response `401` `ProblemDetails` If the wrong details were passed.
   * @response `404` `ProblemDetails` If a User can't be found.
   */
  usersLoginCreate = (data: LoginRequest, params: RequestParams = {}) =>
    this.request<LoginResponse, ProblemDetails>({
      path: `/api/Users/login`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * @description <p>You <em>must</em> call this with the 'Authorization' header, passing a valid JWT bearer token. </p> <p>I.e. <code>{ 'Authorization': 'Bearer JWT' }</code></p>
   *
   * @tags Users
   * @name UsersMeList
   * @summary Gets the currently logged-in user.
   * @request GET:/api/Users/me
   * @response `200` `User` Returns with the User's details.
   * @response `403` `ProblemDetails` If an invalid JWT was passed in.
   */
  usersMeList = (params: RequestParams = {}) =>
    this.request<User, ProblemDetails>({
      path: `/api/Users/me`,
      method: 'GET',
      format: 'json',
      ...params,
    })
}

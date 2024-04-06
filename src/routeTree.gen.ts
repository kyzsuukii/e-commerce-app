/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthImport } from './routes/_auth'
import { Route as AdminImport } from './routes/_admin'
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'
import { Route as AuthenticatedSearchImport } from './routes/_authenticated/search'
import { Route as AuthenticatedProfileImport } from './routes/_authenticated/profile'
import { Route as AuthenticatedProductsImport } from './routes/_authenticated/products'
import { Route as AuthenticatedChangePasswordImport } from './routes/_authenticated/change-password'
import { Route as AuthenticatedCartImport } from './routes/_authenticated/cart'
import { Route as AuthenticatedAboutImport } from './routes/_authenticated/about'
import { Route as AuthRegisterImport } from './routes/_auth/register'
import { Route as AuthLoginImport } from './routes/_auth/login'
import { Route as AdminDashboardIndexImport } from './routes/_admin/dashboard/index'
import { Route as AuthenticatedProductProductIdImport } from './routes/_authenticated/product.$productId'
import { Route as AuthenticatedCategoryCategoryNameImport } from './routes/_authenticated/category.$categoryName'
import { Route as AdminDashboardUploadImport } from './routes/_admin/dashboard/upload'
import { Route as AdminDashboardProductsImport } from './routes/_admin/dashboard/products'
import { Route as AdminDashboardUpdateProductIdImport } from './routes/_admin/dashboard/update.$productId'
import { Route as AdminDashboardProductProductIdImport } from './routes/_admin/dashboard/product.$productId'

// Create/Update Routes

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AdminRoute = AdminImport.update({
  id: '/_admin',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedSearchRoute = AuthenticatedSearchImport.update({
  path: '/search',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedProfileRoute = AuthenticatedProfileImport.update({
  path: '/profile',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedProductsRoute = AuthenticatedProductsImport.update({
  path: '/products',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedChangePasswordRoute =
  AuthenticatedChangePasswordImport.update({
    path: '/change-password',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedCartRoute = AuthenticatedCartImport.update({
  path: '/cart',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedAboutRoute = AuthenticatedAboutImport.update({
  path: '/about',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthRegisterRoute = AuthRegisterImport.update({
  path: '/register',
  getParentRoute: () => AuthRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  path: '/login',
  getParentRoute: () => AuthRoute,
} as any)

const AdminDashboardIndexRoute = AdminDashboardIndexImport.update({
  path: '/dashboard/',
  getParentRoute: () => AdminRoute,
} as any)

const AuthenticatedProductProductIdRoute =
  AuthenticatedProductProductIdImport.update({
    path: '/product/$productId',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedCategoryCategoryNameRoute =
  AuthenticatedCategoryCategoryNameImport.update({
    path: '/category/$categoryName',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AdminDashboardUploadRoute = AdminDashboardUploadImport.update({
  path: '/dashboard/upload',
  getParentRoute: () => AdminRoute,
} as any)

const AdminDashboardProductsRoute = AdminDashboardProductsImport.update({
  path: '/dashboard/products',
  getParentRoute: () => AdminRoute,
} as any)

const AdminDashboardUpdateProductIdRoute =
  AdminDashboardUpdateProductIdImport.update({
    path: '/dashboard/update/$productId',
    getParentRoute: () => AdminRoute,
  } as any)

const AdminDashboardProductProductIdRoute =
  AdminDashboardProductProductIdImport.update({
    path: '/dashboard/product/$productId',
    getParentRoute: () => AdminRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_admin': {
      preLoaderRoute: typeof AdminImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_auth/login': {
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof AuthImport
    }
    '/_auth/register': {
      preLoaderRoute: typeof AuthRegisterImport
      parentRoute: typeof AuthImport
    }
    '/_authenticated/about': {
      preLoaderRoute: typeof AuthenticatedAboutImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/cart': {
      preLoaderRoute: typeof AuthenticatedCartImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/change-password': {
      preLoaderRoute: typeof AuthenticatedChangePasswordImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/products': {
      preLoaderRoute: typeof AuthenticatedProductsImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/profile': {
      preLoaderRoute: typeof AuthenticatedProfileImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/search': {
      preLoaderRoute: typeof AuthenticatedSearchImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/': {
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_admin/dashboard/products': {
      preLoaderRoute: typeof AdminDashboardProductsImport
      parentRoute: typeof AdminImport
    }
    '/_admin/dashboard/upload': {
      preLoaderRoute: typeof AdminDashboardUploadImport
      parentRoute: typeof AdminImport
    }
    '/_authenticated/category/$categoryName': {
      preLoaderRoute: typeof AuthenticatedCategoryCategoryNameImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/product/$productId': {
      preLoaderRoute: typeof AuthenticatedProductProductIdImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_admin/dashboard/': {
      preLoaderRoute: typeof AdminDashboardIndexImport
      parentRoute: typeof AdminImport
    }
    '/_admin/dashboard/product/$productId': {
      preLoaderRoute: typeof AdminDashboardProductProductIdImport
      parentRoute: typeof AdminImport
    }
    '/_admin/dashboard/update/$productId': {
      preLoaderRoute: typeof AdminDashboardUpdateProductIdImport
      parentRoute: typeof AdminImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AdminRoute.addChildren([
    AdminDashboardProductsRoute,
    AdminDashboardUploadRoute,
    AdminDashboardIndexRoute,
    AdminDashboardProductProductIdRoute,
    AdminDashboardUpdateProductIdRoute,
  ]),
  AuthRoute.addChildren([AuthLoginRoute, AuthRegisterRoute]),
  AuthenticatedRoute.addChildren([
    AuthenticatedAboutRoute,
    AuthenticatedCartRoute,
    AuthenticatedChangePasswordRoute,
    AuthenticatedProductsRoute,
    AuthenticatedProfileRoute,
    AuthenticatedSearchRoute,
    AuthenticatedIndexRoute,
    AuthenticatedCategoryCategoryNameRoute,
    AuthenticatedProductProductIdRoute,
  ]),
])

/* prettier-ignore-end */

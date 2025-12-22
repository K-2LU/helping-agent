/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import AuthController from '#controllers/auth_controller'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.group(() => {
    router.post('/signup', [AuthController, 'signup']);
    router.post('/login', [AuthController, 'login']);

  })

  router.group(() => {
    router.post('/logout', [AuthController, 'logout'])
    router.post('/me', [AuthController, 'me'])
  }).use(middleware.auth())
}).prefix('/v1/auth');
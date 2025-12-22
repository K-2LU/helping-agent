  /*
  |--------------------------------------------------------------------------
  | Routes file
  |--------------------------------------------------------------------------
  |
  | The routes file is used for defining the HTTP routes.
  |
  */

  import User from '#models/user'
  import router from '@adonisjs/core/services/router'

  import AuthController from '#controllers/auth_controller'
import { middleware } from './kernel.js'

  router.get('/', async () => {
    return {
      hello: 'world',
    }
  })


  router.post('/users/:id/tokens', async({ params }) => {
    const user = await User.findOrFail(params.id);
    const token = await User.accessTokens.create(user);

    return {
      type: 'bearer',
      value: token.value!.release(),
    }
  })

  router.group(() => {
    router.post('/signup', [AuthController, 'signup'])
  }). prefix('/v1/auth');
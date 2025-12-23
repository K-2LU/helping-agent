import router from "@adonisjs/core/services/router";
import { middleware } from "#start/kernel";
const AuthController = () => import("#controllers/auth_controller")

router.group(() => {
  // public routes
  router.group(() => {
    router.post('/signup', [AuthController, 'signup']);
    router.post('/login', [AuthController, 'login']);

  })

  // protected routes
  router.group(() => {
    router.post('/logout', [AuthController, 'logout'])
    router.post('/me', [AuthController, 'me'])
    router.post('/send-otp', [AuthController, 'sendOtp'])
    router.post('/verify-otp', [AuthController, 'verifyOtp'])
  }).use(middleware.auth())
}).prefix('/v1/auth');
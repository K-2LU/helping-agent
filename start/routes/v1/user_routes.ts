import router from "@adonisjs/core/services/router";
const UsersController = () => import("#controllers/users_controller");

router.group(() => {
    // public routes
    router.group(()=>{
        router.get('/get-all', [UsersController, 'getAll'])
    })

    // protected routes
}).prefix('/v1/user') 
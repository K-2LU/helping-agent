import router from "@adonisjs/core/services/router";
const FeedController = () => import("#controllers/feed_controller");

router.group(() => {
    // public routes
    router.group(()=>{
        router.get('/get-all', [FeedController, 'getAllUsers'])
    })

    // protected routes
}).prefix('/v1/feed') 
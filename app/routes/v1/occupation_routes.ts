import { middleware } from "#start/kernel";
import router from "@adonisjs/core/services/router";
const OccupationsController = () => import("#controllers/occupations_controller")

router.group(() => {
    router.group(() => { 
        router.post('/create', [OccupationsController, 'create'])
    }).use(middleware.auth())
}).prefix('/v1/occupation')
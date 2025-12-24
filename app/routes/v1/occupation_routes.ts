import { middleware } from "#start/kernel";
import router from "@adonisjs/core/services/router";
const OccupationsController = () => import("#controllers/occupations_controller")

router.group(() => {
    router.get('/', [OccupationsController, 'get'])
    router.get('/search', [OccupationsController, 'search'])

    router.group(() => { 
        router.post('/', [OccupationsController, 'create'])
    }).use(middleware.auth())
}).prefix('/v1/occupation')
const { Router } = require('express');
const UserRoutes = require('./user.routes');
const AdminRoutes = require('./admin.routes');
const repairRoutes = require('./repair.routes');
const MechanicRoutes = require('./mechanic.routes');
const Response = require('../middlewares/Response.middleware');

const AppRouter = Router();

Response(AppRouter);
// prettier-ignore
AppRouter
    .use(UserRoutes)
    .use(AdminRoutes)
    .use(MechanicRoutes)
    .use(repairRoutes)

module.exports = AppRouter;

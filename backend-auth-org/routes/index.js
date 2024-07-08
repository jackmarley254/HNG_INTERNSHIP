import { Router } from 'express';
import authRoutes from './authRoutes';
import organisationRoutes from './organisationRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/organisations', organisationRoutes);

export default router;

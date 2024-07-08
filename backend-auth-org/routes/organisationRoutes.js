import { Router } from 'express';
import { getAllOrganisations } from '../controllers/organisationController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getAllOrganisations);

// Other organisation-related routes here as per your requirements

export default router;

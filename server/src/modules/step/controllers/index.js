import { Router } from 'express';

import getSteps from './get-steps';
import getStep from './get-step';
import updateStep from './update-step';
import deleteStep from './delete-step';
import updateStepsOrder from './update-steps-order';

import {
  authenticate,
  authorize,
  csrfProtection,
} from '../../../api/middlewares';
import { userRoles } from '../../../constants';

const router = Router();

router.get('/', getSteps);

router.patch('/order', updateStepsOrder);

router.get('/:slug', getStep);

router.patch(
  '/:id',
  csrfProtection,
  authenticate(),
  authorize([userRoles.SUPER_ADMIN]),
  updateStep,
);

router.delete(
  '/:id',
  csrfProtection,
  authenticate(),
  authorize(/* list admin + super admin here */),
  deleteStep,
);

export default router;

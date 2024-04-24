import { Router } from 'express'
import * as userControllers from './userControllers'

const router = Router()

/**
 * GET /api/user
 */
router.get('/', userControllers.getAllUser)

/**
 * post /api/user/login
 */
router.post('/login', userControllers.loginUser)

/**
 * PUT /api/user/add
 */
router.post('/', userControllers.addUser)

/**
 * PUT /api/user/assign/:id
 */
router.put('/assign/:id', userControllers.assignUserForReview)

/**
 * PUT /api/user/:id
 */
router.put('/:id', userControllers.updateUser);

/**
 * DELETE /api/user/:id
 */
router.delete('/:id', userControllers.deleteUser);

/**
 * GET /api/user/review
 */
 router.get('/review/:id', userControllers.getAssignedUserForReview);

 /**
 * POST /api/user/review
 */
  router.post('/review', userControllers.addReview);

/**
 * PUT /api/user/review/:id
 */
router.put('/review/:id', userControllers.updateReview)

/**
 * DELETE /api/user/review/:id
 */
 router.delete('/review/:id', userControllers.deleteReview)

/**
 * POST /api/user/login
 */
router.post('/login', userControllers.loginUser)






export default router

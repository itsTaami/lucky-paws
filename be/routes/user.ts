import { Router } from 'express'
import {
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
  signUp,
  signIn,
  getFavAnimal,
  addFavAnimal,
  removeFavAnimal,
  addShoppingProduct,
  removeShoppingProduct,
  getShoppingProduct,
} from '../controller/user'

const router = Router()

router.route('/').get(getAllUsers)
router.route('/signin').post(signIn)
router.route('/signup').post(signUp)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)

router.route('/:id/favorites').get(getFavAnimal).post(addFavAnimal).delete(removeFavAnimal)
router.route('/:id/shoppingProduct').get(getShoppingProduct).post(addShoppingProduct).delete(removeShoppingProduct)

export default router

const { getUserData } = require("../helpers/main")
const categoryModel = require("../models/category")
const postModel = require("../models/post")


class Post {
    async getAllPosts(req, res) {
        try {

        } catch (error) {

        }
    }
    async createPost(req, res) {
        try {
            const { title, description, price, promotion, promotionType, categories, imageIds } = req.body
            const { id: ownerId } = getUserData(req)

            const post = await postModel.create({ title, description, price, promotion, promotionType, categories, images: imageIds, ownerId })

            for (let i = 0; i < categories.length; i++) {
                const categoryId = categories[i]
                await categoryModel.findByIdAndUpdate(categoryId, { $push: { postIds: post._id } }, { new: true })
            }
            return res.json({ message: "Успешно создано!" })
        } catch (error) {
            return res.status(400).json({ message: "Произашло ошибка при создание поста!", error })
        }
    }
    async updatePost(req, res) {
        try {
            const { title, description, price, promotion, promotionType, categories, imageIds, _id } = req.body

            const existingPost = await postModel.findById(_id);
            if (!existingPost) {
                return res.status(400).json({ message: "Пост не найден!" });
            }
            const existingCategories = existingPost.categories || [];

            // Обновить пост
            const post = await postModel.findByIdAndUpdate(_id,
                { title, description, price, promotion, promotionType, categories, images: imageIds },
                { new: true }
            );

            // Удалить пост из категорий, которые больше не связаны с ним
            const categoriesToRemove = existingCategories.filter(categoryId => !categories.includes(categoryId));
            for (let i = 0; i < categoriesToRemove.length; i++) {
                const categoryId = categoriesToRemove[i];
                await categoryModel.findByIdAndUpdate(categoryId, { $pull: { postIds: post._id } });
            }

            // Добавить пост в новые категории
            const categoriesToAdd = categories.filter(categoryId => !existingCategories.includes(categoryId));
            for (let i = 0; i < categoriesToAdd.length; i++) {
                const categoryId = categoriesToAdd[i];
                await categoryModel.findByIdAndUpdate(categoryId, { $push: { postIds: post._id } }, { new: true });
            }

            return res.json({ message: "Успешно создано!" })
        } catch (error) {
            return res.status(400).json({ message: "Произашло ошибка при создание поста!", error })
        }
    }
    async deletePost(req, res) {
        try {
            const response = await postModel.findByIdAndDelete(req.body._id)
            await res.json({ message: "Успешно удалено!", ...response })
        } catch (error) {
            return res.status(400).json({ message: "Произашло ошибка при удаление поста!", error })
        }
    }
}

module.exports = new Post
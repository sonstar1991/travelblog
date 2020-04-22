// import express from "express";
// const router = express.Router();
// import { requireSignin, adminMiddleware, authMiddleware, canUpdateDeleteBlog } from "../controllers/auth";
// import { create, list, listAllBlogsCategoriesTags, read, remove, update ,photo, listRelated, listSearch, listByUser, like, unlike, incrementViews} from "../controllers/blog";


const express = require('express');
const router = express.Router();
const {requireSignin, adminMiddleware, authMiddleware, canUpdateDeleteBlog} = require('../controllers/auth')
const { create, list, listAllBlogsCategoriesTags, read, remove, update ,photo, listRelated, listSearch, listByUser, like, unlike, incrementViews} =require('../controllers/blog')




router.post("/blog", requireSignin,adminMiddleware ,create);
router.get("/blogs", list);



router.post("/blogs-categories-tags", listAllBlogsCategoriesTags); 
router.get("/blog/:slug", incrementViews, read);

router.delete("/blog/:slug", requireSignin, adminMiddleware, remove);
router.put("/blog/:slug", requireSignin, adminMiddleware, update);

router.get('/blog/photo/:slug', photo)


router.post('/blogs/related', listRelated)
router.get('/blogs/search', listSearch)



//user blog crud
router.post("/user/blog", requireSignin,authMiddleware ,create);
router.put("/user/blog/:slug", requireSignin, authMiddleware, canUpdateDeleteBlog, update);
router.delete("/user/blog/:slug", requireSignin, authMiddleware, canUpdateDeleteBlog, remove);
router.get("/:username/blogs", listByUser);

router.put('/blog/like', requireSignin, like)

router.put('/blog/unlike', requireSignin, unlike)




module.exports = router;

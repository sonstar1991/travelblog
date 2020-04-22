// import Blog from "../models/blog";
// import Category from "../models/category";
// import Tag from "../models/tag";
// import formidable from "formidable";
// import slugify from "slugify";
// import stripHTML from "string-strip-html";
// import _ from "lodash";
// import { errorHandler } from "../helpers/dbErrorHandler";
// import fs from "fs";
// import { smartTrim } from "../helpers/blog";
// import User from "../models/user";
// import storage from "node-persist";



const User = require('../models/user')
const Blog = require('../models/blog')
const Tag = require('../models/tag')
const Category = require('../models/category')
const formidable=require('formidable')
const slugify=require('slugify')
const stripHTML=require('string-strip-html')
const _ =require('lodash')
const {errorHandler} =require("../helpers/dbErrorHandler")
const fs =require('fs')
const {smartTrim}=require("../helpers/blog")
const storage=require('node-persist')











exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "image could not upload"
      });
    }
    const { title, body, categories, tags } = fields;

    if (!title || !title.length) {
      return res.status(400).json({
        error: "title is required"
      });
    }

    if (!body || body.length < 200) {
      return res.status(400).json({
        error: "Content is too short"
      });
    }

    if (!categories || categories.length === 0) {
      return res.status(400).json({
        error: "At least one category is required"
      });
    }

    if (!tags || tags.length === 0) {
      return res.status(400).json({
        error: "At least one tag is required"
      });
    }

    let blog = new Blog();
    blog.title = title;
    blog.body = body;
    blog.excerpt = smartTrim(body, 100, " ", " ...");
    blog.slug = slugify(title).toLowerCase();
    blog.mtitle = `${title} | ${process.env.APP_NAME}`;
    blog.mdesc = stripHTML(body.substring(0, 160));
    blog.postedBy = req.user._id;

    let arrayOfCategories = categories && categories.split(",");
    let arrayOfTags = tags && tags.split(",");

    if (!files.photo) {
      return res.status(400).json({
        error: "there must be a featured image"
      });
    }

    if (files.photo) {
      if (files.photo.size > 30000000) {
        return res.status(400).json({
          error: "image should be less than 30MB in size"
        });
      }
      blog.photo.data = fs.readFileSync(files.photo.path);
      blog.photo.contentType = files.photo.type;
    }
    blog.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }

      Blog.findByIdAndUpdate(
        result._id,
        { $push: { categories: arrayOfCategories } },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err)
          });
        } else {
          Blog.findByIdAndUpdate(
            result._id,
            { $push: { tags: arrayOfTags } },
            { new: true }
          ).exec((err, result) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler(err)
              });
            } else {
              res.json(result);
            }
          });
        }
      });
    });
  });
};

exports.list = (req, res) => {
  Blog.find({})

    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name username")
    .select(
      "._id title  slug excerpt categories tags likes postedBy createdAt updatedAt"
    )
    .exec((err, data) => {
      if (err) {
        return req.json({
          error: errorHandler(err)
        });
      }
      res.json(data);
    });
};

exports.listAllBlogsCategoriesTags = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  let blogs;
  let categories;
  let tags;

  Blog.find({})
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name username profile")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select(
      "._id title slug excerpt categories tags likes postedBy createdAt updatedAt"
    )
    .exec((err, data) => {
      if (err) {
        return req.json({
          error: errorHandler(err)
        });
      }
      blogs = data;

      Category.find({}).exec((err, c) => {
        if (err) {
          return req.json({
            error: errorHandler(err)
          });
        }
        categories = c;
        Tag.find({}).exec((err, t) => {
          if (err) {
            return req.json({
              error: errorHandler(err)
            });
          }
          tags = t;

          res.json({ blogs, categories, tags, size: blogs.length });
        });
      });
    });
};

exports.read = (req, res) => {
  // let counter = 0;
  // counter++;

  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug })
    // .select("-photo")
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name username profile")
    .select(
      "._id title body slug mtitle mdesc categories tags likes  postedBy createdAt updatedAt"
    )
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err)
        });
      }
      // // Saves counter into the store and send response AFTER the store has been saved
      // storage.setItem("counter", counter).then(() => {
      //   res.json(counter);
      // });
      res.json(data);
    });
};

exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      return res.json({
        error: errorHandler(err)
      });
    }
    res.json({ message: "Blog deleted successfully" });
  });
};

exports.update = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug }).exec((err, oldBlog) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "image could not upload"
        });
      }

      let slugBeforeMerge = oldBlog.slug;
      oldBlog = _.merge(oldBlog, fields);
      oldBlog.slug = slugBeforeMerge;

      const { body, mdesc, categories, tags } = fields;

      if (body) {
        oldBlog.excerpt = smartTrim(body, 100, "", " ...");
        oldBlog.mdesc = stripHTML(body.substring(0, 160));
      }

      if (categories) {
        oldBlog.categories = categories.split(",");
      }

      if (tags) {
        oldBlog.tags = tags.split(",");
      }
      if (!files.photo) {
        return res.status(400).json({
          error: "there must be a featured image"
        });
      }

      if (files.photo) {
        if (files.photo.size > 30000000) {
          return res.status(400).json({
            error: "image should be less than 30MB in size"
          });
        }
        oldBlog.photo.data = fs.readFileSync(files.photo.path);
        oldBlog.photo.contentType = files.photo.type;
      }

      oldBlog.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err)
          });
        }

        res.json(result);
      });
    });
  });
};

exports.photo = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug })
    .select("photo")
    .exec((err, blog) => {
      if (err || !blog) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.set("Content-Type", blog.photo.contentType);
      return res.send(blog.photo.data);
    });
};

exports.listRelated = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 6;
  const { _id, categories } = req.body.blog;

  Blog.find({ _id: { $ne: _id }, categories: { $in: categories } })
    .limit(limit)
    .populate("postedBy", "_id name username profile")
    .select("title slug likes excerpt postedBy createdAt updatedAt")
    .exec((err, blogs) => {
      if (err) {
        return res.status(400).json({
          error: "Blogs not found"
        });
      }
      res.json(blogs);
    });
};

exports.listSearch = (req, res) => {
  console.log(req.query);
  const { search } = req.query;

  if (search) {
    Blog.find(
      {
        $or: [
          { title: { $regex: search, $options: "i" } }
          // { body: { $regex: search, $options: "i" } } //body
        ]
      },
      (err, blogs) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err)
          });
        }
        res.json(blogs);
      }
    ).select("-photo -body");
  }
};

exports.listByUser = (req, res) => {
  User.findOne({ username: req.params.username }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    let userId = user._id;
    Blog.find({ postedBy: userId })
      .populate("categories", "_id name slug")
      .populate("tags", "_id name slug")
      .populate("postedBy", "_id name username")
      .select("_id title slug likes postedBy createdAt updatedAt")
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err)
          });
        }
        res.json(data);
      });
  });
};

exports.like = (req, res) => {
  Blog.findByIdAndUpdate(
    req.body.blogId,
    { $push: { likes: req.body.userId } },
    { new: true }.exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      } else {
        res.json(result);
      }
    })
  );
};

exports.unlike = (req, res) => {
  Blog.findByIdAndUpdate(
    req.body.blogId,
    { $pull: { likes: req.body.userId } },
    { new: true }.exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      } else {
        res.json(result);
      }
    })
  );
};



exports.incrementViews = (req, res, next) => {
  const slug = req.params.slug
    Blog.findOneAndUpdate({slug}, {$inc: {"views": 1}}, {new: true})
        .exec((err, result) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err)
            })
          }
          next()
        })
  }
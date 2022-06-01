const User = require("../models/User");
const Category = require("../models/Category");
const Post = require("../models/Post");
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");
// user
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const date = new Date();

  let data = {
    name: name,
    email: email,
    password: password,
    createdAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
  };
  await User.create(data)
    .then((data) => {
      res.status(StatusCodes.OK).json({ status: "success", data: data });
    })
    .catch((err) => {
      res.status(StatusCodes.BAD_REQUEST).json({ status: "fail", errors: err });
    });
};
const login = async (req, res) => {
  const { email, password: candidatePassword } = req.body;
  let user = await User.findOne({ email: email });
  let isMatch = user.comparePassword(candidatePassword);
  if (isMatch) {
    let token = user.createJWT();
    res.status(StatusCodes.OK).json({
      status: "success",
      data: {
        token: token,
      },
    });
  } else {
    res
      .status(StatusCodes.OK)
      .json({ status: "fail", errors: "password is not true" });
  }
};
//blog
//create category
const createCategory = async (req, res) => {
  let { name: nameOfCategory } = req.body;
  await Category.create({
    name: nameOfCategory,
  })
    .then((data) => {
      res.status(StatusCodes.OK).json({ status: "success", data: data });
    })
    .catch((err) => {
      res.status(StatusCodes.BAD_REQUEST).json({ status: "fail", errors: err });
    });
};
const categories = async (req, res) => {
  await Category.find()
    .then((data) => {
      res.status(StatusCodes.OK).json({ status: "success", data: data });
    })
    .catch((err) => {
      res.status(StatusCodes.BAD_REQUEST).json({ status: "fail", errors: err });
    });
};
const createPost = async (req, res) => {
  let { title, description, url, content, category } = req.body;
  let info = res.locals.session;
  const date = new Date();
  let data = {
    title: title,
    description: description,
    url: url,
    content: content,
    by: info.userId,
    createdAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    category: category,
  };
  await Post.create(data)
    .then((data) => {
      res.status(StatusCodes.OK).json({ status: "success", data: data });
    })
    .catch((err) => {
      res.status(StatusCodes.BAD_REQUEST).json({ status: "fail", errors: err });
    });
};
const posts = async (req, res) => {
  let options = req.query;
  let limit = options.limit;
  let sort = options.sort;

  limit = parseInt(limit);
  if (!limit || limit <= 0) {
    limit = "0";
  }
  switch (sort) {
    case "asc": {
      sort = 1;
      break;
    }
    case "desc": {
      sort = -1;
      break;
    }
    default: {
      sort = -1;
    }
  }
  await Post.find()
    .limit(limit)
    .sort({ views: sort })
    .then((data) => {
      res.status(StatusCodes.OK).json({ status: "success", data: data });
    })
    .catch((err) => {
      res.status(StatusCodes.BAD_REQUEST).json({ status: "fail", errors: err });
    });
};
const postByID = async (req, res) => {
  let id = req.params.id;
  await Post.findOne({ _id: id })
    .then(async (data) => {
      let id = data._id;
      await updateViewer(id, data.views);
      res.status(StatusCodes.OK).json({ status: "success", data: data });
    })
    .catch((err) => {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ status: "success", errors: err });
    });
};
async function updateViewer(id, currentView) {
  let updateViewer = parseInt(currentView) + 1;
  await Post.updateOne({ _id: id }, { views: updateViewer });
}
const deletePostByID = async (req, res) => {
  let id = req.params.id;
  await Post.deleteOne({ _id: id })
    .then((data) => {
      res.status(StatusCodes.OK).json({ status: "success", data: data });
    })
    .catch((err) => {
      res.status(StatusCodes.BAD_REQUEST).json({ status: "fail", erros: err });
    });
};
const updatePostByID = async (req, res) => {
  let id = req.params.id;
  // res.status(StatusCodes.OK).json({ status: "success", data: id });
  const date = new Date();
  let { title, description, url, content, category } = req.body;
  let data = {
    title: title,
    description: description,
    url: url,
    content: content,
    createdAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    category: category,
  };
  // res.json(data)
  await Post.findByIdAndUpdate(id, data, (err, post) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ status: "fail", errors: err });
    } else {
      res.status(StatusCodes.OK).json({ status: "success", data: post });
    }
  });
};
module.exports = {
  // user
  register,
  login,
  //api
  //category
  createCategory,
  categories,
  //posts
  createPost,
  posts,
  postByID,
  deletePostByID,
  updatePostByID,
};

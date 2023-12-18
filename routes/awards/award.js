// const TalkShow = require("../../Models/imageArticle_schema");
const Award = require("../../Models/award_schema");
// const sub_category_schema = require("../../Models/sub_category_schema");

const Awards = {
  Create: async function (req, res) {
    try {
      let { title, date, time, host, place, image, description } = req.body;
      // let image ;

      if (req.file) image = req.file.filename;

      // The data is valid and new we can register the user
      let newUser = new Award({
        title,
        date,
        time,
        host,
        place,
        image,
        description,
      });

      let result = await newUser.save();

      return res.json(result);
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  },

  Delete_Award: async function (req, res) {
    let find = await Award.findById(req.body.id);

    if (find) {
      await find.delete();
      res.json("Award Deleted");
      return find;
    } else {
      throw new Error("Book not Found");
    }
  },
  Update: async function (req, res) {
    console.log(req.body.id);
    let data = Object.assign({}, req.body);
    let user_id = req.body.id;
    let image;
    if (req.file) {
      image = req.file.filename;
      data.image = image;
    }

    let update = await Award.findOneAndUpdate({ _id: user_id }, data, {
      isNew: true,
    });

    return res.json("Successfuly Updated");
  },



  Gets_Awardsid: async function (req, res) {
    try {
      console.log("req", req.body);
    

      const user = await Award.find().where("_id").equals(req.body.id);

      return res.json(user);
    } catch (error) {
      console.log(error);
    }
  },

  Gets_Awards: async function (req, res) {
    try {
      const user = await Award.find();

      return res.json(user);
    } catch (error) {
      console.log(error);
    }
  },
  getFeaturedItems: async function (req, res) {
    try {
      const featuredItems = await Award.find({ isFeatured: true }).sort({
        created_at: -1,
      });

      return res.json(featuredItems);
    } catch (error) {
      console.log(error);
    }
  },
  getOneArticle: async function (req, res) {
    try {
      let data = Object.assign({}, req.body);
      const article = await Award.find({ _id: data.id });

      return res.json(article);
    } catch (error) {
      console.log(error);
    }
  },
  getCategoryArticles: async function (req, res) {
    try {
      let data = Object.assign({}, req.body);
      let articles = null;
      if (data.category_id) {
        articles = await Award.find({ category_id: data.category_id });
      }
      if (data.sub_category) {
        articles = await Award.find({ sub_category: data.sub_category });
      }
      return res.json(articles);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = Awards;

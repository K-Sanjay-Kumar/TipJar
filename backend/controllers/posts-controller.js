import Users from "../collections/users.js";
import Posts from "../collections/posts.js";
import multer from "multer";

export const getPosts = async (req, res) => {
    const posts = await Posts.find({});
    res.status(200).json(posts);
};

// Storing the posts images in directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './frontend/public/images/posts')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname)
    }
  })
  
  const upload = multer({ storage })


export const createPost = async (req, res) => {

    upload.single('image')(req, res, async(err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: "Error uploading image" });
        }

        const { token, author, title, description, status } = req.body;
        const image = req.file ? req.file.filename : "";

        if (!title || !description) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }      

        try {
            // Find the user by the token (user ID)
            const user = await Users.findById(token);

            const newPost = new Posts({
                token,
                author,
                title,
                description,
                status,
                image, // Save the image filename in the post
            });

            await newPost.save();
            // Increment user's post count
            user.posts += 1; // Ensure `posts` is defined as a number in the schema
            await user.save();

            res.status(201).json({ success: true, message: "Post created successfully", data: newPost });
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({ success: false, message: error.message });
        }

    })
};

export const getPostsBytoken = async (req, res) => {
    try {
      const { token } = req.params;
      const posts = await Posts.find({ token });
      res.json({ success: true, posts });
    } catch (error) {
      res.status(500).json({ success: false, error: "Error fetching posts" });
    }
};

export const getPostsById = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Posts.findById(id);
        res.json({success: true, data: post});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const likePost = async (req, res) => {
    const { id } = req.body;
  
    try {
      const post = await Posts.findById(id);
  
      if (!post) {
        return res.status(404).json({ success: false, message: "Post not found" });
      }
  
      post.likes += 1;
      await post.save();
  
      res.json({ success: true, likes: post.likes });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
};

export const PostViews = async (req, res) =>{
    const { id } = req.body;
    try{
        const post = await Posts.findById(id);
        if(!post){
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        post.views += 1;
        await post.save();

        res.json({ success: true, views: post.views });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


export const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        await Posts.findByIdAndDelete(id);
        res.json({success: true, message: "Post deleted"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
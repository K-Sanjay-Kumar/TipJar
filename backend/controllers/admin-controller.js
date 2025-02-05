import Users from "../collections/users.js";
import Posts from "../collections/posts.js";
import contactus from "../collections/contactUs.js";


// Admin statistics handler
export const getAdminStats = async (req, res) => {
  try {
    // Fetch counts for statistics
    const totalUsers = await Users.countDocuments();
    const totalPosts = await Posts.countDocuments();
    const pendingPosts = await Posts.countDocuments({ status: "pending" });
    const acceptedPosts = await Posts.countDocuments({ status: "approved" });

    res.status(200).json({
      users: totalUsers,
      totalPosts: totalPosts,
      pendingPosts: pendingPosts,
      acceptedPosts: acceptedPosts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getadminUsers = async (req, res) => {
    const users = await Users.find({});
    res.status(200).json(users);
};

export const getadminPosts = async (req, res) => {
    const posts = await Posts.find({});
    res.status(200).json(posts);
};

export const deleteAdminUser = async (req, res) => {
    const { id } = req.params;

    try {
        await Users.findByIdAndDelete(id);
        res.json({success: true, message: "User deleted"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Approve a specific post by ID
export const approvePost = async (req, res) => {
    const { id } = req.body; // Extract post ID from request body
  
    try {
      const updatedPost = await Posts.findByIdAndUpdate(
        id,
        { status: "approved" }, // Set the status to "approved"
        { new: true } // Return the updated document
      );
  
      if (!updatedPost) {
        return res.status(404).json({ success: false, message: "Post not found." });
      }
  
      res.json({ success: true, message: "Post approved successfully.", data: updatedPost });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
};

// Reject a specific post by ID
export const rejectPost = async (req, res) => {
  const { id } = req.body; // Extract post ID from request body

  try {
    const updatedPost = await Posts.findByIdAndUpdate(
      id,
      { status: "rejected" }, // Set the status to "approved"
      { new: true } // Return the updated document
    );

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: "Post not found." });
    }

    res.json({ success: true, message: "Post rejected successfully.", data: updatedPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getContactUs = async (req, res) => {
    const contactUs = await contactus.find({});
    res.status(200).json(contactUs);
};
  


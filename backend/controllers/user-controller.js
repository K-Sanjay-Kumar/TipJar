import mongoose from "mongoose";
import Users from "../collections/users.js";
import contactus from "../collections/contactUs.js";
import multer from "multer";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    const users = await Users.find({});
    res.status(200).json(users);
};

export const validateLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }

        res.status(200).json({ success: true, token: user.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    const users = req.body;

    if (!users.name || !users.email || !users.password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if email already exists
        const existingUser = await Users.findOne({ email: users.email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(users.password, 10);
        users.password = hashedPassword;

        const newUser = new Users(users);
        await newUser.save();

        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("No user with that id");
    }

    try{
        const user = await Users.findById(id);

        if(!user){
            return res.status(404).send("No user with that id");
        }

        // res.status(200).json(user);
        res.status(200).json({ success: true, user: { name: user.name, image: user.image, email: user.email, number: user.number, posts: user.posts} });
    } catch(error){
        res.status(500).json({message: error.message});
    }
};


// Storing the user images in directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './frontend/public/images/users')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname)
    }
  })
  
  const upload = multer({ storage })

  
export const updateUser = async (req, res) => {
    
    upload.single('image')(req, res, async(err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: "Error uploading image" });
        }

        const { id, name, number } = req.body;

        const image = req.file ? req.file.filename : "";

        try {

            const updatedUser = await Users.findByIdAndUpdate(
                id,
                { name, number, image },  // Correct data format
                { new: true }      // Return the updated user object
            );
            
            res.status(200).json({ success: true, user: { name: updatedUser.name, number: updatedUser.number, image: updatedUser.image } });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    })
}

export const deleteUser = async (req, res) => {
    
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("No user with that id");
    }

    try{
        await Users.findByIdAndDelete(id);
        res.json({message: "User deleted"});
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

export const contactUs = async (req, res) => {
    const contact = req.body;

    if (!contact.name || !contact.email || !contact.subject || !contact.message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newContact = new contactus(contact);
        await newContact.save();

        res.status(201).json({ success: true, data: newContact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


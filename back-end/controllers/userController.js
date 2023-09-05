const User = require("../models/userSchema");
const Country = require("../models/countryShema");
const State = require("../models/stateSchema");
const City = require("../models/citySchema");
const Language = require("../models/languageSchema");

// User registration
exports.createUser = async (req, res) => {
  try {
    const { fullname, email, password, confirmPassword, country, state, city } =
      req.body;
    console.log(req.body);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const newUser = new User({
      FullName: fullname,
      Email: email,
      Password: password,
      Country: country,
      State: state,
      City: city,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getCountries = async (req, res) => {
  try {
    const countries = await Country.find();

    res.json(countries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getLanguages = async (req, res) => {
  try {
    const Languages = await Language.find();

    res.json(Languages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getCities = async (req, res) => {
  try {
    const Cities = await City.find({ State: req.params.id });

    res.json(Cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getStates = async (req, res) => {
  try {
    const States = await State.find({ Country: req.params.id });

    res.json(States);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { userID, ...updatedUserData } = req.body;

    const updatedUser = await User.findByIdAndUpdate(userID, updatedUserData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      customLabels: { docs: "users", totalDocs: "totalImages" },
    };

    // Use the paginate method to get paginated users
    const result = await User.paginate({}, options);

    // Format the users as needed
    const formattedUsers = result.users.map((user) => ({
      _id: user._id,
      FullName: user.FullName,
      Email: user.Email,
      Password: user.Password,
      Country: user.Country ? user.Country.Name : "N/A",
      State: user.State ? user.State.Name : "N/A",
      City: user.City ? user.City.Name : "N/A",
      Languages: user.Languages,
      IsActive: user.IsActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));

    // Include pagination data in the response
    const response = {
      users: formattedUsers,
      totalUsers: result.totalImages,
      totalPages: result.totalPages,
      currentPage: result.page,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.removeUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await User.findByIdAndDelete(userId);

    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.create = async (req, res) => {
  try {
    // const newUser = new Language({
    //   Name: "Hindi",
    // });

    // await newUser.save();

    //  const newUser = new City({
    //    Name: "Idukki",
    //    State: "64f72b46b2ab7f4f8ab67c53",
    //  });

    //  await newUser.save();

    //  const newUser = new State({
    //    Name: "Goa",
    //    Country: "64f72a79673f76f1d8610bbe",
    //  });

    //  await newUser.save();

    //  const newUser = new Country({
    //    Name: "Oman",
    //  });

    //  await newUser.save();

    res.status(200).json({ message: "pending successful" });
  } catch (error) {}
};

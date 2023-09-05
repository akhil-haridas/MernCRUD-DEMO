const User = require("../models/userSchema");
const Country = require("../models/countryShema");
const State = require("../models/stateSchema");
const City = require("../models/citySchema");
const Language = require("../models/languageSchema");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

// Your createUser function
exports.createUser = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { FullName, Email, Password, Country, State, City,IsActive, Languages } = req.body;

    const existingUser = await User.findOne({ Email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    const newUser = new User({
      FullName,
      Email,
      Password: hashedPassword,
      Country,
      State,
      City,
      Languages,
      IsActive,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
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
    if (updatedUserData.Password) {

      const saltRounds = 10; 
      const hashedPassword = await bcrypt.hash(
        updatedUserData.Password,
        saltRounds
      );
      updatedUserData.Password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userID, updatedUserData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const { Password, ...responseUserData } = updatedUser.toObject();

    return res.json(responseUserData);
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
      populate: [
        { path: "Country", select: "Name" }, 
        { path: "State", select: "Name" },
        { path: "City", select: "Name" }, 
        { path: "Languages", select: "Name" },
      ],
    };

    const result = await User.paginate({}, options);

    const formattedUsers = result.users.map((user) => ({
      _id: user._id,
      FullName: user.FullName,
      Email: user.Email,
      Password: user.Password,
      Country: user.Country ? user.Country.Name : "N/A",
      State: user.State ? user.State.Name : "N/A",
      City: user.City ? user.City.Name : "N/A",
      Languages: user.Languages.map((language) => language.Name), 
      IsActive: user.IsActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));

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
    //   Name: "Kannada",
    // });

    // await newUser.save();

     const newUser = new City({
       Name: "Red Deer",
       State: "64f77cc7c93eb16300c38d7c",
     });

     await newUser.save();

    //  const newUser = new State({
    //    Name: "Northern Ireland",
    //    Country: "64f77bb0126e1c42e1d37175",
    //  });

    //  await newUser.save();

    //  const newUser = new Country({
    //    Name: "United Kingdom(UK)",
    //  });

    //  await newUser.save();

    res.status(200).json(newUser);
  } catch (error) {}
};

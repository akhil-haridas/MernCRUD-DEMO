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
    console.log(errors.array())
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 

    const { FullName, Email, Password, Country, State, City,IsActive, Languages } = req.body;

    const existingUser = await User.findOne({ Email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
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


function generateSampleData(numDocuments) {
  const sampleData = [];

  for (let i = 6; i < numDocuments; i++) {
    const fullName = `User ${i + 1}`;
    const email = `user${i + 1}@example.com`;
    const password = "$2b$10$SomeHashedPassword"; // Use a real hash if needed
    const countryId = "64f7c0f3bc2a52abd079ada3"; // Replace with a real ObjectId
    const stateId = "64f7c27823d357f7d85c7494"; // Replace with a real ObjectId
    const cityId = "64f7ccc12502b6bcb84ee6ee"; // Replace with a real ObjectId
    const languages = [
      "64f7cf10a15986f641010962",
      "64f7cf10a15986f641010961",
    ];
    const isActive = i % 2 === 0; 

    const user = {
      FullName: fullName,
      Email: email,
      Password: password,
      Country: countryId ,
      State: stateId,
      City: cityId,
      Languages: languages.map((langId) => langId ),
      IsActive: isActive,
    };

    sampleData.push(user);
  }

  return sampleData;
}

// Generate 5 sample data documents
const numDocuments = 50;
const generatedData = generateSampleData(numDocuments);

    
    User.insertMany(generatedData)
      .then((docs) => {
        console.log(`Successfully inserted ${docs.length} documents.`);
        // // Close the MongoDB connection
        // mongoose.connection.close();
      })
      .catch((error) => {
        console.error("Error inserting documents:", error);
      });

    
console.log(JSON.stringify(generatedData, null, 2));




 










    
    //  const citiesToSave = [
    //    {
    //      Name: "Tamil",
    //    },
    //    {
    //      Name: "Malayalam",
    //    },
    //    {
    //      Name: "Portuguese",
    //    },
    //    {
    //      Name: "Spanish",
    //    },
    //    {
    //      Name: "French",
    //    },
    //    {
    //      Name: "German",
    //    },
    //    {
    //      Name: "Chinese",
    //    },
    //    {
    //      Name: "Arabic",
    //    },
    //    {
    //      Name: "Bengali",
    //    },
    //    {
    //      Name: "Hindi",
    //    },
    //    {
    //      Name: "Korean",
    //    },
    //    {
    //      Name: "Japanese",
    //    },
    //    {
    //      Name: "Urdu",
    //    },
    //    {
    //      Name: "Italian",
    //    },
    //    {
    //      Name: "Russian",
    //    },
    //    {
    //      Name: "Bengali",
    //    },
    //    {
    //      Name: "Dutch",
    //    },
    //    {
    //      Name: "Swedish",
    //    },
    //    {
    //      Name: "Greek",
    //    },
    //  ];

     // Use the insertMany() method to save multiple documents
    //  Language.insertMany(citiesToSave)
    //    .then((result) => {
    //      console.log(`${result.length} cities saved successfully`);
    //    })
    //    .catch((error) => {
    //      console.error(`Error saving cities: ${error}`);
    //    });

    //  const newUser = new State({
    //    Name: "Vancouver",
    //    Country: "64f7c21ba3b2e57d2f1370cf",
    //  });

    //  await newUser.save();

    //  const newUser = new Country({
    //    Name: "Australia",
    //  });

    //  await newUser.save();

    // res.status(200).json(newUser);
  } catch (error) {}
};

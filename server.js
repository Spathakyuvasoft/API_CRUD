const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();

const userDataRoutes = require("./routes/userDataRoutes");
const userRoutes = require("./routes/userRoutes");
// app.use(
//   session({
//     secret: "fiwafhiwfwhvuwvu9hvvvwv", // Never ever share this secret in production, keep this in separate file on environmental variable
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 86400000 },
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGODB_URI,
//     }),
//   })
// );

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path);
  console.log(req.method);
  next();
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(8000, () => {
      console.log("connected to db & listening on port", 8000);
    });
  })
  .catch((err) => {});

app.use("/api/user", userRoutes);
app.use("/api/userData", userDataRoutes);

// app.post("/signupUser", async (req, res) => {
//   const { name, email, password } = req.body;
//   console.log(req.body);
//   try {
//     // using the userSchema static method
//     const user = await User.signup(name, email, password);
//     console.log(user);

//     // create a Token
//     const token = createToken(user._id);

//     res.status(200).json({ name, email, token });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   console.log(req.body);
//   try {
//     const user = await User.login(email, password);
//     const { name } = user;
//     // create a Token
//     const token = createToken(user._id);
//     res.status(200).json({ name, email, token });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ ...error });
//   }
// });

// app.use(requireAuth);

// app.post("/addUser", async (req, res) => {
//   const userDetail = req.body;
//   try {
//     const data = await userData.create({ ...userDetail });
//     const { name, email, phone, gender, personId, _id } = data;
//     console.log(data);
//     res.status(200).json({
//       status: "ok",
//       data: { name, email, phone, gender, personId, _id },
//     });
//   } catch (err) {
//     console.log(err.message);
//     res.status(400).json({ status: "error", message: err.message });
//   }
// });

// app.post("/addManyUser", async (req, res) => {
//   const userDetail = req.body;
//   try {
//     const data = await userData.insertMany([...userDetail]);
//     console.log(data);
//     res.status(200).json({
//       status: "ok",
//     });
//   } catch (err) {
//     console.log(err.message);
//     res.status(400).json({ status: "error", message: err.message });
//   }
// });

// app.get("/getAllUsers", async (req, res) => {
//   try {
//     const data = await userData.find();
//     res.status(200).json({
//       status: "ok",
//       data: data,
//     });
//   } catch (err) {
//     res.status(400).json({ status: "error", message: err.message });
//   }
// });

// app.put("/editUser", async (req, res) => {
//   const user = req.body;
//   console.log(user._id);
//   try {
//     await userData.findByIdAndUpdate(user._id, { ...req.body });
//     const data = await userData.findById(user._id);
//     const { name, email, phone, gender, personId, _id } = data;
//     res.status(200).json({
//       status: "ok",
//       data: { name, email, phone, gender, personId, _id },
//     });
//   } catch (err) {
//     console.log(err.name);
//     res.status(400).json({ status: "error", message: err.message });
//   }
// });

// app.delete("/deleteUser/:id", async (req, res) => {
//   const id = req.params.id;
//   console.log(req.params.id);
//   try {
//     const resDlete = await userData.findByIdAndDelete(id);
//     console.log(5555, resDlete);
//     res.status(204).json({ status: "ok", data: resDlete?._id });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ status: "error", message: err.message });
//   }
// });

// app.get("/", (req, res) => {
//   res.write("<h1>Hello world</h1>");
//   res.send();
// });

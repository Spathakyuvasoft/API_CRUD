const userData = require("../model/userDataModel");

const addUser = async (req, res, next) => {
  const userDetail = req.body;
  console.log(userDetail);
  try {
    const data = await userData.create({ ...userDetail });
    const { name, email, phone, gender, personId, _id } = data;
    console.log(data);
    res.status(200).json({
      status: "success",
      message: "Successfully created User",
      data: { name, email, phone, gender, personId, _id },
    });
  } catch (err) {
    next(err);
    // res.status(400).json({ status: "error", message: err.message });
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  console.log("param", req.params.id);
  try {
    const data = await userData.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      message: "Successfully Deleted User",
      data: data?._id,
    });
  } catch (err) {
    next(err);
    // res.status(400).json({ status: "error", message: err.message });
  }
};

const editUser = async (req, res, next) => {
  const { id } = req.params;
  
  console.log(id);
  try {
    await userData.findByIdAndUpdate(id, { ...req.body });
    const data = await userData.findById(id);
    const { name, email, phone, gender, personId, _id } = data;
    res.status(200).json({
      status: "success",
      message: "Successfully Updated User",
      data: { name, email, phone, gender, personId, _id },
    });
  } catch (err) {
    next(err);
    // res.status(400).json({ status: "error", message: err.message });
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const data = await userData.find();
    if (!data) {
      throw Error("Not found");
    }
    res.status(200).json({
      status: "success",
      message: "Successfully Retrived All User",
      data: data,
    });
  } catch (err) {
    next(err);
    // res.status(400).json({ status: "error", message: err.message });
  }
}; 

const getUser=async(req,res,next)=>{ 
  try {
    const id = req.params.id;
    const user = await userData.findById(id);
    console.log(user) 
    console.log(req.params.id)
    if (!user){
      return res.status(404).json({
        status:"fail",
        message:"User not found"
      })
    } 

    res.status(200).json({
      status:"success",
      message:"user Found",
      data:user
    })
  } catch(error){
    next(error)
  }
 

}

module.exports = { addUser, deleteUser, editUser, getAllUsers,getUser };

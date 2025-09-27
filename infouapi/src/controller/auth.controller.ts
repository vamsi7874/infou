import { insertOne, findOne } from "../common/mongo";

exports.validateLogin = async (req: any, res: any) => {
  try {
    let userObj = await findOne("users", "email", req?.body?.email);

    if (userObj?.password == req?.body?.password) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

exports.signUp = async (req: any, res: any) => {
  try {
          console.log(req?.body,"response");
    if (req.body) {
      let email = req?.body?. email;
      let mobile = req?.body?.mobile;
      let password = req?.body?.password;
      let access_level = "admin";
      let collection = "users";

      if (!email || !mobile || !password) {
        return
    
      }
         const res =  await insertOne(collection, { email, mobile, password, access_level });
         console.log(res,"response");
         

         return res;
    }
  } catch (e: any) {
    console.log(e, "error occur");

    return e?.data;
  }
};

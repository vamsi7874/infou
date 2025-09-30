import { insertOne, findOne } from "../common/mongo";

class RES {
  message : string = ''
  data : any = ''
  constructor(message : any,data : any){
    this.message = message
    this.data = data


  }
}

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
    if (req.body) {
      let email = req?.body?. email;
      let mobile = req?.body?.mobile;
      let password = req?.body?.password;
      let access_level = "admin";
      let collection = "users";

      if (!email || !mobile || !password) {
        return `Required :  ${email ? '' : 'email'} ${mobile ? '' : ',mobile'} ${password ? '' : ',password'}`
    
      }
         const res =  await insertOne(collection, { email, mobile, password, access_level });
         if(res){
          return new RES("Inserted Sucessfully",res);
         }
         

         return res;
    }
  } catch (e: any) {

    return new RES( "Missing Required Fileds For user Creation",  e?.data);
  }
};

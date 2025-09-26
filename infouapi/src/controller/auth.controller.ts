
exports.validateLogin = async (req : any,res : any)=>{


    try{

         if(req?.body?.email && req?.body?.password){
        return true
    }
    else{
        return false
    }

    }
    catch(e){

        return false

    }

   

}
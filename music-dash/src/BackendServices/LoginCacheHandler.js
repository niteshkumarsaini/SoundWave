class LoginCacheHandler{


    static token;
    static saveToken(token){
        localStorage.setItem("token",token);
    }

    static validateToken(){
       this.token =JSON.stringify(localStorage.getItem("token"));
       
        if(this.token==="" || this.token===null || this.token===undefined || this.token==="null"){
         console.log("i am here in the token section");
            return false;
        }
        else{
            console.log(this.token)
            console.log("I am not here in the token section");
            return true;
        }

    }
    static logout(){
        localStorage.removeItem("token");
    }

    static getSavedToken(){
      let token=localStorage.getItem("token");
      console.log(token)
      return token;
    }


}
export default LoginCacheHandler;
class UserCache{
   static saveUser(user){
    localStorage.setItem("ActiveUser",user);
    return true;
   }

   static getUser(){
    let user=localStorage.getItem("ActiveUser");
    return user;
   }

   static removeActiveUser(){
    localStorage.removeItem("ActiveUser");
   }
}
export default UserCache;
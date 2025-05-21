import axios from "axios";
import Swal from "sweetalert2";
import LoginCacheHandler from "./LoginCacheHandler";
import BackendService from "./Backend";

class SongService {
  static async sendSong(formData) {
    //Fetch the token
    let token=LoginCacheHandler.getSavedToken();
    if(token===null || token==="null" || token===undefined || token===''){
      console.log("Token does not exist..")
    }
    let validationResponse=await BackendService.validateTokenWithBackend();
    formData.append("username",validationResponse.username);
    console.log(validationResponse);

    if(validationResponse.valid===false){
       await Swal.fire({
              title: "Authentication Failed.",
              text: "Session timedout. Please login.",
              icon: "error"
            }).then(()=>{
              LoginCacheHandler.logout();
              window.location.href="/signin"
            })
            return
    }



    
    //validating the token with the backend
    console.log("request is in process..");
    axios
      .post("http://localhost:8000/api/v1/videos/save", formData,{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response);
        Swal.fire({
          title: "Conrgratulations.",
          text: "Your Song has been uploaded successfully..",
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
  }
}

export default SongService;

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  signUpUrl: string = 'http://localhost:3000/user/signup';
  loginUrl: string = 'http://localhost:3000/user/login';
  profUrl: string = 'http://localhost:3000/doctors/doctorDetail';
  updateUrl:string='http://localhost:3000/doctors/updateDetails'
  checknumUrl:string='http://localhost:3000/user/numCheck'
  changePwdUrl:string='http://localhost:3000/user/changePassword'
  otpLogInUrl: string='http://localhost:3000/user/loginWithOtp'
  isUserLoggedIn: boolean = false;
mobileNumberLoggedIn:string=''           //this has to be initalized while login hardcoded for testi
  userId: string = '';
  name: string='';
  first_name: string='';
  last_name: string='';
  gender: string='';
  id: string='';
  emailOfLoggedInUser: string='';
  
  constructor(private httpClient: HttpClient) {}
  createBasicAccount(req: any): Observable<any> {
    delete req.dob;
    delete req.gender;
    delete req.acceptTerms;
    delete req.email;

    return this.httpClient.post<any>(this.signUpUrl, req);

    //return this.httpClient.post<IDoctorTimeline>(this.url)
  }
  fetchUserDetails(req: any): Observable<any> {
    return this.httpClient.post<any>(this.profUrl, req);
  }
  logIn(req: any): Observable<any> {
    return this.httpClient.post<any>(this.loginUrl, req);
    
    const detailReq={
      id:this.userId!||1,

      role:"user",
  
      fields:["name","first_name","last_name","gender","id","email","mobile"]

    }
    this.fetchUserDetails(detailReq).subscribe((data)=>{
      let dataReceived=data.results[0]
      this.name=dataReceived.name
      this.first_name=dataReceived.first_name
      this.last_name=dataReceived.last_name
      this.gender= dataReceived.gender
      this.id= dataReceived.id
      this.emailOfLoggedInUser=dataReceived.email
      this.mobileNumberLoggedIn=dataReceived.mobile

    },(err)=>{
      console.log("Logged in user data retrieval failed")
    })
    //return this.httpClient.post<IDoctorTimeline>(this.url)
  }
logInUsingOTP(req:any): Observable <any>{
  return this.httpClient.post<any>(this.otpLogInUrl, req);
}
  logout() {
    localStorage.removeItem('id_token');
    //localStorage.removeItem("expires_at");
  }
  public isLoggedIn() {
    if (localStorage.getItem('id_token') !== null) {
      return true;
    }
    return false;
  }
public resetPasswordAPICall(req:any):Observable<any>{
  return this.httpClient.post<any>(this.changePwdUrl,req)

}
  public updateDetails(req:any):Observable<any>{

    return this.httpClient.put<any>(this.updateUrl,req)
  }
  public checNumExists(req:any):Observable<any>{
    return this.httpClient.post<any>(this.checknumUrl,req)
  }
}

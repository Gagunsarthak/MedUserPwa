export interface IDoctorTimeline{
    id: string;
    address:String;
    ailmentsTreated:String[];
    averageRating:number;
    city:String;
    country:String;
    designation:String;
    education: IEducationDetails[];
    email:String;
    experience:IExperienceDetails[];
    firstName:String,
    gender:String;
    associatedClinics:IClinicDetails[]
    hospital:IHospitalDetails;
    isPersonAllowed:String;
    isVideoAllowed: String;
    landmark: String,
    languages:  String[],
    lastName: String,
    licenses:ILicenseDetail;
    locality: String,
    location: String,
    name: String,
    phone: String,
    specialization: String[],
    state: String,
    yearsOfExperience: String;
    schedule:IScheduleDetails[];
    awardsAndPublications:IAwardsAndPublications[];
    reviewTags:IReviewTags[],
    noOfReviews:String,
    consultations:String,
    satisfiedPatients:String,
    profImageUrl:String
}


  export interface IScheduleDetails{
    day: String,
    slotTimeInMinutes: String,
    workingTime:IWorkingTimeDetails[]
  }
  export interface IEducationDetails{
    degree: String,
    description:String,
    endDate: String,
    studyField: String,
    grade: String,
    institution:String,
    startDate: String
}
export interface IExperienceDetails{
    comapanyName: String;
    description: String;
    endDate: String;
    location: String;
    startDate: String;
    title: String 
}
export interface IHospitalDetails{
    identifier:String;
    name:String

}
export interface ILicenseDetail{
    identifier: String,
    name: String,
    registrationYear: String,
    validUpTo: String,
    provider: String
}
export interface IWorkingTimeDetails{
    startTime: String,
    endTime: String
}
export interface IClinicDetails{
    clinicName:String,
    location:String,
    fees:String,
    review:String
    tagReceived:String[],
    schedule: IClinicSchedule[]
}
export interface IClinicSchedule{
    from:String,
    to:String
    duration:String[]

}
export interface IAwardsAndPublications{
    awardName:String,
    date:String,
    place:String
}
export interface IUserReviewTags{
    reviewRating:number,
    reviewMessage: String,
    reviewDate: Date,
    userId: String,
    doctorId: String,
    userName: String,
    isVerifiedUser: boolean,
    reviewlastEditedOn: Date,
    userScheduleId: String,
    accurateDiagnosisRating:number,
    friendlinessAndWaitTimeRating:number,
    bedsideMannerismRating:number,
    staffCourteousnessRating:number,
    role:String,
    patientEducationRating:number
   
}
export interface IReviewRequest{
    role:String, 
    pageSize: number,
    pageNo:number,
    doctorId:String,
    sort?: ISortableField
}

export interface ISortableField{
    reviewRating?:String,

    reviewDate?:String,

  reviewlastEditedOn?:String
}
export interface ISignUpReq{
    
        fullName:String, 
        mobileNumber:String,
        password:String,
        dob:Date,
        gender:String,
        confirmPassword:  String     
      
     
}
export interface IReviewTags{
    tagName:String,
    description:String
}

export interface IDocProfEditReq{
    id : string[],
    role : String,
    address?:String;
    ailmentsTreated?:String[];
    averageRating?:String;
    city?:String;
    country?:String;
    designation?:String;
    education?: IEducationDetails[];
    email?:String;
    experience?:IExperienceDetails[];
    firstName?:String,
    gender?:String;
    associatedClinics?:IClinicDetails[]
    hospital?:IHospitalDetails;
    isPersonAllowed?:String;
    isVideoAllowed?: String;
    landmark?: String,
    languages?:  String[],
    lastName?: String,
    licenses?:ILicenseDetail;
    locality?: String,
    location?: String,
    name?: String,
    phone?: String,
    specialization?: String[],
    state?: String,
    yearsOfExperience?: String;
    schedule?:IScheduleDetails[];
    awardsAndPublications?:IAwardsAndPublications[];
    reviewTags?:IReviewTags[],
    noOfReviews?:String,
    consultations?:String,
    satisfiedPatients?:String,
    profImageUrl?:String
}
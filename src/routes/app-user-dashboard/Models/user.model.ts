export interface IUserDetails{
    first_name: String,
    name: String
            last_name?: String ,
            DOB?: String,
            gender?: String,
            mobile?: String,
            address?: String,
            landmark?: String,
            locality?: String,
            city?: String ,
            state?: String,
            country?: String 
            Zipcode?:  Number,
            role?: String   
            language?: String   
            blood_donor?: boolean,
            medical_records: {
                blood_group: String,
                pre_existing_conditions:IExistingConditions [ ],
                allergies:String [  ],
                past_procedures:IPastProcedures [  ],
                smoker: false,
                alcohol_user: false,
                drug_user: false
            },
            insurance_details: {
                id: String,
                provider: String,
                coverage: {
                    start_date: Date,
                    end_date: Date
                },
                documents: String
            },
            coins: number,
            isPremiumUser: false,
            medicalDetails: [
                {
                    name: String,
                    bmi:  Number,
                    heartRate:  Number,
                    fbcStatus:  Number,
                    weight:  Number,
                    orderDate: Date
                }
            ]
        }
export interface IExistingConditions{
    name: String,
    duration:  Number
}
export interface IPastProcedures{
    name:String,
    date:Date
}




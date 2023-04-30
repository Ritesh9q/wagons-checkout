
const Validation = (values)=>{
 
    let errors = {}

    if(!values.name){
        errors.name="Name is required.";
    } 


    if(!values.email){
        errors.email="Email is required.";
    } 


    if(!values.mobile_number){
        errors.mobile_number="Mobile no. is required.";
    }
    else if (values.mobile_number.length <10){
        errors.mobile_number="Mobile no. must be 10 digit.";
    }
    else if(isNaN(values.mobile_number)){
        errors.mobile_number="It must be number.";
    }

    if(!values.city){
        errors.city="City name is required."
    }
    if(!values.college_name){
        errors.college_name="College name is required.";
    }
    if(!values.university_name){
        errors.university_name="University name is required.";
    }

    if(!values.about_wagons){
        errors.about_wagons="This field is required.";
    }


    return errors;
}

export default Validation;

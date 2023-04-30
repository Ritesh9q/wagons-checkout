import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import Validation from "./Validation";
import axios from "axios";
import Swal from 'sweetalert2';
import Success from "./Success";

const Home = () => {
  const [success,setSuccess] = useState(false);
  const [values,setValues] = useState({
       name:'',
       email:'',
       mobile_number:'',
       city:'',
       college_name:'',
       university_name:'',
       about_wagons:''
  })
 console.log("form", values)
  
  let id;

  const [errors,setError] = useState({});

  function handleChange(e){
      setValues({...values,[e.target.name]:e.target.value});
  }

  function handleSubmit(e){
    e.preventDefault();
     console.log(Validation(values));

    setError(Validation(values));
      // if((Object.keys(errors).length === 0) && values.name !=="" && values.email !=="" && values.mobile_number !=="" && values.college_name !=="" && values.university_name !=="" && values.city !=="" && values.about_wagons !==""){
       
      // }
    
   // alert(Object.keys(errors).length);
 
  //   if((Object.keys(errors).length === 0) && values.name !=="" && values.email !=="" && values.mobile_number !=="" && values.college_name !=="" && values.university_name !=="" && values.city !=="" && values.about_wagons !==""){
     
  //     setLoader(true);
  //     axios({
  //     method: 'POST',
  //     url: 'http://localhost/university-api/add_details.php',
  //     //url: 'https://phpapi.wagonslearning.com/add_details.php',
  //     data: {...values}
  //   })
  //   .then(function (response) {
  //     setLoader(false);
  //    // alert(response.data)
  //     console.log(response.data.id);
  //     id=response.data.id;
  //     console.log('ID: '+id);
  //     handlePayment()
      
  //   });

  // }
  }
  useEffect(()=>{

    if((Object.keys(errors).length === 0) && values.name !=="" && values.email !=="" && values.mobile_number !=="" && values.college_name !=="" && values.university_name !=="" && values.city !=="" && values.about_wagons !==""){
     
      setLoader(true);
      axios({
      method: 'POST',
     // url: 'http://localhost/university-api/add_details.php',
      //url: 'https://paymentapi.wagonseducation.com/add_details.php',
      url:'https://magmago.com/api/add_details.php',
      data: {...values}
    })
    .then(function (response) {
      setLoader(false);
     // alert(response.data)
      console.log(response.data.id);
      id=response.data.id;
      console.log('ID: '+id);
      handlePayment()
      
    });

  }
    
  },[errors])

  // const MyAlert = ()=>{
  //   Swal.fire(
  //     'Thank You!!!',
  //     'Registration completed successfully.',
  //     'success'
  //   )
  // }


  const Razorpay = useRazorpay();


let razorpay_payment_id;
let status_code;



const handlePayment = async (params) => {

  //const order = await createOrder(params); //  Create order on your backend

  const options = {
    //key:"rzp_test_3MW1RqVGSymGqq",
    key: "rzp_live_cRShPYSUYAOhR5", // Enter the Key ID generated from the Dashboard
    amount:  (1*100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Wagons Education",
    description: "Wagons Education",
    image: "https://wagonseducation.com/uploads/system/c3aba71d83a384212ca58138b5443677.png",
   // order_id: "5", //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
    handler: function (response) { 
     // alert(response);
      console.log(response);
      // update ap call (response.razorpay_payment_id, dbid )
      // alert(response.razorpay_payment_id);
      razorpay_payment_id= response.razorpay_payment_id;
      status_code= response.status_code;

      updateEntry();
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature);

    },
    // prefill: {
    //   name: "Piyush Garg",
    //   email: "youremail@example.com",
    //   contact: "9999999999",
    // },
    // notes: {
    //   address: "Razorpay Corporate Office",
    // },
    theme: {
      color: "#3399cc",
    },
  };

  function updateEntry(){
    setLoader(true);
    axios({
      method: 'POST',
     // url: 'http://localhost/university-api/update_details.php',
      //url: 'https://paymentapi.wagonseducation.com/update_details.php',
      url:'https://magmago.com/api/update_details.php',
      data: {
        id:id,
        payment_id: razorpay_payment_id,
        status: status_code,
        amount: options.amount
      }
    })
    .then(function (response) {
      setLoader(false);
     // alert(response.data)
     console.log(response.data);
      if(status_code===200){
        // MyAlert();
        setSuccess(true);
        
      }
      
    });
  }

  const rzp1 = new Razorpay(options);

  rzp1.on("payment.failed", function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });

  rzp1.open();
};

  const [show, setShow] = useState(1);
  const [loader,setLoader] = useState(false);
  // const [submit,setSubmit] = useState(false);

  return (
   
    <div className="container mt-5 ">
      {/* <button onClick={MyAlert}>Click Me</button> */}
    {loader &&
     <div className="spinner-wrapper">
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      </div>
      }
 {!success &&
      <div className="accordion " id="accordionExample">
        <div className="accordion-item m-2">
          <h2
            style={{
              backgroundColor: "#566573",
              color: "white",
              fontWeight: "700",
            }}
            className="accordion-header "
            id="headingOne"
          >
            <div  className="row align-items-center">
              <div style={{margin:'0px'}} className="col">
                <span
                  style={{
                    backgroundColor: "#566573",
                    color: "white",
                    fontWeight: "700",
                  }}
                  className="accordion-b"
                >
                  {show == 1 && (
                    <i
                      style={{
                        fontSize: "35px",
                        color: "white",
                        margin: "5px",
                      }}
                      className="bi bi-1-square-fill"
                    ></i>
                  )}
                  {show !== 1 && (
                    <i
                      style={{
                        fontSize: "35px",
                        color: "#4BFF79",
                        margin: "5px",
                      }}
                      className="bi bi-check-circle"
                    ></i>
                  )}
                  CART SUMMARY
                </span>
              </div>
              {show !== 1 && (
                <div className="col-auto mx-auto border-0 margin-0">
                  <p style={{ fontSize: "20px" }} className="text-center m-2">
                    Grand Total: ₹1,000
                  </p>
                </div>
              )}
              {show !== 1 && (
                <div className="col-auto border-0 margin-0">
                  <button onClick={() => setShow(1)} className="btn btn-light m-2">
                    CHANGE
                  </button>
                </div>
              )}
            </div>
          </h2>
          <div
            id="collapseOne"
            className={`accordion-collapse  collapse ${show === 1 ? "show" : ""}`}
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="row">
                <div className="col-lg-1 col-md-12 col-sm-12">
                  <img
                    src="https://www.simplilearn.com/ice9/course_images/icons/PMP.svgz"
                    width={80}
                    alt=""
                  />
                </div>

                <div className="col-lg-6">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <b>PMP</b>
                        </td>
                      </tr>
                      <tr>
                        <td>Training type:</td>
                        <td>Online Bootcamp</td>
                      </tr>
                      <tr>
                        <td>Access Validity:</td>
                        <td>
                          Live Online Classes:<b> 90 Days</b>{" "}
                        </td>
                        <td>
                          Self Learning: <b>Lifetime</b>
                        </td>
                      </tr>
                      <tr>
                        <td>No. of learners:</td>
                        <td>1 </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-lg-2"></div>

                <div className="col-lg-3">
                  <span
                    style={{
                      float: "right",
                      marginTop: "100px",
                      margin: "3px",
                      marginRight: "0px",
                    }}
                    className="text-right"
                  >
                    {/* <b><span style={{float:'right'}}>₹1,000</span></b><br/> */}
                    <span style={{ float: "right" }}>
                      Total Price: &nbsp; <b>₹1,000</b>
                    </span>
                    <br />
                    <span style={{ fontSize: "20px" }}>
                      Grand Total: <b>₹1,000</b>
                    </span>
                    <br />
                    <button
                      style={{ marginTop: "50px", float: "right" }}
                      onClick={() => setShow(2)}
                      className="btn btn-success"
                    >
                      PROCEED
                    </button>
                  
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="accordion-item m-2">
        <h2
            style={{
              backgroundColor: "#566573",
              color: "white",
              fontWeight: "700",
            }}
            className="accordion-header "
            id="headingOne"
          >
            <div className="row align-items-center">
              <div className="col">
                <span
                  style={{
                    backgroundColor: "#566573",
                    color: "white",
                    fontWeight: "700",
                  }}
                  className="accordion-b"
                >
                  {show == 2 && (
                    <i
                      style={{
                        fontSize: "35px",
                        color: "white",
                        margin: "5px",
                      }}
                      className="bi bi-2-square-fill"
                    ></i>
                  )}
                  {show !== 2 && (
                    <i
                      style={{
                        fontSize: "35px",
                        color: "white",
                        margin: "5px",
                      }}
                      // className="bi bi-check-circle"
                      className="bi bi-2-square-fill"
                    ></i>
                  )}
                  LEARNER DETAILS
                </span>
              </div>
              {show !== 2 && (
                <div className="col-auto border-0 margin-0">
                  <button onClick={() => setShow(2)} className="btn btn-light m-2">
                    CHANGE
                  </button>
                </div>
              )}
            </div>
          </h2>
          <div
            id="collapseTwo"
            className={`accordion-collapse collapse ${show === 2 ? "show" : ""}`}
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
            <div className="">
              <form onSubmit={handleSubmit} method="POST">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input  type="text" className="form-control m-1" name="name" value={values.name} onChange={handleChange} placeholder="Name"/>
                     {errors.name && <p style={{color:'red',fontSize:'13px'}}>{errors.name}</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="email" className="form-control m-1" name="email" value={values.email} onChange={handleChange} placeholder="Email"/>
                      {errors.email && <p style={{color:'red',fontSize:'13px'}}>{errors.email}</p>}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group"> 
                      <input type="text" className="form-control m-1" name="mobile_number" value={values.mobile_number} onChange={handleChange} placeholder="Mobile No."/>
                      {errors.mobile_number && <p style={{color:'red',fontSize:'13px'}}>{errors.mobile_number}</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="text" className="form-control m-1" name="college_name" value={values.college_name} onChange={handleChange} placeholder="College Name"/>
                      {errors.college_name && <p style={{color:'red',fontSize:'13px'}}>{errors.college_name}</p>}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="text" className="form-control m-1" name="university_name" value={values.university_name} onChange={handleChange} placeholder="University Name"/>
                      {errors.university_name && <p style={{color:'red',fontSize:'13px'}}>{errors.university_name}</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="text" className="form-control m-1" name="city"  value={values.city}  placeholder="City Name" onChange={handleChange}/>
                      {errors.city && <p style={{color:'red',fontSize:'13px'}}>{errors.city}</p>}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea type="text" className="form-control m-1"  name="about_wagons" value={values.about_wagons} placeholder="How did you know about the wagons courses ?" onChange={handleChange}></textarea>
                  {errors.about_wagons && <p style={{color:'red',fontSize:'13px'}}>{errors.about_wagons}</p>} 
                </div>

                {/* <button type="submit" className={`btn btn-success ${submit === true ? "" : "disabled"} m-2`}>PROCEED</button> */}
                <button type="submit" className={`btn btn-success  m-2`}>PROCEED</button>
               
              </form>
              {/* <button  onClick={() => {handlePayment(); setShow(3)}} type="submit" className="btn btn-success m-2">PROCEED</button> */}
            </div>

           </div>
          
           </div>
        </div>
        {/* <div className="accordion-item m-2">
        <h2
            style={{
              backgroundColor: "#848da0",
              color: "white",
              fontWeight: "700",
            }}
            className="accordion-header "
            id="headingOne"
          >
            <div className="row align-items-center">
              <div className="col">
                <span
                  style={{
                    backgroundColor: "#848da0",
                    color: "white",
                    fontWeight: "700",
                  }}
                  className="accordion-button"
                >
                  {show == 3 && (
                    <i
                      style={{
                        fontSize: "35px",
                        color: "white",
                        margin: "5px",
                      }}
                      className="bi bi-3-square-fill"
                    ></i>
                  )}
                  {show !== 3 && (
                    <i
                      style={{
                        fontSize: "35px",
                        color: "#4BFF79",
                        margin: "5px",
                      }}
                      className="bi bi-check-circle"
                    ></i>
                  )}
                  SECURE PAYMENT
                </span>
              </div>
              {show !== 3 && (
                <div className="col-auto border-0 margin-0">
                  <button onClick={() => setShow(3)} className="btn btn-light m-2">
                    CHANGE
                  </button>
                </div>
              )}
            </div>
          </h2>
          <div
            id="collapseThree"
            className={`accordion-collapse collapse ${show === 3 ? "show" : ""}`}
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
             
            </div>
          </div>
        </div> */}
      </div>
    }
      {success &&
       <Success/>
      }
      
    </div>
  );
};

export default Home;

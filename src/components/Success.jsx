import React from 'react';


const Success = () => {
  return (
    <div>
      <div className="card">
      <div style={{borderRadius:'200px', height:'200px', width:'200px', background: '#EAFEDE', margin:'0 auto'}}>
          <i className="checkmark">✓</i>
        </div>
          <h1>Thank You!</h1> 
          <p className='p-success'>Registration completed successfully.<br/> we'll be in touch shortly!</p>
      </div>
    </div>
  )
}

export default Success;
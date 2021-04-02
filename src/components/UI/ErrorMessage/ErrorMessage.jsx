import React from "react";



export const ErrorMessage = ({error}) => {
    if (error) {
        return null;
    }

    return (
      <div style={{ color: 'orange', textAlign: 'center'}}>
          Something is wrong, please try later!
      </div>
    )
}

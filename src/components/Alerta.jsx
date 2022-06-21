import React from 'react'

const Alerta = ({children}) => {
  return (
    <div className="text-center my-4 p-3 font-bold text-white uppercase bg-red-600">
        {children}
    </div>
  )
}

export default Alerta
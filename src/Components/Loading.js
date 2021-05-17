import React, { useEffect } from 'react'

const Loading = ({ iteration }) => {

  useEffect(() => {
    
  }, [iteration])


  return (
    <div>
      <h1>{iteration}</h1>
    </div>

  )
}


export default Loading;
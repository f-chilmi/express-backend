module.exports = {
  response : ({response, message, additionalData, status, success=true)=>{
    return response.send({
      success,
      message: message || 'Success',
      ...additionalData,
      status
    })
  }
}
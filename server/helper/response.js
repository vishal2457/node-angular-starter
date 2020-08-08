const { encryptData } = require("../helper/common-helper")
//200 OK 
const successResponse = async (res, data, msg) => {
    res.status(200).send({ success: 1, data, msg });
  };  

  const sendEncryptedResponse = async(res, data, msg) => {
    let encryptedData = await encryptData(data)
    res.status(200).send({success: 1, data, msg});
  }

  //500 SERVER ERROR
  const serverError = (res, msg) => {
    res.status(500).send({ success: 0, msg });
  };
  
  //404 Not Found
  const notFound = (res, msg) => {
    res.status(404).send({ success: 0, msg });
  };
  
  //401 Unauthorized
    const unauthorized = (res, msg) => {
    res.status(401).send({ success: 0, msg });
  };
  
  //400 Bad Request
  const other = (res, msg) => {
    res.status(400).send({ success: 0, msg });
  };

  //409 conflict (Used for duplicate values mainly)
  const alreadyExist = (res, msg) => {
    res.status(409).send({ success: 0, msg });
  };

  //custom response
  const custom = async (res, statusCode, success, data, msg) => {
    data = data || null;
    if(data) data = await encryptData(data);
    res.status(statusCode).send({success, data, msg})
  };
  
  module.exports = {
    successResponse,
    serverError,
    notFound,
    unauthorized,
    other,
    alreadyExist,
    custom
  };
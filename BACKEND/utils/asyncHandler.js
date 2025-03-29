const asyncHandler = (requestHandler) =>{
    return (req , res , next) => { // to handle the async function using try catch block
        Promise.resolve(requestHandler(req , res , next)).catch((err) => next(err)) // to handle the error
    }
}

export default asyncHandler; 


// const asyncHandler = (fn) => async (req, res, next) => { // to handle the async function using try catch block
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//         res.status(error.code||500).json({
//             sucess:false,
//             message : error.message
//         })
//     }
// }
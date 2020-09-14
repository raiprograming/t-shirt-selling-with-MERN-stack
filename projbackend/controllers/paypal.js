var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "2xb4y6krmhx3nfsp",
  publicKey: "4ydncq8xx3hxr5g2",
  privateKey: "7e7ef99c94cf67b907907c72db72fb8e",
});


exports.getToken=(req,res)=>{
    gateway.clientToken.generate(
      {
    
      },
      function (err, response) {
        if(err){
            res.status(500).send(err);
        }else{
            res.send(response);
        }
      }
    );

};

exports.processPayment=(req,res)=>{
    let nonceFromTheClient=req.body.paymentMethodNonce;
    let amountFromTheClient=req.body.amount;
    gateway.transaction.sale(
      {
        amount: "10.00",
        paymentMethodNonce: nonceFromTheClient,
        //deviceData: deviceDataFromTheClient,
        options: {
          submitForSettlement: true,
        },
      },
      function (err, result) {
          if(err){
              res.status(500).json(err)
          }else{
              res.json(result)
          }
      }
    );

};
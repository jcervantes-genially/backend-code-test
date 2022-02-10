import { Response, Request } from "express";


let info: String

function checkTitle (title:String){
  if (title===undefined || title.length===0 || title.length<3 || title.length>20){
    info="Title must be higher than 3 and minor than 20";
    return 0;
  }else{
    return 1;
  }
}

function checkDescription(description: String){
  info="description must be minor than 125";
  if (description.length>125){
    return 0;
  }else{
    return 1;
  }
}

function createP (req: Request, res: Response) {
  const Presentation = require('../models/presentation');
  const Analytics = require("./analytics");
  if ((checkTitle(req.body.title)===1)){
    if (checkDescription(req.body.description) ===1){
      Presentation.create({
        title:req.body.title,
        description:req.body.description,
        deleted:false,
        createdAt:new Date()
      }).then((doc: any)=>{
        Analytics.updateAnalytics("presentation")
        res.json(doc)
      }).catch((err: any)=>{
        console.log(err);
        res.json(err);
      });
    }else{
      res.status(400).send({ message: info })
    }
  }else{
    res.status(400).send({ message: info })
  }
};

function updateP (req: Request, res: Response) {
  const Presentation = require('../models/presentation');
  
  let idCheck = req.body.id
  let description = checkDescription(req.body.description)
  let title = checkTitle(req.body.title)

  Presentation.findByIdAndUpdate(idCheck,{title:title,description:description,modifiedAt:new Date()})
    .catch((err: any) => {res.json(err);}
    );
  Presentation.findById(idCheck)
    .then((doc : any)=>res.json(doc))
    .catch((err: any) => {res.json(err);}
  );
};

function deleteP (req: Request, res: Response) {
  const Presentation = require('../models/presentation');
  let idCheck = req.body.id

  Presentation.findByIdAndUpdate(idCheck,{deleted:true,deletedAt:new Date()})
    .catch((err: any) => {res.json(err);}
  );
  Presentation.findById(idCheck)
    .then((doc : any)=>res.json(doc))
    .catch((err: any) => {res.json(err);}
  );
};

module.exports = {createP,updateP,deleteP}
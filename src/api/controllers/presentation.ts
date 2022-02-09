import { Response, Request } from "express";

function checkTitle (title:String){
  if (title===undefined || title.length===0){
    title="Untitle document";
  }else{
    title=title.substring(0,20);
  }
  if (title.length<3 && title.length>0){title='title: '+title}
  return title;
}

function checkDescription(description: String){
  if (description.length>125){
    description = description.substring(0,125);
  }
  return description
}

function createP (req: Request, res: Response) {
  const Presentation = require('../models/presentation');
  const Analytics = require("./analytics");

  let description = checkDescription(req.body.description)
  let title = checkTitle(req.body.title)

  
  Presentation.create({
    title:title,
    description:description,
    deleted:false,
    createdAt:new Date()
  }).then((doc: any)=>{
    Analytics.updateAnalytics("presentation")
    res.json(doc)
  }).catch((err: any)=>{
    console.log(err);
    res.json(err);
  });
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
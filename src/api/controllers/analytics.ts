import { typeParameterInstantiation } from "@babel/types";
import { Int32 } from "bson";
import { Response, Request } from "express";


function updateAnalytics (typeIn: String) {
  const Analytics = require('../models/analytics');
  const Presentation = require('../models/presentation');

    if( typeIn==="presentation"){
        Presentation.count().then((result: any)=>{
            if (result===0){
                Analytics.create({
                    type:typeIn,
                    number:1,
                    createdAt: new Date(),
                    deleted: false
                })
            }
            let total=result+1;
            Analytics.findOne({type:typeIn})
            .then((resultAnalytic: any)=>{
                let idAnalytic=resultAnalytic._id;
                Analytics.findByIdAndUpdate(
                    idAnalytic,
                    {number:total,modifiedAt:new Date()}
                )
                .catch(
                    (err: any) => {console.log(err);}
                );
            })
        }
        );
    }

  
  
};


module.exports = {updateAnalytics}
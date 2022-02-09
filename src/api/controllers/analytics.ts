import { typeParameterInstantiation } from "@babel/types";
import { Int32 } from "bson";
import { Response, Request } from "express";


    function updateAnalytics (typeIn: String) {
        if( typeIn==="presentation"){
            const Presentation = require('../models/presentation');
            Presentation.count()
            .then((result: any)=>{
                if (result===0){
                    createAnalytic(typeIn)
                }
                let total=result+1;
                increaseAnalytic(typeIn,total);
            });
        }  
    };

    function createAnalytic(typeIn: String){
        const Analytics = require('../models/analytics');
        Analytics.create({
            type:typeIn,
            number:1,
            createdAt: new Date(),
            deleted: false
        });
    }

    function increaseAnalytic(typeIn:String,total:Number){
        const Analytics = require('../models/analytics');
        Analytics.findOne({type:typeIn})
        .then((result: any)=>{
            let idAnalytic=result._id;
            Analytics.findByIdAndUpdate(
                idAnalytic,
                {number:total,modifiedAt:new Date()}
            )
            .catch(
                (err: any) => {console.log(err);}
            );
            Analytics.findById(idAnalytic)
            .then((resultAnalytic:any)=>{
                console.log("número de presentaciones en la bbdd")
                console.log(resultAnalytic.number)
            })
        });
    }


module.exports = {updateAnalytics}
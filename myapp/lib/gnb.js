var db = require('../lib/db');
var template = require('../lib/template.js');

module.exports={
    menuList:function(userId){
        var gnb='';
        db.query(`select count(*) as count from country`,function(err,result){
            console.log("result[0].count: ",result[0].count);
            for(var i=0; i<result[0].count;i++){
              gnb = gnb+`<li><a href="/contents/show/${result[0].country_name}">${result[0].country_name}</a><ul class="sublist">`;
              db.query(`select nation_name from posting where country_id=? and userId=?`,[i,userId],function(err2,result2){
                for(var k=0; k<result2.length;k++){
                    gnb= gnb+`<li><a href="#">${result2[k].nation_name}</a></li>`;
                    console.log("result2: ",result2[k].nation_name);
                }
                gnb = gnb+`</ul></li>`;
              }) 
            }
        });
        return gnb;
    }

    }
}
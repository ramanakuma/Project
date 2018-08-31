var crypto = require('crypto');
var hart= require('../hart');
var sqlcon = hart.sql;
// var utlity = require('./utlity');
// var session = require('express-session');

module.exports = function(app){


  app.post('/addrowform',function(req,res){
    var name = req.body.new_name;
    var rname = req.body.new_rname;
    var feedback = req.body.new_feedback;
    var q= "insert into feedback_tbl(name,ReviewdName,FeedBack)values('"+name+"','"+rname+"','"+feedback+"')";
    sqlcon.query(q,function(err,re){
      if(!err){
        res.json(1);
      }
      else{
          res.json(2);
      }
    })
  })

  app.post('/editfeedbackform',function(req,res){
    var name = req.body.name_data;
    var reviewd= req.body.rname_data;
    var feedback = req.body.feedback_data;
    var id = req.body.rno;
    var q= "update feedback_tbl set name='"+name+"',ReviewdName='"+reviewd+"',FeedBack='"+feedback+"' where id='"+id+"'";
    sqlcon.query(q,function(err,re){
      if(!err){
        res.json(1);
      }
      else{
          res.json(0);
      }
    })
  })

  app.post('/deletefeedbackform',function(req,res){
    var id = req.body.rno;

    var q= "delete from feedback_tbl where id='"+id+"'";
    sqlcon.query(q,function(err,re){
      if(!err){
        res.json(1);
      }
      else{
          res.json(0);
      }
    })
  })




app.post('/addrowform',function(req,res){
  var name = req.body.new_name;
  var country = req.body.new_country;
  var age = req.body.new_age;
  var q= "insert into employee_tbl(name,country,age)values('"+name+"','"+country+"','"+age+"')";
  sqlcon.query(q,function(err,re){
    if(!err){
      res.json(1);
    }
    else{
        res.json(2);
    }
  })
})

app.post('/editrowform',function(req,res){
  var name = req.body.name_data;
  var country = req.body.country_data;
  var age = req.body.age_data;
  var id = req.body.rno;
  var q= "update employee_tbl set name='"+name+"',country='"+country+"',age='"+age+"' where id='"+id+"'";
  sqlcon.query(q,function(err,re){
    if(!err){
      res.json(1);
    }
    else{
        res.json(0);
    }
  })
})

app.post('/deleterowform',function(req,res){
  var id = req.body.rno;

  var q= "delete from employee_tbl where id='"+id+"'";
  sqlcon.query(q,function(err,re){
    if(!err){
      res.json(1);
    }
    else{
        res.json(0);
    }
  })
})

app.post('/feedbackform',function(req,res){
  var q= "insert into feedback_tbl(name,email,message)values('"+req.body.user_name+"','"+req.body.user_email+"','"+req.body.user_message+"')";
  sqlcon.query(q,function(err,re){
    if(!err){
      res.json(1);
    }
    else{
        res.json(2);
    }
  })
})
app.post('/loginform',function(req,res){

    var login = "select agentId,companyId,email,password,Roles1 from admin_agent_profile where RestrictedUser!='on' and status=1 and email = '"+req.body.userid+"'";
    var cnt="select count(1) as c from admin_agent_profile where RestrictedUser!='on' and status=1 and email = '"+req.body.userid+"'";
    sqlcon.query(cnt,function(err,re){
      if(re[0].c>1){
        var comp="select ap.companyId,cr.companyName from admin_agent_profile as ap ,admin_company_registration as cr where ap.companyId=cr.companyId and ap.RestrictedUser!='on' and ap.status=1 and ap.email = '"+req.body.userid+"'";
        sqlcon.query(comp,function(error,results){
          res.json(results);
        });

      } else {
        sqlcon.query(login,function(error,results){
            if(results && results.length>0){
                if(crypto.createHash('md5').update(req.body.password).digest("hex") == results[0].password){
                    var q = "insert into admin_agent_login_history(companyId,agentId,loginTime)values("+results[0].companyId+","+results[0].agentId+",now())";
                    sqlcon.query(q,function(err,row){
                        req.session.admin_agentId=results[0].agentId;
                        req.session.admin_email=results[0].email;
                        req.session.admin_agent_role=results[0].Roles1;
                        req.session.admin_companyId=results[0].companyId;
                        req.session.i9Adminflag=7;
                        res.json(3);
                    })

                } else {
                    res.json(2);
                }
            } else {
                res.json(0);
            }

        });
      }

  });
});


    function randomPassword(length) {
        var chars = "abcdefghijklmnopqrstuvwxyz!@#$ABCDEFGHIJKLMNOP1234567890";
        var pass = "";
        for (var x = 0; x < length; x++) {
            var i = Math.floor(Math.random() * chars.length);
            pass += chars.charAt(i);
        }
        return pass;
    }


}

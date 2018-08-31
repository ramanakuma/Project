       // get searches history
                    var sorting=1,sortType=true,sortingtwo=1,sortTypetwo=true,SearchType="";
                    function searchbox(x){
                      var leadid = $("#search_leaddiv").val();
                      //SearchType = $("#srch_searchquery").val();
                      SearchType = x;
                      getSearches(leadid);
                    }
                    function setSort(id,leadid){
                        if(sorting != id){
                            sortType = true;
                        } else {
                            sortType = !sortType;
                        }
                        if(sortType){
                            $('#ANsort').removeClass('sortdesc').addClass('sortasc');
                        } else {
                            $('#ANsort').removeClass('sortasc').addClass('sortdesc');
                        }
                        sorting = parseInt(id);
                        getSearches(leadid);
                    }
                    function setSorttwo(id,leadid){
                        if(sortingtwo != id){
                            sortTypetwo = true;
                        } else {
                            sortTypetwo = !sortTypetwo;
                        }
                        if(sortTypetwo){
                            $('#visitorsort').removeClass('sortdesc').addClass('sortasc');
                        } else {
                            $('#visitorsort').removeClass('sortasc').addClass('sortdesc');
                        }
                        sortingtwo = parseInt(id);
                        getSearches(leadid);
                    }
                    function getSearches(id){
                        var start1 = ($('#pagination_val1').val()-1)*20;
                        var start = ($('#pagination_val').val()-1)*20;

                        var data={};
                        if(start<0){data.start = 0;} else {data.start = start;}
                        if(start1<0){data.start1 = 0;} else {data.start1 = start1;}
                        data.id = id;data.srtid = sorting;data.sortType = sortType;data.sortTypetwo = sortTypetwo;data.sortingtwo = sortingtwo;data.SearchType = SearchType;
                        $.ajax({
                            type    : "POST",
                            url     : "/getSrchTabData",
                            data    : data,
                            dataType: "json",
                            success : function (res) {
                            var mes='';var msg='';
                          if(res.getTotalsaveserch[0].countss > 0){
                          $('#total_pages1').html(Math.ceil(parseInt(res.getTotalsaveserch[0].countss)/20));
                          $.each(res.getsavesearch,function(i,d){
                             mes += '<div class="rh first_td">';
                             mes += '<span>';
                             mes += '<div class="pr"><p>'+d.location+'</p><span class="pull-right view">View</span></div>';
                             mes += '</span>';
                             mes += '</div>';
                             mes += '<div class="tr">';
                             mes += '<div class="td first_td type_td " data-header="Type :">';
                             mes += '<p>'+d.serachType+'/'+d.searchType+'</p>';
                             mes += '<p class="qu_mob">'+d.serachType+'</p>';
                             mes += '</div>';
                             mes += '<div class="td text-center location_td" data-header="Location:">';
                             mes += '<p>'+d.location+'</p>';
                             mes += '</div>';
                             mes += '<div class="td text-center Pricing_td" data-header="Price:">';
                             mes += '<p><span>'+d.price+'</span></p>';
                             mes += '</div>';
                             mes += '<div class="td text-center ftr_td" data-header="Features:">';
                             var feature = getfeature(d.features);
                             var features1 = feature.slice(0, -1);
                             mes += '<p><button class="btn btn-icon" type="button" data-toggle="tooltip" title="'+features1+'" data-placement="top"><span class="fa fa-eye icon"></span><br/></button></p>';
                             mes += '</div>';
                            //  mes += '<div class="td text-center mob_src_td" data-header="search:">';
                            //  mes += '<p>'+d.features+'</p>';
                            //  mes += '</div>';
                             mes += '<div class="td text-center detail_td" data-header="Beds & Baths:">';
                             mes += '<p>'+d.Beds+' & '+d.Baths+'</p>';
                             mes += '</div>';
                             mes += '<div class="td text-center date_td" data-header="Date:">';
                             mes += '<p><span>'+moment(d.date).format('LLL')+'<span>&nbsp;<span></span></p>';
                             mes += '</div>';
                             mes += '<div class="td text-center view_td">';
                             mes += '<p><a href="'+d.url+'"  target="'+d.url+'"><span class="fa fa-search icon"></a></p>';
                             mes += '</div>';
                             mes += '<div class="td text-center ealert_td">';
                             mes += '<p class="newalert" id="'+d.histId+'_save"><a><span class="fa fa-envelope-o icon"></span></a></p>';
                             mes += '</div>';
                            mes += '</div>';
                          });
                        }
                        else {
                            if($('#pagination_val1').val()>1){
                                $('#pagination_val1').val($('#pagination_val1').val()-1);
                                getSearches();
                            } else {
                                $('#total_pages1').html(0);
                                mes += '<div class="nodt">No Search History...</div>';
                            }
                        }
                          if(res.getTotalVis[0].countss > 0){
                          $('#total_pages').html(Math.ceil(parseInt(res.getTotalVis[0].countss)/20));
                          $.each(res.getvisitsearch,function(i,d){

                            msg += '<div class="rh  first_td">';
                            msg += '<span>';
                            msg += '<div class="pr"><p>'+d.location+'</p><span class="pull-right view">View</span></div>';
                            msg += '</span>';
                            msg += '</div>';
                            msg += '<div class="tr">';
                            msg += '<div class="td first_td type_td " data-header="Type :">';
                            msg += '<p>'+d.serachType+'/'+d.searchType+'</p>';
                            msg += '<p class="qu_mob">'+d.serachType+'</p>';
                            msg += '</div>';
                            msg += '<div class="td text-center location_td" data-header="Location:">';
                            msg += '<p>'+d.location+'</p>';
                            msg += '</div>';
                            msg += '<div class="td text-center Pricing_td" data-header="Price:">';
                            msg += '<p><span>'+d.price+'</span></p>';
                            msg += '</div>';
                            msg += '<div class="td text-center ftr_td" data-header="Features:">';
                            var feature = getfeature(d.features);
                            var features1 = feature.slice(0, -1);
                            msg += '<p><button class="btn btn-icon" type="button" data-toggle="tooltip" title="'+features1+'" data-placement="top"><span class="fa fa-eye icon"></span><br/></button></p>';
                            msg += '</div>';
                            msg += '<div class="td text-center detail_td" data-header="Beds & Baths:">';
                            var bds = getbedsbths(d.Details);
                            msg += '<p>'+bds+' </p>';
                            msg += '</div>';
                            msg += '<div class="td text-center date_td" data-header="Date:">';
                            msg += '<p><span>'+moment(d.date).format('LLL')+'<span>&nbsp;<span></span></p>';
                            msg += '</div>';
                            msg += '<div class="td text-center view_td">';
                            msg += '<p><a href="'+d.url+'"  target="'+d.url+'"><span class="fa fa-search icon"></a></p>';
                            msg += '</div>';
                            msg += '<div class="td text-center ealert_td">';
                            msg += '<p  class="newalert" id="'+d.histId+'_visit"><a class="show_ealert" id="'+d.histId+'_save"><span class="fa fa-envelope-o icon"></span></a></p>';
                            msg += '</div>';
                            msg += '</div>';
                          });
                        }else {
                            if($('#pagination_val').val()>1){
                                $('#pagination_val').val($('#pagination_val').val()-1);
                                getSearches();
                            } else {
                                $('#total_pages').html(0);
                                msg += '<div class="nodt">No Search History...</div>';
                            }
                        }
                                $('#save_search_hist').html(mes+'</tbody></table>');
                                $('#visit_search_hist').html(msg+'</tbody></table>');
                                $('[data-toggle="tooltip"]').tooltip();
                                $('.newalert').click(function() {
                                  $(".content-body").hide();
                                  $(".createalert").show();
                                  $("#backbtn").show();
                                    var temp = $(this).attr('id').split('_');
                                    //$('#create_ealert')[0].reset();
                                    $.ajax({
                                        url : "/getSingleSearch",
                                        type: "POST",
                                        data: {id:temp[0],type:temp[1]},
                                        dataType:"json",
                                        success:function(res){
                                          $("#e_save").removeAttr("disabled");
                                            $('#histId').val(res.historyId);
                                            $('#alert_leadId').val(res.leadId);
                                            $('#home_search').val(res.location);
                                            $('#alert_key').val(temp[1]);
                                           //clear before values
                                            var a = new Array();
                                            a[0]=0;a[1]=0;
                                           // $('.span2').slider('setValue',a);
                                            $('.disClass').prop('checked',false);
                                            $('input[name="feature"]').prop('checked',false);
                                            $('#maxdayslisted').val("");
                                            //$('#pricereduced').val("");
                                            $('#frequency').val("");
                                            $("input[name='uid']").prop('checked',true);
                                            $("input[id='Photo']").prop('checked',true);
                                            $('#search_prop_type').val(res.searchType);
                                            if(res.listingEAlert){
                                                $('#frequency').val(res.listingEAlert);
                                            }
                                            var mystr = res.url.split("/");
                                            var u = parseQuery(mystr[8]);
                                            $('#home_search').val(mystr[5]);
                                            $('#url').val(mystr[0]+'//'+mystr[2]);
                                            $('#data_type').val(mystr[4]);
                                            if(u.Status)
                                              $("input[name='Status'][value="+u.Status+"]").prop('checked',true);
                                            if(u.Beds)
                                              $("input[name='Bed'][value="+u.Beds+"]").prop('checked',true);
                                             if(u.Baths)
                                              $("input[name='Bath'][value="+u.Baths+"]").prop('checked',true);
                                             if(u.PriceReduce)
                                              $("input[name='PriRed'][value="+u.PriceReduce+"]").prop('checked',true);
                                            $('#s').val(mystr[6]);
                                            $('#maxdayslisted').val(u.MaxDays);

                                            $("#viewport").val(u.ViewPort);
                                            if(u.PropType)
                                            {
                                               var features=u.PropType.split(",");
                                                $.each(features,function(i,k){
                                                    $("input[name='PropertyType'][value="+k+"]").prop('checked',true);
                                                });
                                            }
                                            var features=u.Features.split(",");
                                            $.each(features,function(i,k){
                                                $("input[name='feature'][value="+k+"]").prop('checked',true);
                                            });
                                            if(u.Price)
                                            setSlidersDynamic('price',u.Price);
                                            else
                                            setSlidersDynamic('price','0,0');
                                            if(u.Sqft)
                                            setSlidersDynamic('sqfeet',u.Sqft);
                                            else
                                            setSlidersDynamic('sqfeet','0,0');
                                            if(u.Acre)
                                            setSlidersDynamic('acres',u.Acre);
                                            else
                                            setSlidersDynamic('acres','0,0');
                                            if(u.Garage)
                                            setSlidersDynamic('gspace',u.Garage);
                                            else
                                            setSlidersDynamic('gspace','0,0');
                                            if(u.Story)
                                            setSlidersDynamic('stories',u.Story);
                                            else
                                            setSlidersDynamic('stories','0,0');
                                            if(u.Year)
                                            setSlidersDynamic('years',u.Year);
                                            else
                                            setSlidersDynamic('years','0,0');

                                            function parseQuery(qstr){
                                                var query = {};
                                                var a = qstr.split('+');
                                                for (var i = 0; i < a.length; i++) {
                                                    var b = a[i].split('=');
                                                    query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
                                                }
                                                return query;
                                            }
                                            function setSlidersDynamic(id,data){
                                              var a = new Array();
                                              var split = data.split(',');
                                              a[0]=parseInt(split[0]);a[1]=parseInt(split[1]);
                                                $('#'+id).slider('setValue',a);

                                                /*if($.trim(min)=='') min = 0;
                                                if($.trim(max)=='') max = 0;
                                                document.getElementById(id).noUiSlider.set([min,max]);
                                                $('#min_'+id).html(min);
                                                $('#max_'+id).html(max);*/
                                            }
                                        }
                                    });

                                });

                            }
                        })
                    }


                    // get properties tab data favs,reqs
              function getPropData(type,id,date){
                        $(".visitcss").css({"color": "#2791D3"});
                        if(date == 0){
                            $('#'+type).css('color','red');
                        } else {
                            $('#'+date).css('color','red');
                        }
                        $.ajax({
                            type    : "POST",
                            url     : "/getPropTabData",
                            data    : {type:type,id:id,date:date},
                            dataType: "json",
                            success : function (res) {
                                $('#prop_history').modal('hide');
                                var mes = '';
                                if(res.length > 0){
                                $.each(res,function(i,d){
                                  if(d.LivingArea == '0'){
                                    d.LivingArea = d.TaxTotalLivingArea;
                                  }
                                     mes+='<div class="col-xs-12 col-sm-4 col-md-3 padding2 property">';
                                      mes+='<div class="property-box">';
                                         mes+='<div class="propertyDiv">';
                                             mes+='<div class="property-box-image">';
                                                 mes+='<a class="property-box-image-inner">';
                                                 mes+='<img alt="listimage" src="http://dfkq3ilvl8x2s.cloudfront.net/'+d.State+'/photos/'+d.ListingKey+'-1.jpg" alt="" onerror="this.onerror=null;this.src=\'Public/images/no_preview.png\';">';
                                                 mes+='</a>';
                                                 mes+='<div class="property-box-meta">';
                                                     mes+='<div class="field-item"><i class="i9-icon-14"></i>'+d.LivingArea+'&nbsp;Sq.Ft</div>';
                                                     mes+='<div class="field-item field-item-bath"><i class="i9-icon-15"></i>'+d.Baths+'</div>';
                                                     mes+='<div class="field-item field-item-bed"><i class="i9-icon-16"></i>'+d.Beds+'</div></div></div>';
                                                     mes+='<div class="property-box-content">';
                                                         mes+='<div class="property-box-top">';
                                                             mes+='<div class="property-box-title-wrap">';
                                                                 mes+='<div class="property-box-title">';
                                                                     mes+='<h3 class="entry-title"><span>'+d.CityName+'</span></h3>';
                                                                 mes+='<div class="property-row-location"><p><span class="doorno">'+d.FullStreetAddress+'</span></p><p><span>'+d.CityName+'</span>,<span class="cityname">'+d.State+'&nbsp; '+d.PostalCode+'</span></p></div></div>';
                                                                 mes+='<div class="property-box-price"><span>$&nbsp;'+d.ListPrice+'</span></div></div></div>';
                                                             mes+='</div>';
                                                         mes+='</div>';
                                                     mes+='</div>';
                                     mes+='</div>';
                                })
                              }else{
                                mes+='<div>No Properties found</div>'
                              }
                                $('#prop_img_div').html(mes);
                            }
                        });
                    }

                    //get recent visits
                    function getRecentvisit(id){
                        $.ajax({
                            type    : "POST",
                            url     : "/getrecentVisits",
                            data    : {id:id},
                            dataType: "json",
                            success : function (res) {

                                var msg = '';var mes1='';
                                var mes = '',year='',month='';


                                msg='<table><tbody>';
                                var c=0;
                                var count=0;
                                $.each(res,function(i,d){
                                    var date = new Date(d.date);
                                    var dt = date.toLocaleString('en-US',{ weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
                                    msg += '<tr><td><span>'+dt+'</span>&nbsp;&nbsp;<span>('+d.count+' Properties )</span></td></tr>';
                                    //properties data
                                    if(year != d.year){if(c!=0){mes+='</div></div>';}c=c+1;
                                        year = d.year;
                                        mes += '<p class="headding">VISITS IN <span>'+d.year+'</span></p><div class="calenders testz" id="y'+d.year+'"><div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
                                    }
                                    if(year == d.year && month != d.month ){var sub='';
                                        month = d.month;
                                        if(d.month == 1){
                                            mes1 = 'Jan, '+d.year+'';
                                        } else if(d.month == 2){
                                            mes1 = 'Feb, '+d.year+'';
                                        } else if(d.month == 3){
                                            mes1 = 'Mar, '+d.year+'';
                                        } else if(d.month == 4){
                                            mes1 = 'Apr, '+d.year+'';
                                        } else if(d.month == 5){
                                            mes1 = 'May, '+d.year+'';
                                        } else if(d.month == 6){
                                            mes1 = 'Jun, '+d.year+'';
                                        } else if(d.month == 7){
                                            mes1 = 'Jul, '+d.year+'';
                                        } else if(d.month == 8){
                                            mes1 = 'Aug, '+d.year+'';
                                        } else if(d.month == 9){
                                            mes1 = 'Sep, '+d.year+'';
                                        } else if(d.month == 10){
                                            mes1 = 'Oct, '+d.year+'';
                                        } else if(d.month == 11){
                                            mes1 = 'Nov, '+d.year+'';
                                        } else {
                                            mes1 = 'Dec, '+d.year+'';
                                        }
                                        sub+='<div class="panel panel-default">'
                                          sub+='<div class="panel-heading" role="tab" id="headingOne">'
                                              sub+='<h4 class="panel-title">'
                                                  sub+='<a role="button" data-toggle="collapse" data-parent="#accordion1" href="#calendar1'+i+'" aria-expanded="true" aria-controls="collapseOne">'
                                                  sub+='<i class="more-less glyphicon glyphicon-plus pull-right"></i>'
                                                  sub+='<span class="count pull-right label" id="'+d.month+'_'+d.year+'" >'+getCount(id,d.month,d.year)+'</span>'
                                                  sub+=mes1

                                                  sub+='</a>'
                                              sub+='</h4>'
                                          sub+='</div>'
                                          sub+='<div id="calendar1'+i+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">'
                                              sub+='<div class="panel-body">'
                                               sub+='<div id="datetimepicker'+d.month+'-'+d.year+'" class="datetimepickerz1"></div>'
                                              sub+='</div>'
                                          sub+='</div>'
                                      sub+='</div>'
                                     mes+=sub;
                                     count=0;
                                    }
                                    count=count+d.count;
                                });
                                msg+='</tbody></table>';
                            //     $('#recent_visit_div').html(mes);

                                $('#recent_visit_div').html(msg);
                                if(res.length == 0){
                                $("#recent_visit_div").html("<p class='cnt'>There is no recent websites found</p>");
                                return false;
                                }
                                else{$('#visit_p').html(mes);}

                               test(id);
                            }
                        })
                    }
                    function getCount(id,month,year)
                    {
                      $.ajax({
                            type    : "POST",
                            url     : "/getrecentVisitsCount",
                            data    : {month:month,year:year,id:id},
                            dataType: "json",
                            success : function (res) {
                                 $("#"+month+'_'+year).html(res[0].count);
                            }
                          })
                    }
                    function test(id)
                    {
                        $.ajax({
                            type    : "POST",
                            url     : "/getrecentVisits",
                            data    : {id:id},
                            dataType: "json",
                            success : function (res) {
                                var msg = '';var mes1='';
                                var mes = '',year='',month='';
                                var c=0;
                                $.each(res,function(i,d){
                                    //summary data
                                    var date = new Date(d.date);
                                    var dt = date.toLocaleString('en-US',{ weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
                                    mes = '<p><a id="'+d.date+'" class="visitcss" onClick="getPropData(\'prop\','+id+',\''+d.date+'\')"><span>'+dt+'</span>&nbsp;&nbsp;<span>('+d.count+' Properties )</span></a></p>';
                                    $("#datetimepicker"+d.month+'-'+d.year).append(mes);
                                })
                            }
                        })

                    }
                    //get ealerts for tables
                    function getEalert(id){
                        $.ajax({
                            type    : "POST",
                            url     : "/getEalerts",
                            data    : {id:id},
                            dataType: "json",
                            success : function (res) {
                                var mes = '';
                                $.each(res,function(i,d){
                                    var date = new Date(d.searchDate);
                                    var dt = date.toLocaleString('en-US',{ weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
                                    mes+=' <table><tbody>';
                                    mes += '<tr><td>e-Alert :</td><td><a href="'+d.url+'" target="_blank">'+d.searchName+'</a></td></tr>';
                                    mes += '<tr><td>e-Alert Type :</td><td>'+d.searchType+'</td></tr>';
                                    mes += '<tr><td>Created on :</td><td>'+dt+'</td></tr>';
                                    if(d.location!=''){
                                        mes += '<tr><td>Location :</td><td>'+d.location+'</td></tr>';
                                    }
                                    if(d.priceMax>0 && d.priceMin>0){
                                        mes += '<tr><td>Price Range :</td><td>'+d.priceMin+'</span>&nbsp;to&nbsp;<span>'+d.priceMax+'</span></td></tr>';
                                    }
                                    var stat='No thanks, maybe later';
                                    if(d.listingEAlert==0){ stat = "No thanks, maybe later"; }
                                    if(d.listingEAlert==-1){ stat = "Instantly"; }
                                    if(d.listingEAlert==1){ stat = "Daily"; }
                                    if(d.listingEAlert==3){ stat = "Twice a week"; }
                                    if(d.listingEAlert==7){ stat = "Weekly"; }
                                    if(d.listingEAlert==14){ stat = "Twice a month"; }
                                    if(d.listingEAlert==30){ stat = "Monthly"; }
                                    mes += '<tr><td>E-alert Status :</td><td>'+stat+'</td></tr></tbody></table><hr/>';
                                })
                                if(mes=='')
                                    mes='<p class="cnt">There is no eAlert</p>';
                                $('#eAlert_div').html(mes);
                            }
                        })
                    }

                    // get history using filters
                    // get history using filters
                    function getHistory(filter,id){

                        $.ajax({
                            type    : "POST",
                            url     : "/fetchLeadHistory",
                            data    : "filters=" + filter +"&leadId=" + id ,
                            dataType: "json",
                            success : function (data) {
                                var hdata = '';
                                if(data.length > 0){
                                $.each(data,function(i,d){
                                    hdata += '<ul class="list">';
                                    if(d.type == 'calls'){
                                        hdata += '<li>';
                                         hdata += '<p>';
                                             hdata += '<span class="fa fa-phone icon"></span><span class="cnt">'+d.lead+'&nbsp;Call Status :- <font color="red">'+d.callStatus+'</font></span>';
                                             hdata += '<span class="task_cnt">&nbsp;Phone :- </span>&nbsp;<span >'+d.phone+'</span>&nbsp;<br/><span class="task_cnt ">Comments :- </span><span class="">'+d.comments+'</span>';
                                             hdata += '<br/><span class="task_cnt">Sent by :- </span><span class="cnt">'+d.agent+'</span>';
                                         hdata += '</p>';
                                         hdata += '<p class="u_sers"><span class=""><i class="fa fa-clock-o icon"></i>'+moment(d.createDate).format('LLL')+'</span></p>';
                                        hdata += '</li>';
                                    }
                                    if(d.type == 'textsms'){
                                         hdata += '<li>';
                                         hdata += '<p>';
                                             hdata += '<span class="fa fa-file-text icon"></span><span class="cnt">'+d.smsBody+'&nbsp;<br/>Lead :- <font color="red">'+d.lead+'</font>: <span class="aname_1">&nbsp;Phone</span>:<span class="aname_2">'+d.phone+'</span></span>';
                                             hdata += '<br/><span class="task_cnt" >Sent by :- </span><span class="cnt">'+d.agent+'</span></div>';
                                         hdata += '</p>';
                                         hdata += '<p class="u_sers"><span class=""><i class="fa fa-clock-o icon"></i>'+moment(d.createDate).format('LLL')+'</span></p>';
                                        hdata += '</li>';
                                    }
                                    if(d.type == 'general'){
                                         hdata += '<li>';
                                         hdata += '<p>';
                                             hdata += '<span class="fa fa-info-circle icon"></span><span class="cnt">'+d.comments+'&nbsp;Name :- <font color="red">'+d.fname+' '+d.lname+'</font></span>&nbsp; Contacted &nbsp;<br/>';
                                             hdata += '<span class="basic-info">Email :- </span><span class="font-weight-500">'+d.email+'</span>&nbsp;<br/>';
                                             hdata += '<span class="basic-info">&nbsp;Phone :- </span><span class="font-weight-500">'+d.phone+'</span>&nbsp;<br/>';
                                         hdata += '</p>';
                                         hdata += '<p class="u_sers"><span class=""><i class="fa fa-clock-o icon"></i>'+moment(d.createDate).format('LLL')+'</span></p>';
                                        hdata += '</li>';
                                    }
                                    if(d.type == 'reqShow'){
                                         hdata += '<li>';
                                         hdata += '<p>';
                                             hdata += '<span class="fa fa-envelope icon"></span><span class="cnt">Schedule Showing '+d.lead+'</span><br/>';
                                             hdata += '<div ><img src="http://dfkq3ilvl8x2s.cloudfront.net/photos/'+d.listingKey+'-1.jpg" width="100" height="65"></img></div>';
                                             hdata += '<span >Listing :- </span><span ><a href="#" target="_blank">'+d.FullStreetAddress+', '+d.City+','+d.State+'-'+d.PostalCode+'</a></span>&nbsp;<br/>';
                                             hdata += '<span >Showing Date :- </span><span >'+d.showingDate+'</span>&nbsp;<br/>';
                                             hdata += '<span >Showing Time :- </span><span >'+d.showingTime+'</span>&nbsp;<br/>';
                                             hdata += '<span >Email :- </span><span >'+d.emailId+'</span>&nbsp;<br/>';
                                             hdata += '<span >Phone :- </span><span >'+d.phoneNo+'</span>&nbsp;<br/>';
                                             hdata += '<span >Comments :- </span><span >'+d.comments+'</span>&nbsp;<br/>';
                                         hdata += '</p>';
                                         hdata += '<p class="u_sers"><span class=""><i class="fa fa-clock-o icon"></i>'+moment(d.createDate).format('LLL')+'</span></p>';
                                        hdata += '</li>';
                                    }
                                    if(d.type == 'buy'){
                                        hdata += '<li>';
                                         hdata += '<p>';
                                             hdata += '<span class="fa fa-envelope icon"></span><span class="cnt">Buy Form of :- '+d.name+'</span><br/>';
                                              hdata += '<span >Desired Price :- </span><span >'+d.price+'</span>&nbsp;<br/>';
                                              hdata += '<span >Email :- </span><span >'+d.email+'</span>&nbsp;<br/>';
                                              hdata += '<span >Phone :- </span><span >'+d.phone+'</span>&nbsp;<br/>';
                                              hdata += '<span >Property Type :- </span><span >'+d.propertyType+'</span>&nbsp;<br/>';
                                              hdata += '<span >Area :- </span><span >'+d.location+'</span>&nbsp;<br/>';
                                              hdata += '<span >Beds :- </span><span >'+d.beds+'</span>&nbsp;<br/>';
                                              hdata += '<span >Baths :- </span><span >'+d.baths+'</span>&nbsp;<br/>';
                                              hdata += '<span >Residence On :- </span><span >'+d.intrestedLocation+'</span>&nbsp;<br/>';
                                              hdata += '<span >Comments :- </span><span >'+d.comments+'</span>&nbsp;<br/>';
                                         hdata += '</p>';
                                         hdata += '<p class="u_sers"><span class=""><i class="fa fa-clock-o icon"></i>'+moment(d.createDate).format('LLL')+'</span></p>';
                                         hdata += '</li>';
                                    }
                                    if(d.type == 'sell'){
                                         hdata += '<li>';
                                         hdata += '<p>';
                                             hdata += '<span class="fa fa-envelope icon"></span><span class="cnt">Sell Form of :- '+d.name+'</span><br/>';
                                              hdata += '<span >Desired Price :- </span><span >'+d.price+'</span>&nbsp;<br/>';
                                              hdata += '<span >Email :- </span><span >'+d.email+'</span>&nbsp;<br/>';
                                              hdata += '<span >Phone :- </span><span >'+d.phone+'</span>&nbsp;<br/>';
                                              hdata += '<span >Property Type :- </span><span >'+d.propertyType+'</span>&nbsp;<br/>';
                                              hdata += '<span >Area :- </span><span >'+d.location+'</span>&nbsp;<br/>';
                                              hdata += '<span >Beds :- </span><span >'+d.beds+'</span>&nbsp;<br/>';
                                              hdata += '<span >Baths :- </span><span >'+d.baths+'</span>&nbsp;<br/>';
                                              hdata += '<span >Approx SqFt :- </span><span >'+d.SqFt+'</span>&nbsp;<br/>';
                                              hdata += '<span >Comments :- </span><span >'+d.comments+'</span>&nbsp;<br/>';
                                         hdata += '</p>';
                                         hdata += '<p class="u_sers"><span class=""><i class="fa fa-clock-o icon"></i>'+moment(d.createDate).format('LLL')+'</span></p>';
                                         hdata += '</li>';

                                    }
                                    if(d.type == 'email'){ 
                                         hdata += '<li>';
                                         hdata += '<p>';
                                             hdata += '<span class="fa fa-envelope icon"></span><span class="cnt">'+d.agent+'</span>&nbsp;emailed<br/>';
                                             hdata += '<span class="task_cnt">Subject :- </span>&nbsp;<span >'+d.subject+'</span>&nbsp;<br/><span class="task_cnt">Message :- </span>&nbsp;'+d.message+'</p>';
                                         hdata += '<p class="u_sers"><span class=""><i class="fa fa-clock-o icon"></i>'+moment(d.createDate).format('LLL')+'</span></p>';
                                         hdata += '<p><input type="button" class="btn btn-default dist_class" value="REPLY" data-toggle="modal" data-target="#rep_email" id="mail_rep" onclick="replytomail('+d.admin_lead_emails_id+','+d.agentId+','+d.lenderId+',\''+d.aemail+'\')"></p>';
                                         if(d.reply.length>0){
                                            hdata += '<p><span class="fa fa-envelope icon"></span><span class="cnt">Replies :- </span><br/>';
                                            $.each(d.reply,function(i1,d1){
                                                hdata += '<span class="task_cnt">Subject :- </span>&nbsp;<span >'+d1.subject+'</span>&nbsp;<br/><span class="task_cnt">Message :- </span>&nbsp;'+d1.mailBody+'</p>';   
                                            })
                                            hdata +='</p>';
                                         }
                                         hdata += '</li>';
                                    }
                                    if(d.type == 'notes'){
                                         hdata += '<li>';
                                         hdata += '<p>';
                                             hdata += '<span class="fa fa-sticky-note icon"></span><span class="task_cnt">Note : '+d.comments+'&nbsp;</span>Create Note for :-&nbsp;>'+d.lead+'</span><br/><span class="task_cnt">Assigned to :- '+d.agent+d.lender+'<br/></span><span class="basic-info task_cnt">Note created by :- ';
                                         hdata += d.login+'</span>';
                                          hdata += '</p>';
                                         hdata += '<p class="u_sers"><span class=""><i class="fa fa-clock-o icon"></i>'+moment(d.createDate).format('LLL')+'</span></p>';
                                         hdata += '</li>';
                                    }
                                    if(d.type == 'agenttransfer'){
                                         hdata += '<li>';
                                         hdata += '<p>';
                                             hdata += '<span class="fa fa-exchange icon"></span><span class="cnt">'+d.lead+' Change Realtor From: <span class="aname_1">'+d.oldAgent+'</span>To<span class="aname_2">'+d.newAgent+'</span></span><span >Agent transferred by :- ';
                                         hdata += d.login+'</span>'
                                         hdata += '</p>';
                                         hdata += '<p class="u_sers"><span class=""><i class="fa fa-clock-o icon"></i>'+moment(d.createDate).format('LLL')+'</span></p>';
                                         hdata += '</li>';
                                    }
                                    if(d.type == 'lendertransfer'){
                                         hdata += '<li>';
                                         hdata += '<p>';
                                        hdata += '<span class="fa fa-exchange icon"></span><span class="cnt">'+d.lead+' Change Lender form : <span class="aname_1">'+d.oldLender+'</span>To<span class="aname_2">'+d.newLender+'</span></span><span>';
                                        if(d.agentId!='0'){
                                           hdata += 'Agent transferred by :- ';
                                       } else {
                                            hdata += 'Lender transferred by :- ';
                                       }

                                         hdata += d.login+'</span>'
                                         hdata += '</p>';
                                         hdata += '<p class="u_sers"><span class=""><i class="fa fa-clock-o icon"></i>'+moment(d.createDate).format('LLL')+'</span></p>';
                                         hdata += '</li>';
                                    }
                                    if(d.type == 'status'){
                                         hdata += '<li>';
                                         hdata += '<p>';
                                             hdata += '<span class="fa fa-exchange icon"></span><span class="cnt">'+d.lead+' Change Status form : <span class="aname_1">'+d.currentStatus+'</span>To<span class="aname_2">'+d.newStatus+'</span></span><span >Changed by :- ';
                                         hdata += d.login+'</span>'
                                         hdata += '</p>';
                                         hdata += '<p class="u_sers"><span class=""><i class="fa fa-clock-o icon"></i>'+moment(d.createDate).format('LLL')+'</span></p>';
                                         hdata += '</li>';
                                    }
                                    if(d.type == 'ealert'){
                                        hdata += '<li>';
                                         hdata += '<p>';
                                             hdata += '<span class="fa fa-bell icon"></span><span class="cnt">'+d.lead+' EAlert frequency : <span class="aname_1">'+d.frequency+'</span>Property Type<span class="aname_2">'+d.propType+'</span><span> Location :- '+d.location+'</span></span><span >Changed by :- ';
                                         hdata += d.agent+'</span>'
                                         hdata += '</p>';
                                         hdata += '<p class="u_sers"><span class=""><i class="fa fa-clock-o icon"></i>'+moment(d.createDate).format('LLL')+'</span></p>';
                                         hdata += '</li>';
                                    }
                                });
                              }else {
                                hdata += '<p class="cnt"> No History Found</p>';
                              }
                                hdata += '</ul>';
                              $('#historyDiv').html(hdata);
                            }
                        });
                    }

                    //get chart data
                    function getChart(type,id) {
                        $(".dist_class").css({"color": "#2791D3"});
                        $('#dist_'+type).css('color','black');

                        var options = {
                              labelInterpolationFnc: function(value) {
                                return value[0]
                              },
                              plugins: [
                                Chartist.plugins.tooltip()
                              ]
                        };

                        $.ajax({
                                type    : "POST",
                                url     : "/getCharts",
                                data    : {id:id,type:type},
                                dataType: "json",
                                success : function (res) {
                                    if(res != 0){
                                        $('#chart_ul li').remove();
                                        for(var j=0;j<res.label.length;j++){

                                            if(res.series[j].value>0){
                                                $('#chart_ul').append('<li><span>'+res.series[j].meta+' - ( '+res.series[j].value+' p)<span></li>');
                                            }
                                        }
                                        var data = {
                                          labels: res.label,
                                          series: res.series
                                        };
                                        new Chartist.Pie('.ct-chart', data, options);
                                    }
                                }
                            })
                    }

                    //set email body
                    function setemaildata(value){
                        var formURL = "/emailTmpById";
                        var mes='';
                        $.ajax({
                            url : formURL,
                            type: "POST",
                            data:"id="+value,
                            dataType:"json",
                            success:function(data, textStatus, jqXHR) {
                                $("#emailSubject").val(data[0].emailSubject);
                                CKEDITOR.instances.emailBody.setData( data[0].emailBody, function(){
                                    this.checkDirty();  // true
                                });
                            }
                        });
                    }

                    //set text modal body
                    function settxtbody1(val){
                        var formURL = "/gettxtbody";
                        $.ajax({
                            url : formURL,
                            data:"id="+val,
                            type: "POST",
                            success:function(data, textStatus, jqXHR){
                                $('#textbody1').val(data[0].templateBody);
                            }
                        });
                    }
                     function getSmartdrip(leadId,type){

                        $.ajax({
                                url : '/getsmartdripLeadfull',
                                type : 'POST',
                                data : {leadId : leadId, type : type },
                                dataType : 'json',
                                success : function(res){
                                    var drip='';
                                    if(res.length==0){
                                      drip+='<li><p> There are no plans available for this contact. <br></div>';
                                    }
                                    for(i=0;i<res.length;i++){
                                        drip+='<li><p>'+res[i].plan_name.toUpperCase()+'</p><p>'+res[i].description+'</p><span class="fa fa-plus pull-right icon" title="add" id="add" onclick="addDrip('+res[i].smart_drip_plan_id+','+type+');"></span></li>';
                                    }
                                    $('#addlist').html(drip);
                                    //alert(leadId);

                                    $.ajax({
                                        url : '/getsmartdripAssigndata',
                                        type : 'POST',
                                        data : {leadId : leadId },
                                        dataType : 'json',
                                        success : function(res1){
                                            $.ajax({
                                                url:"/getagentProfile",
                                                dataType : 'json',
                                                data: {},
                                                type : 'POST',
                                                success : function (res) {
                                                    var allowealerts = res.allowEAlerts;
                                                    if(allowealerts != 'true'){
                                                        $("#eicon").hide();
                                                    }
                                                }
                                            })
                                            var drip="";
                                            if(res1.length !== 0){
                                                  drip+='<ul class="lst" id="addedlist">';
                                                for(i=0;i<res1.length;i++){

                                                    drip+=' <li class="list_lis"><span class="icons">';
                                                    if(res1[i].data.running_status == 2)
                                                    {
                                                       drip+='<span class="pasuse-li"><span class="fa fa-pause-circle-o paused"></span><br/><span class="ttl">Paused</span></span></span><div class="cnt"><p>'+res1[i].name[0].plan_name.toUpperCase()+'</p><p>'+res1[i].name[0].description+'</p><span class="fa fa-ellipsis-v pull-right eicon clickstatus" id="eicon" data-id='+res1[i].data.assignId+'></span><ul class="dropdown down'+res1[i].data.assignId+'" ><li id="start-btn" onclick="chaingeStatus('+res1[i].data.assignId+',\'r\','+leadId+','+type+');">Started</li><li id="terminate-btn" onclick="deletAssign('+res1[i].data.assignId+','+leadId+','+type+')">Terminated</li></ul></div></li>';
                                                    }
                                                    else if(res1[i].data.running_status == 1)
                                                    {
                                                       drip+='<span class="started-li"><span class="fa fa-play-circle-o started"></span><br/><span class="ttl">Started</span></span></span><div class="cnt"><p>'+res1[i].name[0].plan_name.toUpperCase()+'</p><p>'+res1[i].name[0].description+'</p><span class="fa fa-ellipsis-v pull-right eicon clickstatus" id="eicon" data-id='+res1[i].data.assignId+'></span><ul class="dropdown down'+res1[i].data.assignId+'"><li id="pause-btn" onclick="chaingeStatus('+res1[i].data.assignId+',\'p\','+leadId+','+type+')">Paused</li><li id="terminate-btn" onclick="deletAssign('+res1[i].data.assignId+','+leadId+','+type+')">Terminated</li></ul></div></li>';

                                                    }
                                                    else if(res1[i].data.running_status == 3)
                                                    {
                                                       drip+='<span class="started-li"><span class="stop  fa fa-stop-circle-o"></span><br/><span class="ttl">Completed</span></span></span><div class="cnt"><p>'+res1[i].name[0].plan_name.toUpperCase()+'</p><p>'+res1[i].name[0].description+'</p></div></li>';

                                                    }

                                                }
                                                  drip+='</ul>';

                                            }
                                            else{
                                                drip+=' <center><p class="title">This Lead is not currently on any<br/> Automated Systems.</p><button class="btn" id="addsysbtn"><span class="ttl">Add System</span><span class="fa fa-plus icon"></span></button></center>';

                                            }

                                             $('#box-one').html(drip);
                                                $('#addsysbtn').click(function(){
                                                $("#box-two").show();
                                                $("#box-one").hide();
                                                $("#addsys").addClass("active");
                                                $("#assigned").removeClass("active");
                                             });
                                             $(".clickstatus").click(function(e){
                                                var id = $(this).data("id");
                                                $('.status_dropdown').each(function(i,v){
                                                    if(!$(this).hasClass('down'+id)){
                                                        $(this).hide();
                                                    }
                                                });
                                                $('.down'+id).toggle();
                                                e.stopPropagation();
                                            })
                                        }
                                    });
                                }
                            });
                    }
                    function addDrip(drip_id,type){
                        $.ajax({
                            url : '/startNewDrip',
                            type : 'POST',
                            data : { leadId : leadId, dripId : drip_id },
                            dataType : 'json',
                            success : function(res){
                            $("#assigned").addClass("active");
                            $("#box-one").show();
                            $("#addsys").removeClass("active");
                            $("#box-two").hide();
                           getSmartdrip(leadId,type);
                            }
                        })
                    }


    $('#addnoteform').submit(function (e){
        e.preventDefault();
        var data = {
            leadId : $('#leadIdy').val(),
            agentId : $('#agentIdnote').val(),
            comments : $('#notecomments').val(),
            tododate : $('#tododate').val(),
            notify : $('#notify_chk').is(':checked'),
            share : $('#share_chk').is(':checked')
        };
        if($('#notecomments').val()==''){
          $('#notecomments').focus().notify("Please enter decription...", { className: "error", position:"top" });
          return false;
        }
        if($('#tododate').val()==''){
          $('#tododate').focus().notify("Please select date...", { className: "error", position:"top" });
          return false;
        }
        if(data.agentId == 0){
            $('#agentIdnote').notify("Please select agent/lender", { className: "error", position:"top" });
            return false;
        }
        $.ajax({
            type : 'POST',
            url : '/addNotes',
            data : data,
            dataType : 'json',
            success : function(res){
                $('#btn_note').notify("Note added successfully", { className: "success", position:"top" });
                setTimeout(function(){
                  $('#addnoteform')[0].reset();
                  $('#addnote').modal('hide');
                  dataappend(leadId);
                }, 700);
            }
        })
    })

    $("#lenderform").submit(function (e) {
        var postData = $(this).serializeArray();
        var formURL = "/assignOrTransferLenderFull";
        // var x = $("#lenderselect").val();
        // var y = $("#leadidl").val();
        // if (x == 0 || x == '') {
        //      $('#lenderselect').focus().notify("Please select lender...", { className: "error", position:"top" });
        //
        //     return false;
        // }
        var data = {
            leadId : $('#leadidl').val(),
            oldlender : $('#leads_lenderId').val(),
            newlender : $('#lenderselect').val(),
            message : $.trim($('#commentl').val()),
        }
        if (data.oldlender == data.newlender) {
             $('#lenderselect').focus().notify("Please select another lender...", { className: "error", position:"top" });
            return false;
        }
        if (data.newlender == 0 || data.newlender == '') {
             $('#lenderselect').focus().notify("Please select lender...", { className: "error", position:"top" });
            return false;
        }

        $.ajax({
            data   : postData,
            success: function (res, textStatus, jqXHR) {
                $('#leads_lenderId').val(res.lenderId);
                $('#lenderspan').html(res.lenderName);
                 $('#lender_trans_btn').focus().notify("Success...", { className: "success", position:"top" });
                setTimeout(function(){
                  $('#commentl').val("");
                  $('#lenderpop').modal('hide');
                //  getPropData();
                }, 700);
            },
            type   : "POST",
            url    : formURL
        });
        e.preventDefault(); //STOP default action
    });

    $('#realtor_form').submit(function (e){
        e.preventDefault();
        var data = {
            leadId : $('#realtor_leadId').val(),
            oldagent : $('#leads_agentId').val(),
            newagent : $('#realtorselect').val(),
            message : $.trim($('#realtor_message').val()),
        }
        if(data.newagent == 0 || data.newagent == ''){
            $('#realtorselect').focus().notify("Please select agent...", { className: "error", position:"top" });
            return false;
        }
        if(data.oldagent == data.newagent){
            $('#realtorselect').focus().notify("Please select another agent...", { className: "error", position:"top" });
            return false;
        }

        $.ajax({
            url : "/submitAgentTransferfull",
            type : "POST",
            dataType : "json",
            data : data,
            success : function(res){
                 $('#agent_trans_btn').focus().notify("Success...", { className: "success", position:"top" });
                  setTimeout(function(){
                  $('#realtor_form')[0].reset();
                  $('#realtorpop').modal('hide');
                    $('#leads_agentId').val(res.agentId);
                    $('#agentspan').html(res.agentName);
                  //  getPropData();
                }, 700);

            }
        })
    })

     //set email body
    function setemaildata(value){
        var formURL = "/emailTmpById";
        var mes='';
        $.ajax({
            url : formURL,
            type: "POST",
            data:"id="+value,
            dataType:"json",
            success:function(data, textStatus, jqXHR) {
                $("#emailSubject").val(data[0].emailSubject);
                CKEDITOR.instances.emailBody.setData( data[0].emailBody, function(){
                    this.checkDirty();  // true
                });
            }
        });
    }

    //set text modal body
    function settxtbody1(val){
        var formURL = "/gettxtbody";
        $.ajax({
            url : formURL,
            data:"id="+val,
            type: "POST",
            success:function(data, textStatus, jqXHR){
                $('#textbody1').val(data[0].templateBody);
            }
        });
    }
    function dataappend(x){
      var filtrt = [];
      $.each($("input[name='filterchecks']:checked"), function(){
          filtrt.push($(this).val());
      });
      getHistory(filtrt,x);
      $("#actions").hide();
    }
    $('#next_page2').click(function (e) {
        var leadid = $("#search_leaddiv").val();
        e.preventDefault();
        $('.notifyjs-wrapper').trigger('notify-hide');
        var start = parseInt($('#pagination_val').val());
        var total = parseInt($('#total_pages').html());
        if(start<total){
            $('#pagination_val').val(start+1);
        } else {
            $("#next_page2").notify("No data..", { className: "error", position:"left" });
            return false;
        }
        getSearches(leadid);
    });
    $('#prev_page2').click(function (e) {
      var leadid = $("#search_leaddiv").val();
        e.preventDefault();
        $('.notifyjs-wrapper').trigger('notify-hide');
        var start = parseInt($('#pagination_val').val());
        if(start == 1){
            $("#prev_page2").notify("No data..", { className: "error", position:"left" });
            return false;
        } else {
            $('#pagination_val').val(start-1);
        }
        getSearches(leadid);
    });
    $('#next_page1').click(function (e) {
        var leadid = $("#search_leaddiv").val();
        e.preventDefault();
        $('.notifyjs-wrapper').trigger('notify-hide');
        var start1 = parseInt($('#pagination_val1').val());
        var total1 = parseInt($('#total_pages1').html());
        if(start1<total1){
            $('#pagination_val1').val(start1+1);
        } else {
            $("#next_page1").notify("No data..", { className: "error", position:"left" });
            return false;
        }
        getSearches(leadid);
    });
    $('#prev_page1').click(function (e) {
      var leadid = $("#search_leaddiv").val();
        e.preventDefault();
        $('.notifyjs-wrapper').trigger('notify-hide');
        var start1 = parseInt($('#pagination_val1').val());
        if(start1 == 1){
            $("#prev_page1").notify("No data..", { className: "error", position:"left" });
            return false;
        } else {
            $('#pagination_val1').val(start-1);
        }
        getSearches(leadid);
    });
    $("#backbtn").click(function(){
      $(".content-body").show();
      $(".createalert").hide();
      $("#backbtn").hide();
    })
    function getbedsbths(bedsbths){
      var $str = bedsbths;
      var myarr = $str.split(",");
      var strr1 = myarr[0];
      if(strr1 == ''){
        strr1 = 0;
      }
      var strr2 = myarr[1];
      if(strr2 == ''){
        strr2 = 0;
      }
      var bbb =  strr1 + "&" + strr2;
      return bbb;
    }
    function getfeature(feature){
      var str = '';
      if(feature.indexOf("photo-1")>=0){
        str += 'Has Photos,';
      }
      if(feature.indexOf("OH-2")>=0){
        str += 'Open House,';
      }
      if(feature.indexOf("W-03")>=0){
        str += 'Waterfront,';
      }
      if(feature.indexOf("N-4")>=0){
        str += 'New construction,';
      }
      if(feature.indexOf("GR-5")>=0){
        str += 'Garage,';
      }
      if(feature.indexOf("P-6")>=0){
        str += 'Pool,';
      }
      if(feature.indexOf("F-7")>=0){
        str += 'Fireplace,';
      }
      if(feature.indexOf("MD-8")>=0){
        str += 'Master Downstairs,';
      }
      if(feature.indexOf("IREMOD-9")>=0){
        str += 'Remodeled,';
      }
      if(feature.indexOf("HBASE-10")>=0){
        str += 'Basement,';
      }
      if(feature.indexOf("AGEREST-11")>=0){
        str += 'Adult Community,';
      }
      if(feature.indexOf("BC-12")>=0){
        str += 'Beach Community,';
      }
      if(feature.indexOf("CD-13")>=0){
        str += 'Community Dock,';
      }
      if(feature.indexOf("CFR-14")>=0){
        str += 'Community Fitness Room,';
      }
      if(feature.indexOf("HCPG-15")>=0){
        str += 'Community Playground,';
      }
      if(feature.indexOf("HCPOOL-16")>=0){
        str += 'Community Pool,';
      }
      if(feature.indexOf("GT-17")>=0){
        str += 'Gated Community,';
      }
      if(feature.indexOf("GOLFC-18")>=0){
        str += 'Golf Community,';
      }
      if(feature.indexOf("Has HOA")>=0){
        str += 'Has HOA,';
      }
      if(feature.indexOf("HP-20")>=0){
        str += 'Horse Property,';
      }
      if(feature.indexOf("LKCM-21")>=0){
        str += 'Lake Community,';
      }
      if(feature.indexOf("NHOA-22")>=0){
        str += 'No HOA,';
      }
      if(feature.indexOf("NAGEREST-23")>=0){
        str += 'Not Age Restricted,';
      }
      if(feature.indexOf("TC-24")>=0){
        str += 'Tennis Community,';
      }
      if(feature.indexOf("PT-25")>=0){
        str += 'Close to Public Transportation,';
      }
      if(feature.indexOf("ICL-26")>=0){
        str += 'Corner Lot,';
      }
      if(feature.indexOf("ICDS-27")>=0){
        str += 'Cul-De-Sac,';
      }
      if(feature.indexOf("IFU-28")>=0){
        str += 'Fixer-Upper,';
      }
      if(feature.indexOf("HC-29")>=0){
        str += 'Handicap Equipped,';
      }
      if(feature.indexOf("H-30")>=0){
        str += 'Historic Property,';
      }
      if(feature.indexOf("HMTIL-31")>=0){
        str += 'InLaw Suite,';
      }
      if(feature.indexOf("C-32")>=0){
        str += 'On Golf Course,';
      }
      if(feature.indexOf("PVDS-33")>=0){
        str += 'Paved Street,';
      }
      if(feature.indexOf("IPA-34")>=0){
        str += 'Pets Allowed,';
      }
      if(feature.indexOf("IPW-35")>=0){
        str += 'Public Water,';
      }
      if(feature.indexOf("ISP-36")>=0){
        str += 'Septic,';
      }
      if(feature.indexOf("IS-37")>=0){
        str += 'Sewer,';
      }
      if(feature.indexOf("IW-38")>=0){
        str += 'Well,';
      }
      if(feature.indexOf("B-39")>=0){
        str += 'Beach (On or Near),';
      }
      if(feature.indexOf("ICF-40")>=0){
        str += 'Creek Front,';
      }
      if(feature.indexOf("L-41")>=0){
        str += 'Lake Front,';
      }
      if(feature.indexOf("NWF-42")>=0){
        str += 'Not Waterfront,';
      }
      if(feature.indexOf("WA-43")>=0){
        str += 'Water Access,';
      }
      if(feature.indexOf("IBAYV-44")>=0){
        str += 'Bay View,';
      }
      if(feature.indexOf("ICV-45")>=0){
        str += 'Canal View,';
      }
      if(feature.indexOf("ICTYV-46")>=0){
        str += 'City View,';
      }
      if(feature.indexOf("MV-47")>=0){
        str += 'Mountain View,';
      }
      if(feature.indexOf("IOV-48")>=0){
        str += 'Ocean View,';
      }
      if(feature.indexOf("IOPV-49")>=0){
        str += 'Panoramic View,';
      }
      if(feature.indexOf("IPSV-50")>=0){
        str += 'Poolside View,';
      }
      if(feature.indexOf("RV-51")>=0){
        str += 'River View,';
      }
      if(feature.indexOf("ggg")>=0){
        str += 'ggggg,';
      }
      if(feature.indexOf("IWTRV-52")>=0){
        str += 'Water View,';
      }
      if(feature.indexOf("IWDV-53")>=0){
        str += 'Wooded View,';
      }
      return str;
    }

    function replytomail(mailid,agentid,lenderid,aemail){

        var urldata = JSON.parse('{"' + decodeURI(location.search.substring(1).replace(/%2C/g, ",").replace(/&/g, "\",\"").replace(/%23/g, "#").replace(/=/g, "\":\"")) + '"}');
        $("#rep_sender-id").val($.trim($('.email_info').html()));
        $("#rep_recipient-id").val(aemail);
        $('#leadId3').val(urldata.lkey);
        $('#agentId3').val(agentid);
        $('#lenderId3').val(lenderid);
        $('#emailId3').val(mailid);
    }

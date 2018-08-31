$(document).click(function(e){  
    
    // hide drop down
    $('.status_dropdown').hide();
    
    // hide show/hide columns
    //$("#show_hide").removeClass("bounceInDown");
    //$("#show_hide").addClass("bounceOutUp");
    
    //hideFilter();

    //hide select all option
    $('#selectalldrop').hide();

    $('#options').hide();

    $('#viewall').hide();
    $('#view').hide();

    e.stopPropagation();
});

function hideFilter(){
	//hide filter
    $("#filter").removeClass("fadeInLeft");
    $("#filter").addClass("fadeOutLeft");
}
$(document).ready(function(){
	
	$("#filter-toggle").click(function(e) {
	        
	    $("#filter").show();
	    if($("#filter").hasClass("fadeInLeft")){
	    	hideFilter();
	    } else {
	    	$("#filter").removeClass("fadeOutLeft");
	    	$("#filter").addClass("fadeInLeft");
	    }
	    $("#show_hide").hide();
	    $('#selectalldrop').hide();
	    $('#options').hide();
	    e.stopPropagation();
	});

	$("#show").click(function(e) {
		$("#show_hide").toggle();
	    /*$("#show_hide").show();
	    if($("#show_hide").hasClass("bounceInDown")){
	    	$("#show_hide").removeClass("bounceInDown");
	    	$("#show_hide").addClass("bounceOutUp");
	    }else{
	    	$("#show_hide").removeClass("bounceOutUp");
	    	$("#show_hide").addClass("bounceInDown");
	    }*/
	    hideFilter();
	    $('#selectalldrop').hide();
	    e.stopPropagation();
	});

	$("#select_all").click(function(e){ 
		$('#selectalldrop').toggle();
		hideFilter();
		$("#show_hide").hide();
		$('#options').hide();
		e.stopPropagation();
	});
	$("#today").click(function(e){
		$('#options').toggle();
		$('#selectalldrop').hide();
		hideFilter();
		e.stopPropagation();
	});

	function toggleIcon(e) {
	    $(e.target).prev('.panel-heading').find(".more-less").toggleClass('glyphicon-plus glyphicon-minus');
	}
	$('.panel-group').on('hidden.bs.collapse', toggleIcon);
	$('.panel-group').on('shown.bs.collapse', toggleIcon);


    $('[data-toggle="tooltip"]').tooltip(); 

    $("#view_options").click(function(e){
		$('#viewall').toggle();
		e.stopPropagation();
	});
	
	$("#tasks").click(function(e){
		$('#view').toggle();
		e.stopPropagation();
	});

	/*$("#statuslabel").click(function(e){
		$('.status_dropdown').toggle();
		e.stopPropagation();
	});*/

  	//menus
  	/*$("#report").click(function(){
		$('.report_sub-menu').toggle();
		$('#report').addClass("open");
	});
  	$("#market").click(function(){
		$('.market_sub-menu').toggle();
		$('#market').addClass("open");
	});
  	$("#tools").click(function(){
		$('.tools_sub-menu').toggle();
		$('#tools').addClass("open");
	});
	$("#admin").click(function(){
		$('.admin_sub-menu').toggle();
		$('#admin').addClass("open");
	});*/
	
	/*$("#price_history").click(function(){
		//alert("Teja");
		$('.dailogue').show();
		$('.dailogue').addClass("flipInY");
		$('.dailogue').removeClass("flipOutY");
		//$('.backdrop').addClass("opacity");
	});
	$("#close").click(function(){
		//alert("Teja");
		$('.dailogue').addClass("flipOutY");
		$('.dailogue').removeClass("flipInY");
		//$('.backdrop').removeClass("opacity");
	});*/
	$("#email").click(function(){
		$('#email_form').show();
		$('.textform').hide();
		$('#email').addClass("active");
		$('#text').removeClass("active");
		$('.emailform').addClass("fadeInRight");
		$('.textform').removeClass("fadeInRight");
		
	});
	$("#text").click(function(){
		$('.textform').show();
		$('.emailform').hide();
		$('#text').addClass("active");
		$('#email').removeClass("active");
		$('.emailform').removeClass("fadeOutLeft");
		$('.textform').addClass("fadeInRight");

	});
	/*$("#searchInput").click(function(){
		$(".search_input").toggle(800);
	});*/
	/*$(".admin").click(function(){
		//alert("Teja");
		$(".adminmenu").addClass("show");
		$(".adminmenu").removeClass("hide");
		$(".angleicon").removeClass("fa-angle-down");
		$(".angleicon").addClass("fa-angle-left");
	});
	$(".admin").click(function(){
		$(".adminmenu").addClass("hide");
		$(".adminmenu").removeClass("show");
		$(".adminicon").addClass("fa-angle-down");
		$(".adminicon").removeClass("fa-angle-left");
	});*/
	$("#basic_filter").click(function(){
		
		$("#basic_filter").addClass("active");
		$("#activities").removeClass("active");
		$("#task").removeClass("active");
		$("#properties").removeClass("active");
		$("#channel").removeClass("active");
		$("#birth_anniversday").removeClass("active");
		$("#Duration").removeClass("active");
		
		$("#basic_filter_body").show();
		$("#basic_filter_body").addClass("zoomIn");
		$("#tasks_body").hide();
		$("#channels_body").hide();
		$("#prop_body").hide();
		$("#activities_body").hide();
		$("#birthd_body").hide();
		$("#duration_body").hide();
	});
	$("#channel").click(function(){
		$("#channel").addClass("active");
		$("#basic_filter").removeClass("active");
		$("#activities").removeClass("active");
		$("#task").removeClass("active");
		$("#properties").removeClass("active");
		$("#birth_anniversday").removeClass("active");
		$("#Duration").removeClass("active");

		$("#basic_filter_body").hide();
		$("#activities_body").hide();
		$("#tasks_body").hide();
		$("#prop_body").hide();
		$("#channels_body").addClass("zoomIn");
		$("#channels_body").show();
		$("#birthd_body").hide();
		$("#duration_body").hide();
	});
	$("#activities").click(function(){
		$("#activities").addClass("active");
		$("#channel").removeClass("active");
		$("#basic_filter").removeClass("active");
		$("#task").removeClass("active");
		$("#properties").removeClass("active");
		$("#birth_anniversday").removeClass("active");
		$("#Duration").removeClass("active");

		$("#basic_filter_body").hide();
		$("#activities_body").show();
		$("#activities_body").addClass("zoomIn");
		$("#tasks_body").hide();
		$("#prop_body").hide();
		$("#channels_body").hide();
		$("#birthd_body").hide();
		$("#duration_body").hide();
		
	});
	$("#task").click(function(){
			$("#task").addClass("active");	
			$("#activities").removeClass("active");
			$("#channel").removeClass("active");
			$("#basic_filter").removeClass("active");
			$("#properties").removeClass("active");
			$("#birth_anniversday").removeClass("active");
			$("#Duration").removeClass("active");
			
			$("#basic_filter_body").hide();
			$("#activities_body").hide();
			$("#tasks_body").show();
			$("#tasks_body").addClass("zoomIn");
			$("#prop_body").hide();
			$("#channels_body").hide();
			$("#birthd_body").hide();
			$("#duration_body").hide();
	});
	$("#properties").click(function(){
			$("#properties").addClass("active");
			$("#task").removeClass("active");	
			$("#activities").removeClass("active");
			$("#channel").removeClass("active");
			$("#basic_filter").removeClass("active");
			$("#birth_anniversday").removeClass("active");
			$("#Duration").removeClass("active");

			$("#basic_filter_body").hide();
			$("#activities_body").hide();
			$("#tasks_body").hide();
			$("#prop_body").show();
			$("#prop_body").addClass("zoomIn");
			$("#channels_body").hide();
			$("#birthd_body").hide();
			$("#duration_body").hide();
	});
	$("#birth_anniversday").click(function(){
			$("#birth_anniversday").addClass("active");
			$("#properties").removeClass("active");
			$("#task").removeClass("active");	
			$("#activities").removeClass("active");
			$("#channel").removeClass("active");
			$("#basic_filter").removeClass("active");
			$("#Duration").removeClass("active");
			
			$("#basic_filter_body").hide();
			$("#activities_body").hide();
			$("#tasks_body").hide();
			$("#prop_body").hide();
			$("#birthd_body").show();
			$("#birthd_body").addClass("zoomIn");
			$("#channels_body").hide();
			$("#duration_body").hide();
	});
	$("#Duration").click(function(){
			$("#birth_anniversday").removeClass("active");
			$("#properties").removeClass("active");
			$("#task").removeClass("active");	
			$("#activities").removeClass("active");
			$("#channel").removeClass("active");
			$("#basic_filter").removeClass("active");
			$("#Duration").addClass("active");
			
			$("#basic_filter_body").hide();
			$("#activities_body").hide();
			$("#tasks_body").hide();
			$("#prop_body").hide();
			$("#birthd_body").hide();
			$("#duration_body").show();
	      	$("#duration_body").addClass("zoomIn");
			$("#channels_body").hide();
	})

	/*Emailaccountability js*/
	$('#cset_li').click(function(){
	 	$("#cset_tbl").show();
	 	$("#agt_tbl").hide();
	 	$("#myt_tbl").hide();
	 	$("#crt_template").hide();
	 	$('#cset_li').addClass("actbtn");
	 	$('#my_li').removeClass("actbtn");
	 	$('#at_li').removeClass("actbtn");
	 	$(".agent_selectbox").hide();
	 	$('.et_div_2').show();
	});
	$('#at_li').click(function(){
	 	$("#cset_tbl").hide();
	 	$("#agt_tbl").show();
	 	$("#myt_tbl").hide();
	 	$("#crt_template").hide();
	 	$('#at_li').addClass("actbtn");
	 	$('#cset_li').removeClass("actbtn");
	 	$('#my_li').removeClass("actbtn");
	 	$(".agent_selectbox").show();
	 	$('.et_div_2').show();
	});
	$('#my_li').click(function(){
	 	$("#cset_tbl").hide();
	 	$("#agt_tbl").hide();
	 	$("#myt_tbl").show();
	 	$("#crt_template").hide();
	 	$('#my_li').addClass("actbtn");
	 	$('#cset_li').removeClass("actbtn");
	 	$('#at_li').removeClass("actbtn");
	 	$(".agent_selectbox").hide();
	 	$('.et_div_2').show();
	});

	/*$('#create_bt').click(function(){
		
		$('#email_temp_form')[0].reset();
        CKEDITOR.instances['emailsubjectbody'].setData('', function(){
        	this.checkDirty();
        });
        $("input[name='optionsRadios1'][value='yes']").prop('checked', true);
        $("input[name='hideform1'][value='yes']").prop('checked', true);
        $('.right0').css('background-color','#cccccc').css('color','rgba(0, 0, 0, 0.6)');
        $('.left0').css('background-color','#00cc33').css('color','#fff');

	 	$("#cset_tbl").hide();
	 	$("#agt_tbl").hide();
	 	$("#myt_tbl").hide();
	 	$("#crt_template").show();
	 	$('#my_li').removeClass("actbtn");
	 	$('#cset_li').removeClass("actbtn");
	 	$('#at_li').removeClass("actbtn");
	 	$(".agent_selectbox").hide();
	 	$('.et_div_2').hide();

	});*/

	/*Email_tmp_mobile*/
	$('#cset_mb_li').click(function(){
	 	$("#cset_tbl").show();
	 	$("#agt_tbl").hide();
	 	$("#myt_tbl").hide();
	 	$("#crt_template").hide();
	 	$(".mob_cmp_li").show();
	 	$(".mob_ag_li").hide();
	 	$(".mob_my_li").hide();
	 	$(".agent_selectbox").hide();
	 	if($("#filter").hasClass("fadeInLeft")){
            $("#filter").removeClass ("fadeInLeft");
        	$("#filter").addClass ("fadeOutLeft");
        }
	});
	$('#at_mb_li').click(function(){
	 	$("#cset_tbl").hide();
	 	$("#agt_tbl").show();
	 	$("#myt_tbl").hide();
	 	$("#crt_template").hide();
	 	$(".mob_ag_li").show();
	 	$(".mob_cmp_li").hide();
	 	$(".mob_my_li").hide();
	 	$(".agent_selectbox").show();
	 	if($("#filter").hasClass("fadeInLeft")){
            $("#filter").removeClass ("fadeInLeft");
        	$("#filter").addClass ("fadeOutLeft");
        }
	});
	$('#my_mb_li').click(function(){
	 	$("#cset_tbl").hide();
	 	$("#agt_tbl").hide();
	 	$("#myt_tbl").show();
	 	$("#crt_template").hide();
	 	$(".mob_cmp_li").hide();
	 	$(".mob_ag_li").hide();
	 	$(".mob_my_li").show();
	 	$(".agent_selectbox").hide();
	 	if($("#filter").hasClass("fadeInLeft")){
            $("#filter").removeClass ("fadeInLeft");
        	$("#filter").addClass ("fadeOutLeft");
        }
	});

	/* $('#show').click(function(){
	 	$("#show_hide").toggle();
	 });*/
});

//$(document).ready(function () {

	var maxMobileSize = 768; // this value should match the media query
	var mobileAccordionTableSelector = ".table.mobile-accordion";


	// Resize and Reorientation code borrowed and modified from this StackOverflow answer:
	//		http://stackoverflow.com/a/6603537
	var previousOrientation = window.orientation;

	var checkOrientation = function() {
	    if(window.orientation !== previousOrientation){
	        previousOrientation = window.orientation;
	        checkScreenSize();
	    }
	};

	var checkScreenSize = function() {
		var width = $(window).width();

		if (width < maxMobileSize) {
			handleMobile();
		} else {
			handleDesktop();
		}
	}

	window.addEventListener("resize", checkScreenSize, false);
	window.addEventListener("orientationchange", checkOrientation, false);

	// Android doesn't always fire orientationChange on 180 degree turns
	setInterval(checkOrientation, 2000);


	function handleMobile() {
		slideUpAllInactive();
	}

	function handleDesktop() {
		showRows();
		addRowHighlighting();
	}

	function showRows() {
		$(mobileAccordionTableSelector + " .tr").each(function () {
			$(this).removeAttr("style");
		});
	}

	function addRowHighlighting() {
		var rows = $(".table .tbody .tr");
			
		/* Add a highlighting class on even rows */
		for (var i = 0; i < rows.length; i++) {
			if (i % 2 == 1) {
				$(rows[i]).addClass("alternate-highlight");
			}
		}
	}

	function slideUpAllInactive() {
		$(".table .rh").not(".active").each(function() {
			$(this).next().slideUp();
		});
	}

	function handleMobileAccordionTableClick(rowHeader) {
		var table = $(rowHeader).parents(".table");

		$(table).find(".rh").each(function () {
			$(this).removeClass("active");
		});

		slideUpAllInactive();

		var nextRow = $(rowHeader).next();
		if (!nextRow.is(":visible")) {
			$(rowHeader).addClass("active");
			nextRow.slideDown();
		}
	}

	$(mobileAccordionTableSelector + " .rh").click(function () {
		handleMobileAccordionTableClick(this);
	});

	// Need to run this on first load
	checkScreenSize();
//});
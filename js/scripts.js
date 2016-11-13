
	var lrs;
	var dataSet = [];
	try {
	    lrs = new TinCan.LRS({
	        endpoint: "https://cloud.scorm.com/tc/JYFUW991B4/",
	        username: "chgm3Ilb9S33LDPYkDg",
	        password: "5Xuy9z0SHCOkmTCG4r8",
	        allowFail: false
	    });
	} catch (ex) {
	    console.log("Failed to setup LRS object: " + ex);
	    // TODO: do something with error, can't communicate with LRS
	}


	$(document).ready(function() {

		$("#plisw8").show();
	    retrieveStatements();
	    console.log(dataSet);



	    function retrieveStatements() {

	        lrs.queryStatements({
	            params: {
	                verb: new TinCan.Verb({
	                    id: "http://adlnet.gov/expapi/verbs/completed"
	                }),
	                activity: new TinCan.Activity({
	                    id : "http://www.taolin.co.uk/program/taolin/course/generic/learning-object/know-me/combo-psycho-learning"
	                }),
	            },
	            callback: function(err, sr) {
	                if (err !== null) {
	                    console.log("Failed to query statements: " + err);
	                    // TODO: do something with error, didn't get statements
	                    return;
	                }

	                if (sr.more !== null) {
	                    // TODO: additional page(s) of statements should be fetched
	                }

	                $.each(sr.statements, function(k, v) {
	                	console.log(v);
	                	for (var i = dataSet.length - 1; i >= 0; i--) {
	                		if(v.actor.mbox.replace('mailto:','') == dataSet[i][1]){
	                			return;
	                		}
	                	}
	                	var lStyles =["-"];
	                	if(v.context.extensions){
	                    // console.log(Object.values(v.context.extensions));
	                      lStyles = Object.values(v.context.extensions);
	                    }
	                 	var d = new Date(v.stored);
	                    var temp = [v.actor.name ,v.actor.mbox.replace('mailto:',''), lStyles[0], "<b>"+d.getDate() + '/' + (d.getMonth()+ 1) + '/' +  d.getFullYear()+"</b>" ];
	                    dataSet.push(temp);


	                });
				$('#mainTable').DataTable({
					data: dataSet,
					paging: false
				});
				$("#plisw8").hide();
	                // TODO: do something with statements in sr.statements
	            }
	        });
	    }

	
	});
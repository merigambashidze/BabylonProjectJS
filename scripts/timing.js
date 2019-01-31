     //--------------------- Get initial time --------------------


        //------hours-----
        var time = document.getElementById("hidd_time").innerHTML;
        var time_array = time.split(':');
        var ss = parseInt(time_array[2], 10);
        var mm = parseInt(time_array[1], 10);
        var hh = parseInt(time_array[0], 10);

        $("#hours").html(hh);
        $("#seconds").html(ss);
        $("#minutes").html(mm);
        
        //-------days---------
var days = {
            Mon: ["ორშაბათი",0],
            Tue: ["სამშაბათი",1],
            Wed: ["ოთხშაბათი",2],
            Thu: ["ხუთშაბათი",3],
            Fri: ["პარასკევი",4],
            Sat: ["შაბათი",5],
            Sun: ["კვირა",6]
        };


        var day = document.getElementById("hidd_day").innerHTML;
        dge = day.trim();
        dge_span.innerHTML = days[dge][0];
        var current_day=days[dge][1];

        //----placeholders for changed time----
        var current_ss=ss;
        var current_hh=hh;
        var current_mm=mm;
        //---environment---
        var double_timing = false;  //when time gets changed by user, there are 2 clocks ticking, one for initial time which is always ticking (to be able to reset), second for changed time (if user changes time). if there is reset, change time clock stops and only initial is left. false - there is no change time, true - there are two clocks, one for initial, one for change 

 

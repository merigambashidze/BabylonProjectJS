var dzebna = document.getElementById("dzebna");
        document.getElementById("dzebna").onclick = function () {
            var dge_1 = $("#dge option:selected").val();
            var dge_2 = $("#dge1 option:selected").val();
            var saati_1 = $("#saati option:selected").val();
            var saati_2 = $("#saati1 option:selected").val();
            var leqtori = $("#leqtori").val();
            var leqcia = $("#leqcia").val();
            var jgufi = $("#jgufi").val();
            var auditoria = $("#auditoria").val();
            var query = "info.php?dge_1=" + dge_1 + "&dge_2=" + dge_2 + "&saati_1=" + saati_1 + "&saati_2=" + saati_2 + "";
            if (leqtori.length > 1) {
                query += "&leqtori=" + leqtori + "";
                
            }
            if (leqcia.length > 1) {
                query += "&leqcia=" + leqcia + "";
            }
            if (jgufi.length > 1) {
                query += "&jgufi=" + jgufi + "";
            }
            if (auditoria >= 100) {
                query += "&auditoria=" + auditoria + "";
            }
          
            $.ajax({
                url: query
                , success: function (result) {
                    var text = result.split(";");
                        text.splice((text.length - 1), 1);
                
                    if (text.length>1) {
                        var end = "<table><thead><tr><th>აუდიტორია:</th><th>ლექცია:</th><th>ლექტორი:</th><th>კგუფი:</th><th>ასაათი:</th><th>დღე:</th></tr></thead><tbody>";
                        var me = 0;
                        while (me < text.length) {
                            end += "<tr>";
                            var res = text[me].split("^");
                            
                            
                            
                            end += "<td>" + res[0] + "</td><td>" + res[1] + "</td><td>" + res[2] + " </td><td>" + res[3] + " </td><td>" + saatebi[parseInt(res[4], 10)] + " </td><td>" + dgeebi1[parseInt(res[5], 10)] + "</td>";
                            me += 1;
                            end += "</tr>";
                        }
                        end += "</tbody></table>";
                        div.style.display="block";
                        closs.style.display="block";
                        div.innerHTML = end;
                        var result = document.getElementById("result");
                         document.getElementById("result").innerHTML = "";
                    } else {
                        document.getElementById("result").innerHTML = "ჩანაწერი არ მოიძებნა";
                    }

                }
            });

        }

  function search(){
    
   
    if(document.getElementById("jgufebi").checked){
    var id="jgufebi";
      
    }
    if(document.getElementById("leqtorebi").checked){
        var id="leqtorebi";
        
      
    }
    if(document.getElementById("auditoriebi").checked){
        var id="auditoriebi";
       
     
    }
     var cxrili=input.value;
    if((cxrili.length>3)&&(cxrili.indexOf("'")==-1)&&(cxrili.indexOf('"')==-1)&&(cxrili.indexOf('  ')==-1)){
  
        ajax.open("GET","request.php?id="+id+"&cxrili="+cxrili+"");
        ajax.onreadystatechange=function(){
            if((ajax.readyState===4)&&(ajax.status===200)){
                if(ajax.responseText.length>1){
                    div.style.display="block";
                    closs.style.display="block";
                    div.innerHTML=ajax.responseText;
                    document.getElementById("response").innerHTML="";
                }else{
                    document.getElementById("response").innerHTML="ჩანაწერი არ მოიძებნა";
                }
            }
        }
        ajax.send();
    
}
    
}

 function search(){
    
   
    if(document.getElementById("jgufebi").checked){
    id="jgufebi";
      
    }
    if(document.getElementById("leqtorebi").checked){
       id="leqtorebi";
        
      
    }
    if(document.getElementById("auditoriebi").checked){
        id="auditoriebi";
       
     
    }
    var search_query=input.value;
    if((search_query.length>3)&&(search_query.indexOf("'")==-1)&&(search_query.indexOf('"')==-1)&&(search_query.indexOf('  ')==-1)){
  
        ajax.open("GET","request.php?id="+id+"&cxrili="+search_query+"");
        ajax.onreadystatechange=function(){
            if((ajax.readyState===4)&&(ajax.status===200)){
                if(ajax.responseText.length>1){
                    div.style.display="block";
                    closs.style.display="block";
                    div.innerHTML=ajax.responseText;
                    document.getElementById("response").innerHTML="";
                }else{
                    document.getElementById("response").innerHTML="ჩანაწერი არ მოიძებნა";
                }
            }
        }
        ajax.send();
    
}
    
}

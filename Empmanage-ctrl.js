 (function () {
    "use strict";
    
    angular.module("app")
        .controller("EmpManage", Empinfo);//registering the controller

    Empinfo.$inject = ["personalinfo","$state","$http"];


    function Empinfo(pinfo,$state,$http) {
        var vm = this;
        
        vm.info = {};
        vm.display = {};
        vm.dataArr = [];
        vm.status = { isFirstOpen: true, isFirstDisabled: false };
        vm.tabs = [];
        vm.alerts = [];
        vm.showinfo = showinfo;
        vm.deleteinfo = deleteinfo;
        vm.PhoneNumberP = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;

        vm.startButton =startButton;
        vm.loadDoc =loadDoc;

        function showinfo() {
            //  vm.addAlert();
            console.log(vm.info);
            var pinfo1 = pinfo;
            var info = angular.copy(vm.info);
            pinfo1.addpinfo(info);
            vm.dataArr = pinfo1.getpinfo();
            vm.addAlert();
        }

        


        function startButton(event) {
            
            window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
          let finalTranscript = '';
          let recognition = new window.SpeechRecognition();
          recognition.interimResults = true;
          recognition.maxAlternatives = 10;
          recognition.continuous = true;
      
          recognition.onstart = function(event) {
          console.log("record startred");
          };

          
      
          recognition.onresult = (event) => {
            let interimTranscript = '';
            for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
              let transcript = event.results[i][0].transcript;
              if (event.results[i].isFinal) {
                finalTranscript += transcript;
                vm.finalTranscriptAdded = finalTranscript;
                vm.loadDoc();
              } else {
                interimTranscript += transcript;
              }
            }
      
            
      
            document.getElementById("showresult").innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</>';
      
          }
      
      
          recognition.start();
         }

         function loadDoc() {
            // var xhttp = new XMLHttpRequest();
            // xhttp.open("GET", "testData.json", false);
            // xhttp.send();
            // document.getElementById("showresult").innerHTML = xhttp.responseText;
           
            $http.get('https://raw.githubusercontent.com/xsandips/chatbot_bank/master/banking.json').then(function(response){
               console.log(response.data.intents);

               vm.resultsfromBankJson = response.data.intents;
                
               console.log(vm.finalTranscriptAdded);

               angular.forEach(vm.resultsfromBankJson, function(item){
                if(item.intent.includes(vm.finalTranscriptAdded) || item.intent.toLowerCase() == vm.finalTranscriptAdded){
                    vm.matchResult = item;
                }
                
               });

               if(!vm.matchResult){
                angular.forEach(vm.resultsfromBankJson, function(item){
                    angular.forEach(item.examples, function(obj){
                        if(obj.text.includes(vm.finalTranscriptAdded) || obj.text.toLowerCase() == vm.finalTranscriptAdded){
                            vm.matchResultSpecific = obj;
                        }                
                       });                
                   });
               }else{
                angular.forEach(vm.matchResult.examples, function(item){
                    if(item.text.includes(vm.finalTranscriptAdded) || item.text.toLowerCase() == vm.finalTranscriptAdded){
                        vm.matchResultSpecific = item;
                    }                
                   });
               }


              

               if(!vm.matchResultSpecific){
                if(vm.matchResult){
                    vm.matchResultSpecific = vm.matchResult.examples[0];
                }else{
                    vm.resultsfromBankJson[0].examples[0].text = "try again"
                    vm.matchResultSpecific =vm.resultsfromBankJson[0].examples[0];
                }   
                
            }

               console.log(vm.matchResult);



               
              });


            }


           


        //   code for date picker
        vm.today = function () {
            vm.dt = new Date();
        };
        vm.today();

        vm.clear = function () {
            vm.dt = null;
        };

        // Disable weekend selection
        vm.disabled = function (date, mode) {
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };

        vm.toggleMin = function () {
            vm.minDate =vm.minDate ? null : new Date();
        };
        vm.toggleMin();

        vm.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.display.opened = true;
        };

        vm.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy'];
        vm.format = vm.formats[0];



        //function for adding alert on main form 
        vm.addAlert = function () {
            vm.alerts.push({ msg: 'Data Saved Successfully' });
        };

        vm.closeAlert = function (index) {
            vm.alerts.splice(index, 1);
        }; //end of alert function code 




        function deleteinfo(index) {
            vm.dataArr.splice(index, 1);
        }

    }




    //defining factory for personal information

    angular.module("app").factory("personalinfo", pinfo);

    pinfo.$inject = [];

    function pinfo() {
        var dataArr = [];

        return {
            addpinfo: _addpinfo,
            getpinfo: _getpinfo
        }


        function _addpinfo(info) {
            dataArr.push(info);
        }

        function _getpinfo() {
            return dataArr;
        }
    }


})();

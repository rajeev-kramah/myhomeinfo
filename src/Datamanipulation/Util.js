var commaNumber = require('comma-number')

const country = {
    "Canada" :{
        data : [
            "Alberta",
            "British Columbia",
            "Manitoba",
            "New Brunswick",
            "Newfoundland and Labrador",
            "Northwest Territories",
            "Nova Scotia",
            "Nunavut",
            "Ontario",
            "Prince Edward Island",
            "Quebec",
            "Saskatchewan",
            "Yukon",
        ],
        currency : "CAD"
    },
    
    "UK" : {
        data :[
            "Alabama",
            "Alaska",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware" 
        ],
        currency : "GBP"
    },

    "USA" : {
        data :[
            "Alabama",
            "Alaska",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "Florida"
        ],
        currency : "USD"
    }
    
}

 // Georgia
            // Hawaii
            // Idaho
            // Illinois
            // Indiana
            // Iowa
            // Kansas
            // Kentucky
            // Louisiana
            // Maine
            // Maryland
            // Massachusetts
            // Michigan
            // Minnesota
            // Mississippi
            // Missouri
            // Montana
            // Nebraska
            // Nevada
            // New Hampshire
            // New Jersey
            // New Mexico
            // New York
            // North Carolina
            // North Dakota
            // Ohio
            // Oklahoma
            // Oregon
            // Pennsylvania
            // Rhode Island
            // South Carolina
            // South Dakota
            // Tennessee
            // Texas
            // Utah
            // Vermont
            // Virginia
            // Washington
            // West Virginia
            // Wisconsin
            // Wyoming

export const Util = {
    countryDetails(){
        return country;
    },

	addCommas(nStr){
        nStr = nStr.toString()
        var data = nStr.split(",")
        data = data.join("")
        // const dec = data.split('.')[1]
        // const len = dec && dec.length > 2 ? dec.length : 2
        // data = Number(data).toFixed(len)
        nStr = data;
        var result1 = commaNumber(nStr)
        return result1;
    },

    addCommasList(nStr){
        nStr = nStr.toString()
        var data = nStr.split(",")
        data = data.join("")
        const dec = data.split('.')[1]
        const len = dec && dec.length > 2 ? dec.length : 2
        data = Number(data).toFixed(len)
        nStr = data;
        var result1 = commaNumber(nStr)
        return result1;
    },

    removeCommas(nStr){
        nStr = nStr.toString()
        var data = nStr.split(",") 
        data = data.join("")
        return data;
    },

    loanAmount(num1,num2){
        num1 = num1.split(",").join("");
        num2 = num2.split(",").join("");
        if(num1 && num2){
            var diff = num1-num2;
            var num3 = this.addCommas(diff.toString());
            return num3;
        }
    },

    rateOfInterest(num){
        var res = "0.000"
        num = num.split("%")[0];
        if(num){
            var x = num.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + (x[1].length > 3 ? x[1][0]+""+x[1][1]+x[1][2] : x[1]) : '.000';
            res = x1+x2;
        }
        return res+"%";
      
    },

    getCurrentDate(separator=''){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
    },

    getLoggedinUser() {
        let user = JSON.parse(localStorage.getItem('user'));
		return user; 
    },


    dateFormat(date){
        if(date == ""){
            return "";
        }
        const options = { day: 'numeric',  year: 'numeric', month: 'short' };
        let d1 = new Date(date).toLocaleDateString(undefined,options);
        let d2 = d1.split(" ");
        let result = d2[1].split(",")[0] + " "+ d2[0] +" "+ d2[2]
        return result;
    }
}
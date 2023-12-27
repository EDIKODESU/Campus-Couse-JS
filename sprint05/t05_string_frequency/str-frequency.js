module.exports = class StrFrequency {
   
    constructor(str){
        this.str = str;
    }

    letterFrequencies(){
        let str_up = this.str.toUpperCase();

        if(str_up == "") {
            return '';
        }    
        let obj = new Object;
        let k = 0;
        let regexp = RegExp(/[a-zA-Z]$/);
        for(let i = 0; i < str_up.length; i++){
            if(!regexp.test(str_up[i])){
                continue;
            }
            for(let j = 0; j < str_up.length; j++){
                if(str_up[i] == str_up[j])
                    k++;
            }
            obj[str_up[i]] = k;
            k = 0;
        }
        return obj;
    }

    wordFrequencies(){
        if(this.str == '') {
            return {'': 1};
        }    
        let strok = this.str.toUpperCase();
        let str_up;
        let obj = new Object;
        let k = 0;
        strok = strok.trim();
        let word = strok.split(" ");

        for(let i = 0; i < word.length; i++){
            if (!RegExp(/[A-Z\s]/).test(word[i]) || word[i] == ' ') {
                continue;
            }
            for(let j = 0; j < word.length; j++){
                if(word[i] == word[j])
                    k++;
            }
            obj[word[i]] = k;
            k = 0;
        }
        return obj;
    }
    reverseString(){
        return this.str.split("").reverse().join("");
    }
}

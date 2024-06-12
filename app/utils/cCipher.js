export function caesarCipher (str) {
    let solved = "";
        for(let i=0; i<str.length; i++ ){
            let asciNum = str[i].charCodeAt();
                if(asciNum >= 65 && asciNum <=77){
                    solved += String.fromCharCode(asciNum+13);
                }else if (asciNum>=78 && asciNum<= 90){
                    solved += String.fromCharCode(asciNum-13);
                }else{
                    solved += str[i]
                }
        }
        return solved;
}


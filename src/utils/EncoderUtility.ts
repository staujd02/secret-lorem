import TextManipulator from "./TextManipulator";

class EncoderUtility {

    randomLookUp(key: string){
        if(key === "01")
            return !!Math.floor(Math.random() * 2) ? 'o' : 'a'
        return this.lookUp[key];
    }
    
    lookUp: Record<string, string> = {
        '00': 'i',
        '01': 'o',
        '10': 'e',
        '11': 'u'
    }

    CountEncodingSpace(seed: string): number{
        return seed.split(" ")
                    .filter((w, i) => TextManipulator.isImportantWord(w, i))
                    .map(w => w.split(""))
                    .flat()
                    .filter(v => TextManipulator.isVowel(v))
                    .length;
    }

    EncodeMessage(message: string, seed: string): string{
        let vowelList = this.convertMessageToVowelString(message);
        let leftDataPad = (this.CountEncodingSpace(seed) - vowelList.length) / 2;
        leftDataPad = leftDataPad - (leftDataPad % 4)
        let skipCount = 0;
        let encodedMessage = seed.split(" ").map((word, i) => {
            if(TextManipulator.isImportantWord(word, i) && vowelList.length > 0){
                let newWord = word.split("").map(c => {
                    if(TextManipulator.isVowel(c) && vowelList.length > 0){
                        if(skipCount < leftDataPad){
                            skipCount += 1;
                            return c;
                        }
                        return vowelList.shift();
                    } else { return c; }
                });
                return newWord.join("");
            } else { return word; }
        });
        return encodedMessage.join(" ");
    }

    convertMessageToVowelString(message: string): string[] {
       let charArray = message.split("");
       let asciiArray = charArray.map(c => c.charCodeAt(0));
       let byteArray = asciiArray.map(a => TextManipulator.addZeroPad(a.toString(2), 8));
       let twoBitArray = byteArray.map(a => [a[0] + a[1], a[2] + a[3], a[4] + a[5], a[6] + a[7]])
       let flatArray = twoBitArray.flat();
       return flatArray.map(tb => this.lookUp[tb]);
    }
}

export default new EncoderUtility();
import TextManipulator from "./TextManipulator";

class DecoderUtility {

    lookUp: Record<string, number> = {
        i: 0,
        a: 1,
        o: 1,
        e: 2,
        u: 3
    }

    decode(c: string): number{
        return this.lookUp[c];
    }

    DecodeMessage(codedMessage: string){
        let v = TextManipulator.filterToImportantWords(codedMessage);
        let vowels = TextManipulator.everyVowelInWords(v);
        let ascii = this.ConvertVowelPairingsToBinary(vowels);
        return ascii.join(" ")
    }

    ConvertVowelPairingsToBinary(stringsOfVowels: string[]): string[] {
        let nestedList = stringsOfVowels.map(vowels => vowels.split(""));
        let flattenedList = nestedList.flat();
        let encodedList = flattenedList.map(c => this.decode(c));
        let twoBitList = encodedList.map(f => TextManipulator.addZeroPad(f.toString(2), 2));
        let byteList = twoBitList.map((v, i) => i % 4 === 0 ? twoBitList.slice(i, i + 4).join("") : "")
        byteList = byteList.filter(s => s !== "");
        let asciiList = byteList.map(b => String.fromCharCode(parseInt(b, 2)))
        return asciiList;
    }
}

export default new DecoderUtility();
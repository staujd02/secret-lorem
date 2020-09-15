class TextManipulator{

    isVowel(c: string){
        return c === "a" || c === "e" || c === "i" || c === "o" || c === "u";
    }
    
    everyVowelInWords(words: string[]): string[] {
        return words.map(w => this.everyVowelInWord(w));
    }
    
    everyVowelInWord(word: string): string {
        return word.split("")
                   .filter(c => this.isVowel(c))
                   .join("");
    }

    isImportantWord = (v: string, i: number): boolean => true

    filterToImportantWords(text: string): string[] {
        let words = text.split(' ');
        return words.filter((v, i) => this.isImportantWord(v, i));
    }
    
    stringToBinary = (str: string) =>
        str.replace(/[\s\S]/g, str => this.addZeroPad(
            this.convertUnicodeCharacterToBinary(str), 8
        ) + " ");

    convertUnicodeCharacterToBinary = (str: string) => str.charCodeAt(0).toString(2)
    

    addZeroPad(num: string, count: number): string {
        return "0".repeat(count).slice(String(num).length) + num;
    }
}

export default new TextManipulator();
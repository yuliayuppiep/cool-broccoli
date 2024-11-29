let fs = require('fs'); //для работы с файлами
let inText;

inText=fs.readFileSync('input.txt', 'utf8'); //синхронное чтение в переменную файла input.txt в кодировке utf8
inText=inText.toString(); //превращаем в строку

let len=inText.length; //ищем длину

//fs.writeFileSync('code.txt',''); //
let codedText='';   //закодированная строка

for (i=0; i<len; i++){
	let n=0;                //блок для подсчета длины цепочки повторяющихся элементов
	while (inText.charAt(i)==inText.charAt(i+n)){
		n++;		
	}
	console.log(inText.charAt(i),n);
	i+=n-1;  //n+i это первый неповторяющийся от i до i+n
	if (n>2){ //начиная с цепочки повторяющихся элментов длиной 3 применение RLE сжатия будет уменьшая или неувеличивать кол-во символов
		while (n>=255){ //от 0 до 255 различных символов можем написать
			codedText+=('code.txt', '#'+String.fromCharCode(255)+inText.charAt(i)); //пока можем вычесть 255, пишем блок(#255a) и вычитаем 255
			n-=255;
		}
        //String.fromCharCode(255) заменяет число на символ
		codedText+=('code.txt', '#'+String.fromCharCode(n)); //дописываем хвост меньше 255
	}
	if (n==2){ //если два символа, то пишем эти два символа
		codedText+=('code.txt', inText.charAt(i) + inText.charAt(i));
	}
    else{ //иначе остается вариант символ один
        codedText+=('code.txt', inText.charAt(i));
    }
}

fs.writeFileSync('code.txt', codedText); //запись в файл

//console.log(codedText);


//ДЕКОДИНГ
let codeText;
codeText=fs.readFileSync('code.txt', 'utf8'); //читыем файл
codeText=codeText.toString(); //делаем его строкой

len=codeText.length; //находим длину
fs.writeFileSync('decode.txt','');  
let decodedText = ""; //декодирванная строка

//блок декодирования
for(let i = 0; i < len; i++){
    let symbol = codeText.charAt(i); //iвый элемент строки
    if(symbol == "#"){// если символ является спец символом("#"), тогла следующий будет количеством повторов (repits в строке 53), а i+2 - сам повторяющийся сивол
        let repits = codeText.charCodeAt(i+1);
        for(let j = 0; j<repits;j++){//повторяем repits раз запись в строку повторяющегося символа
            decodedText+=codeText.charAt(i+2);
        }
        i+=2;//сдвиг на 2, т.к. i+1 и i+2 после спец символа уже обработаны
    }
    else{
        decodedText+=symbol; //иначе записываем символ
    }
}

console.log(inText == decodedText); // проверка на соответствие исходного текста и декодированного
fs.writeFileSync('decode.txt', decodedText);//записываем в файл результат декодирования



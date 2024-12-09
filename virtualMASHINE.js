const fs = require('fs')  //синтаксис регулярных выражений

const readlineSync = require('readline-sync'); //подключаем модуль readline-sync для синхронного чтения пользовательского ввода.

let mem = new Array(); //создаем пустой массив mem, который будет использоваться как память для программы

const prog = fs.readFileSync('./first.jpp', //Читаем содержимое файла first.jpp и записываем его в строку prog с помощью fs.readFileSync().
  {encoding: 'utf8', flag: 'r'});
  
mem = prog.split(/ |\r\n/); //Разделяем содержимое строки prog на элементы массива mem с помощью split по пробелам и символам новой строки
ip = 0;

 while (mem[ip]){
  switch (mem[ip]){
    case 'input':
    in_num = readlineSync.question("input number: \f"); //Запрос у пользователя ввода числа и сохранение его в переменную in_num
    mem[mem[ip+1]] = parseInt(in_num); //Запись в память по указанному адресу числового значения из ввода пользователя
      ip += 2 //Увеличение инструкционного указателя на 2 для перехода к следующей инструкции
      break;
    case 'jout':
      console.log('answer:\f',mem[mem[ip+1]]);
      ip += 2;
      break;
    case 'set':
      mem[mem[ip+1]] = parseInt(mem[ip+2]);
      ip += 3;
      break;
    case 'add':
      mem[mem[ip+3]]=mem[mem[ip+1]]+mem[mem[ip+2]]; 
      ip += 4;
      break; 
    case 'factorial':
      k1 = mem[mem[ip+1]];
      k = 1;
      while (k1 > 1){
        k *= k1;
        k1 = k1 - 1;
      }
      mem[mem[ip+2]] = k;
      ip += 3;
      break;
    case ('nod'):
      a = mem[mem[ip+1]];
      b = mem[mem[ip+2]];
      d = 1;
      for (let i = 1; i <= a; i++) {
        if (a % i === 0 && b % i === 0) {
        d = i;
        }
      }
      mem[mem[ip+3]] = d;
      ip += 4;
      break;
    case ('jmp'):
      jmp1 = parseInt(mem[mem[ip+1]]);
      jmp2 = parseInt(mem[mem[ip+2]]);
      l = parseInt(mem[ip+3]);
      if (jmp1 <= jmp2){
        ip = l;
      }
      else{
        ip += 4;
      }
      break;
  }
 }

 /*
 input 28
 input 29
 set 28 29 30
 add 28 29 30
 factorial 28 30
 nod 28 29 30
 jmp 28 29 0
 jout 30
 */

#!/bin/bash
echo "hello World";

vara='json';
echo $vara;
echo ${vara};

string1='i am a boy';
echo ${string1:1:4};

# string="runoob is a great company";
# echo `expr index ${string} is`;
array=(1 2 3 4);
echo ${array[1]};
echo ${array[@]};
echo "执行参数$1 $2 $3"

var2=`expr 2 + 2`;
echo ${var2};

read name;
echo "my name is $name";

cd '../';
cat ./package.json;
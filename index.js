let array1 = [{value:'alpha'}, {age: 13}] , array2 = [{value:'alpha'}, {age:13 }];

JSON.stringify(array1) // "[1,2,{"value":"alpha"}]"

JSON.stringify(array2) // "[{"value":"alpha"},"music",3,4]"


console.log(JSON.stringify(array1) === JSON.stringify(array2)); // false
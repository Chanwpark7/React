// double initX = 1.5;

// const double xOri = 0;
// const double yOri = 0;

// class Point {
// //   double? x = initX;
// //   //double? y = this.x; //에러. late 이 호출돼야 함.
// //   double? y;
// //   late double? z = this.x;
// //   var _priv;

// //   String _name;

// //   //생성자
// //   //Point(this.x, this.y);

// //   Point(this._name) {}

// //   String greet(String who) => 'Hello. $who, Im $_name.';
//   final double x;
//   final double y;

//   Point(this.x, this.y);

//   //Names 생성자
//   Point.origin()
//       : x = xOri,
//         y = yOri;
// }

// class Point2 {
// //   var p1 = Point(1, 2);
// //   void doSome() {
// //     print(p1._priv);
// //   }
// }

// void main() {
// //   record 타입 : 이 타입은 불변, 집계, 익명의 타입.
// //   컬렉션과 같이 여러 객체를 하나로 묶는 역할을 함.
// //   특이점은 크기가 고정적이고(사이즈 변경 불가),
// //   값의 타입이 틀려도 되는 특징이 있음.
// //   이는 변수에 저장되고, 중첩 가능하며(JSON처럼),
// //   함수의 파라미터나 list, map, set 등에도 저장이 가능함.

//   //일반적인 선언식
//   var record2 = ('일', a: 2, b: true, "사"); //괄호를 이용함.
//   var record = (2, 3);

//   print(record);
//   record = swap(record);
//   print(record);

// //   레코드의 다른 형식
// //   타입만 선언 후 대입하는 식
//   (String, int) rec1;
//   rec1 = ('Hello', 2);

//   //레코드에 변수를 지정해서 값 초기화
//   ({int a, bool b}) rec2;
//   rec2 = (a: 10, b: false);
//   print(rec2);

//   ({int a, int b}) rec3 = (a: 1, b: 2);
//   ({int x, int y}) rec4 = (x: 10, y: 20);

//   //rec3 = rec4;
//   //여기에서 타입이 같다고 해서 같은 레코드인건 아님
//   //다른 이름으로 명명된 필드가 있는 레코드는 서로 다름.

//   //위처럼 같은(동등)의 결과를 얻으려면 값 초기화시 변수를 제거해야 함.
//   (int a, int b) rec5 = (1, 2);
//   (int x, int y) rec6 = (1, 2);
//   assert(rec5 == rec6);

//   //레코드의 값 접근 $ 사용
//   //값을 접근할 때는 레코드 내부에 변수가 선언시엔 레코드.변수명
//   //없는 경우엔 $index 로 사용함.

//   var rec10 = ('first', a: 10, b: 20, true);

//   print(rec10.$1);
//   print(rec10.a);
//   print(rec10.$2);

//   (num, Object) pair = (3.14, swap);
//   print(pair);

//   //동등관계 : 필드의 값이 같으면 동등(값이 같다)라고 간주됨.
//   //필드의 순서는 영향을 미치지 않음
//   ({int x, int y, int z}) point = (x: 1, y: 2, z: 3); //좌표값1
//   ({int r, int g, int b}) color = (r: 1, g: 2, b: 3);

//   print(point == color);

//   //구조 분해 할당 : 레코드의 데이터를 구조분해해서 사용.

//   //멀티 value 리턴하는 함수 정의
//   (String name, int age) userInfo(Map<String, dynamic> json) {
//     return (json['name'] as String, json['age'] as int);
//   }

//   //json 데이터 정의
//   final json = <String, dynamic>{'name': '박찬우', 'age': 26, 'color': 'cyan'};

//   var (name, age) = userInfo(json);
//   print(name);

//   //dart 에서는 배열은 존재하지 않음.
//   //배열 표식자는 list 가 사용함. []

//   var list = [1, 2, '3'];

//   assert(list.length == 3);
//   assert(list[1] == 2);

//   //컴파일 시점의 상수로 리스트 지정하기.
//   var constList = const ['a', 'b', 'c'];
//   //constList[1] = 100;

//   //set
//   var sub = {'java', 'dart', 'react', 'java'};
//   assert(sub.length == 3);

//   var strSet = <String>{};
//   strSet.addAll(sub);

//   print(strSet);

//   //map : {} 사용해서 key:value, 로 값 표현

//   var gifts = const <String, String>{
//     'gift1': '바보',
//     'gift2': '재형',
//   };

//   print(gifts.values.first);

//   //spread 연산자
//   var list1 = <int>[1, 2, 3];
//   var list2 = [0, ...list1];
//   print(list2);

//   list = [];

//   list2 = [0, ...?list1]; //null예외 발생 처리

//   print(list2);

//   //필요하다면 컬렉션 내부의 값에 로직을 추가해서 사용할 수 있음.

//   var listInts = [1, 2, 3];
//   var listStrs = ['#0', for (var i in listInts) '#$i'];

//   print(listStrs);

// //   var p = Point(1, 2);

// //   print(p._priv);
// }

// (int, int) swap((int, int) record) {
//   var (a, b) = record;
//   return (b, a);
// }

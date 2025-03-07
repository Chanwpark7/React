// void main() {
//   //DART 의 엔트리 메소드. 모두 여기서 시작돼야 함.

//   /*
//    * 변수의 타입은 모바일에서 실행돼야하기 때문에 자바처럼 세부적으로 구성되지 않음.
//    * String, num(int, double), bool, 함수객체(일급객체), 일반객체 등으로 이뤄짐.
//    * 
//    * 변수에 대해서 : 다트는 초기엔 타입을 지정해서 선언하도록 했지만, 업버전 후엔
//    * 즉, 현재 지점에는 추론타입을 사용하도록 권장함.
//    * 
//    * 추론 타입이란, 변수 선언시 타입 지칭을 var 로 설정후에 값이 초기화 되는
//    * 시점에 타입을 자동지정하도록 하는 타입을 말함.
//    * 
//    * 즉 var 라는 타입을 추가해서 변수 타입의 유동성을 제공함.
//    */

//   var name;
//   print(name);

//   Object n2 = "lol";
//   print(n2);

//   String n3;

//   //assert(조건) : 이 함수는 디버그시에만 사용함.
//   //이 함수는 내부의 조건식결과가 false 시에만 예외를 발생시킴.
//   // 디버그 할 때 값등을 조회시에 매우 유용함.
//   //다른 언어를 사용시엔 값을 출력물에 일일이 쳐서 검증했지만
//   //assert 를 이용하면 더 편리함.
//   assert(myNm == null);

//   line = 3;
//   assert(line == 3);

//   //int, double 모두 64bit 체계.
//   //이 둘은 num 타입 객체와 하우로 구성됨.
//   //즉 상위 캐스팅 가능함.
//   //하위 캐스팅도 가능하지만 실수에서 정수는 불가.

//   var x = 1;
//   var hex = 0xADBCD11;
//   var t = 1.1;
//   print(x);
//   print(hex);
//   num n = x;
//   num m = t;

//   n.toDouble;

//   var one = int.parse("1");
//   assert(one == 1);

//   var pi = double.parse("3.14");
//   assert(pi == 3.14);

//   //리터럴은 자체로 객체로 wrapping 되는 특징이 있음.
//   //따라서 수치형 리터럴에서 메소드 호출 가능함.

//   var i1 = 1.toString();

//   //const 는 상수의 개념을 갖는데 이 값이 정해지는 시점은 컴파일시임.
//   //final 또한 상수의 개념을 갖는데 이값은 실행시에 정해짐.
//   //즉 객체 발생시라고 생각하면 편함.

//   const c1 = 1;

//   //_ 사용.. 큰수를 구분자로 사용시에 유용함.
//   // 수의 값 중 ',' 영역에 _ 를 사용하면 분석시 유리함.

//   var nn = 1_000_000;
//   print(nn);

//   //문자열 : '' or "" 모두 사용가능
//   //권장은 ''임.
//   //''' ''' or """ """ 도 있음.
//   //위 3개짜리는 라인 개햄을 모두 포함해서 문자열화 함.
//   //주로 JSON 표현을 할때 사용.
//   var s1 = "ABCDEF";
//   var s2 = "GHIJKL";
//   var s3 = 'NMOPQR';

//   var msg = "문자열 표현 법(Exp) : ";
//   //$ 표식자를 이용해서 문자열 내에 변수를 삽입하거나
//   //${표현식(연산이나 객체 메소드 호출 등)}을 사용할 수 있음.

//   assert('$msg입니다' == '문자열 표현 법 : 입니다');
//   assert('${msg.toLowerCase()}입니다' == '문자열 표현 법(exp) : 입니다');

//   var warning = '''이제 그만 자라
//   아까 잤잖아''';

//   //참고로 문자열은 UTF-16(4byte)
// }

// String? myNm;
// var myNm2;
// late int line; //나중에 값초기화 선언.
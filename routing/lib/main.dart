import 'package:flutter/material.dart';
/*
  1. 화면 이동하느 방벙 알아보기(Navigator)
  2. 이전 화면으로 돌아가기
  3. 화면간 데이터 전달
  4. 상태 위젯 클래스의 Life Cycle 메서드(initState(), dispost())
*/

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Hello World",
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: FirstPage(), //첫 페이지를 홈으로 지정.

      routes: {
        '/first': (context) => FirstPage(),
        '/second': (context) => SecondPage(info: Info('info1', 'info2'))
      },
    );
  }
}

class Info {
  String info1;
  String info2;

  Info(this.info1, this.info2);
}

class FirstPage extends StatefulWidget {
  const FirstPage({super.key});

  @override
  State<FirstPage> createState() => _FirstPageState();
}

class _FirstPageState extends State<FirstPage> {
  @override
  void initState() {
    //네트워크 연결이나 초기화 작업이 필요할 때 여기에 정의
    super.initState();

    print("this is first init");
  }

  @override
  void dispose() {
    super.dispose();
    //위에서 집은 리소스를 불러옴
    print("this is first dispose");
  }

  @override
  Widget build(BuildContext context) {
    print('first page called');
    //애를 import 하는 애가 Material의 home으로 이넘을 사용하니깐, Scafold로 정의함.

    //Future 객체.. 이 객체는 비동기 통신을 할때 사용되는 대표적 객체임.
    //Future<Type>을 이용하면, 제네릭을 이용해서 값을 저장할 수 있는데,
    //기본적으로는 문자열임.

    //Future는 미래라는 뜻으로 complete, uncomplete 두개의 상태를 가짐.
    //말 그대로 비동기 데이터가 처리되었는지의 여부를 나타냄.

    //모든 비동기는 이 객체를 리턴하도록 되어있음.

    //비동기 처리를 할때는 async await을 이용해서 처리함.

    //예를 들어 아래의 first에 비동기로 info를 넘겨주고,
    //자신이 push를 호출한다면, 이 페이지는 종료가 아닌 상태 대기로 빠지게 되어
    //second 페이지가 종료가 되면, 리턴되는 데이터를 다시 받아서 처리할 수 있는 상태가 됨.
    //만약 이 비동기 패턴을 이용하지 않게되면, 데이터의 일관성은 유지될 수 없음.
    return Scaffold(
      appBar: AppBar(
        title: Text("First Page 입니다"),
      ),
      body: ElevatedButton(
          onPressed: () async {
            final info = Info("재형", "바보");
            //가장 간단한 페이지 이동은 Navigation클래스의 push()를 이용해서 페이지를 이동함
            //이 메서드를 이용하면, 이동된 페이지에는 자동으로 이전이 등록 되어 이전이라는 버튼이 leading(Appbar위치)에 생성됨
            //파라미터로는 context와 Material 디자인간의 페이지 이동을 해주도록 하는 MaterialRoute라는
            //instance가 필요함.
            //보통은 람다로 (context) => 페이지명()으로 처리함

            //routes 를 이용한 navigation
            final res = await Navigator.pushNamed(context, '/second');
            // final res = await Navigator.push(
            //     context,
            //     MaterialPageRoute(
            //         builder: (context) => SecondPage(info: info)));
            print('second Page로 리턴 결과 : $res');
          },
          child: Text("다음 페이지로...")),
    );
  }
}

class SecondPage extends StatefulWidget {
  const SecondPage({super.key, required this.info});

  final Info info;

  @override
  State<SecondPage> createState() => _SecondPageState();
}

class _SecondPageState extends State<SecondPage> {
  @override
  Widget build(BuildContext context) {
    print('second page called');
    //애를 import 하는 애가 Material의 home으로 이넘을 사용하니깐, Scafold로 정의함.
    return Scaffold(
      appBar: AppBar(
        title: Text("Second Page 입니다"),
      ),
      body: ElevatedButton(
          onPressed: () {
            Navigator.pop(context, 'hello world');
          },
          child: Text("이전 페이지로...${widget.info}")),
    );
  }
}

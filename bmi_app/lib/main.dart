import 'package:flutter/material.dart';

/*
  이 앱에서는 Form 데이터를 관리하는 방법을 배움.
  이 폼을 객체화 해서 서버와 주고받고 해서 모바일앱을 구현하는데 도움이 됨.
*/
void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'BMI',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: BmiMain(),
    );
  }
}

class BmiMain extends StatefulWidget {
  const BmiMain({super.key});

  @override
  State<BmiMain> createState() => _BmiMainState();
}

class _BmiMainState extends State<BmiMain> {
  //form 내부의 입력 필드의 상태관리를 하기 위해서는 formKey 라는 것이 필요.
  //이 놈을 GlobalKey(formState) 를 이용하면 validation 을 자동화할 수 있음.

  final _formKey = GlobalKey<FormState>(); //폼 데이터 상태 관리 키 지정

  //각 입력 필드에는 이에 상응하는 상태관리자인 ???controller 라는 놈이 있음.
  //이 놈이 하는 일은 입력값에 대해서 그 값을 속성(ex. html 의 innterHTML or value 처럼)을 이용해서
  //값을 get 할 수 있음. 무조건 사용하도록 함. 그래야 내가 편함.

  //조건...이 컨트롤러는 반드시 dispose()를 오버라이드 해줘서 자원을 해제해줘야 함.
  //각 입력필드에 컨트롤러 연결.

  final TextEditingController _tallController = TextEditingController();
  final TextEditingController _weightController = TextEditingController();

  @override
  void dispose() {
    _tallController.dispose();
    _weightController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('비만도 계산기'),
        ),
        body: Container(
          padding: const EdgeInsets.all(16),
          child: Form(
            //Form 위젯으로 전체 input field 를 감쌈. 이때 사용되는 input 들은 이름중에 ...form...이 들어감
            //이 폼을 validation 하겠다는 의미로 key 설정.
            key: _formKey,
            //inputs 를 컬럼으로 배치
            child: Column(
              children: [
                TextFormField(
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    hintText: 'Tall',
                  ),
                  controller: _tallController,
                  //키보드의 입력 타입을 지정함.
                  keyboardType: TextInputType.number,
                  //일반 input 필드가 아닌 form 필드를 사용할때만 다음과 같은 속성이 제공됨
                  validator: (String? inputVal) {
                    if (inputVal!.trim().isEmpty) {
                      return '키를 입력해';
                    }
                    return null;
                  },
                ),
                SizedBox(
                  height: 16,
                ),
                TextFormField(
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    hintText: 'Weight',
                  ),
                  controller: _weightController,
                  //키보드의 입력 타입을 지정함.
                  keyboardType: TextInputType.number,
                  validator: (String? inputVal) {
                    if (inputVal!.trim().isEmpty) {
                      return '체중을 입력해';
                    }
                    return null;
                  },
                ),
                Container(
                  margin: EdgeInsets.only(top: 16),
                  alignment: Alignment.centerRight,
                  child: ElevatedButton(
                      onPressed: () {
                        //이벤트시 등록된 폼키의 validation() 을 이용해서 검증 가능
                        //검증로직은 따로 작성.
                        if (_formKey.currentState!.validate()) {
                          //검증로직을 작성했다면 버튼 클릭시 위 메소드를 통해 현재 form 내의 모든 요소의
                          //오류 검증 로직 결과를 bool 로 리턴함.
                          //만약 false 가 리턴되면 자동으로 입력 폼에서 검증로직 처리한 에러 메시지가 표현됨.

                          //만약 모두 문제가 없다면 결과 화면으로 데이터를 넘겨주고 push 해줌.
                          Navigator.push<dynamic>(
                            context,
                            MaterialPageRoute<dynamic>(
                                builder: (BuildContext context) => BmiResult(
                                      height: double.parse(
                                          _tallController.text.trim()),
                                      weight: double.parse(
                                          _weightController.text.trim()),
                                    )),
                          );
                        }
                      },
                      child: Text('결과 확인')),
                )
              ],
            ),
          ),
        ));
  }
}

class BmiResult extends StatelessWidget {
  const BmiResult({required this.height, required this.weight, super.key});

  final double height;
  final double weight;

  //결과지수에 따른 결과 문자열 리턴 메소드 정의
  String _calcBmi(double bmi) {
    var res = "저체중";
    if (bmi >= 35) {
      res = '고도 비만';
    } else if (bmi >= 25) {
      res = '2단계 비만';
    } else if (bmi >= 25) {
      res = '3단계 비만';
    } else if (bmi >= 23) {
      res = '과체중';
    } else {
      res = '정상';
    }
    return res;
  }

  //Icon 위젯 리턴하도록 메소드 정의
  Widget _buildIcon(double bmi) {
    if (bmi >= 23) {
      return Icon(
        Icons.sentiment_very_dissatisfied,
        color: Colors.red,
        size: 100,
      );
    } else if (bmi <= 18.5) {
      return Icon(
        Icons.sentiment_satisfied,
        color: Colors.green,
        size: 100,
      );
    } else {
      return Icon(
        Icons.sentiment_neutral,
        color: Colors.orange,
        size: 100,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    //비만도 연산식
    final double bmi = weight / ((height / 100) * (height / 100));

    return Scaffold(
      appBar: AppBar(
        title: Text('비만도 계산'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              _calcBmi(bmi),
              style: TextStyle(fontSize: 40),
            ),
            SizedBox(
              height: 16,
            ),
            _buildIcon(bmi),
          ],
        ),
      ),
    );
  }
}

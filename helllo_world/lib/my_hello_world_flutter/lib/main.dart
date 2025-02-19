import 'package:english_words/english_words.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => MyAppState(),
      child: MaterialApp(
        title: 'Jacklin Babo',
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(
            seedColor: Colors.deepOrange,
          ),
        ),
        //실제 구성될 App의 body widget 객체를 호출.
        home: MyHomePage(),
      ),
    );
  }
}

class MyAppState extends ChangeNotifier {
  //현재 생성된 랜덤한 영문자를 생성하기.
  var current = WordPair.random();

  //메소드를 추가해서 상태관리를 집중화.
  void getNext() {
    current = WordPair.random();
    notifyListeners();
  }

  //Like 선택된 단어셋 저장 로직 추가
  var favorites = [];

  void toggleFavorite() {
    if (favorites.contains(current)) {
      favorites.remove(current);
    } else {
      favorites.add(current);
    }

    //저장 또는 삭제가 되었으니 상태가 변경되었음을 다시 알림
    notifyListeners();
  }
}

//무상태 위젯을 상속받아서 body 위젯을 구현.
class MyHomePage extends StatefulWidget {
  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  //어떤 버튼을 클릭했는지 상태 값 변수 선언
  var selectedIndex = 0;
  @override
  Widget build(BuildContext context) {
    // var appState = context.watch<MyAppState>();
    // var pair = appState.current;
    // IconData icon;
    // if (appState.favorites.contains(pair)) {
    //   icon = Icons.favorite;
    // } else {
    //   icon = Icons.favorite_border;
    // }

    Widget page; //선택에 따라서 리턴될 페이지 변수 선언
    switch (selectedIndex) {
      case 0:
        page = GeneratorPage();
        break;
      case 1:
        page = FavoritesPage();
        break;
      default:
        throw UnimplementedError("$selectedIndex 에 해당하는 위젯 없음");
    }

    return LayoutBuilder(builder: (context, constraints) {
      return Scaffold(
          body: Row(
        children: [
          //위젯이 노치나, 상단 상태바를 침범하지 않도록 위젯 생성.
          SafeArea(
              child: NavigationRail(
            destinations: [
              NavigationRailDestination(
                  icon: Icon(Icons.home), label: Text('Home')),
              NavigationRailDestination(
                  icon: Icon(Icons.favorite), label: Text('Favorites'))
            ],
            selectedIndex: selectedIndex,
            extended:
                constraints.maxWidth >= 600, //아이콘 버튼 옆에 라벨이 존재 시 보일지 여부를 결정함.
            onDestinationSelected: (value) => {
              //상태 변경 메서드인 setState 을 이용해서 상태를 관리함.
              setState(() {
                selectedIndex = value;
              })
            },
          )),
          Expanded(
              //이 위젯은 일명 탐욕위젯 이라고 하는 공간을 점유하는 위젯임.
              //이걸 사용하면 일부 하위 요소는 필요한 만큼만 공간을 차지하고 (여기서는 NavigationRail)
              //다른 위젯은 남은 공간을 최대한 차지하도록 함(Expanded).
              child: Container(
                  color: Theme.of(context).colorScheme.primaryContainer,
                  child: page))
        ],
      ));
    });
  }
}

//랜덤 영문자 생성 버튼과 like, next, 생성된 영문을 출력하는 Widget을 리턴하도록 클래스 정의
class GeneratorPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var appState = context.watch<MyAppState>();
    var pair = appState.current;

    IconData icon;
    if (appState.favorites.contains(pair)) {
      icon = Icons.favorite;
    } else {
      icon = Icons.favorite_border;
    }

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          BigCard(pair: pair),
          SizedBox(
            height: 40,
          ),
          //버튼 추가
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            mainAxisSize: MainAxisSize.min,
            children: [
              ElevatedButton.icon(
                onPressed: () {
                  //print("어딜 누르는 거얏!");
                  appState.toggleFavorite();
                },
                label: Text("Like"),
                icon: Icon(icon),
              ),
              SizedBox(
                width: 20,
              ),
              ElevatedButton(
                onPressed: () {
                  //print("어딜 누르는 거얏!");
                  appState.getNext();
                },
                child: Text("Next>>"),
              ),
            ],
          )
        ],
      ),
    );
  }
}

//Favotites page 작성
class FavoritesPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var appState = context.watch<MyAppState>();
    var pair = appState.favorites.first;

    if (appState.favorites.isEmpty) {
      return Center(
        child: Text("Empty"),
      );
    }
    IconData icon;
    if (appState.favorites.contains(pair)) {
      icon = Icons.favorite;
    } else {
      icon = Icons.favorite_border;
    }

    return Center(
      child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        Text('좋아요 리스트(${appState.favorites.length})'),
        for (var pair in appState.favorites)
          ListTile(
            leading: Icon(Icons.favorite),
            title: Text(pair.toString()),
          )
      ]),
    );
  }
}

class BigCard extends StatelessWidget {
  const BigCard({
    super.key,
    required this.pair,
  });

  final WordPair pair;

  @override
  Widget build(BuildContext context) {
    //SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
    //카드 꾸미기
    final theme = Theme.of(context);

    //카드 스타일 정의
    final style = theme.textTheme.displayMedium!
        .copyWith(color: theme.colorScheme.onPrimary);
    //textTheme 을 통해 앱의 글꼴 테마에 접근
    //이 클래스에는 몇종류의 상수 지정 글꼴등이 있음.

    return Card(
      color: theme.colorScheme.primary,
      child: Padding(
        padding: const EdgeInsets.all(80.0),
        child: Text(
          pair.asCamelCase,
          style: style,
        ),
      ),
    );
  }
}

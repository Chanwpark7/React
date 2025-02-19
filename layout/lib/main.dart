import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';

final dummyImgs = [
  'https://cocotimes.kr/data/photos/uploads/sites/2/2019/11/%EB%85%B8%EB%A5%B4%EC%9B%A8%EC%9D%B4-%EC%88%B2-%EA%B3%A0%EC%96%91%EC%9D%B4.jpg',
  'https://i.namu.wiki/i/QL6AQRTqbNilgqXgXK59kLnm1bltdk_RboyhbhFiu0k4Meqxk7lubsDjr5XTIuJQgaLIDfuWokPhax9W6JY5lw.webp',
  'https://mblogthumb-phinf.pstatic.net/MjAyMTA5MjdfNTAg/MDAxNjMyNzE1MDU5NjQz.QJihlbzFIuD_YQ_clr2NzX3q3C_hLmgIm2OGQvcm-40g.rPLUlDM065xPdiN2rsCh9CdIKNvXm59itiZU1qs2D98g.PNG.withwithpet/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2021-09-27_%EC%98%A4%ED%9B%84_12.57.14.png?type=w800',
  'https://img8.yna.co.kr/etc/inner/KR/2016/08/06/AKR20160806023500004_01_i_P4.jpg',
];

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: "Layout",
        theme: ThemeData(
          primarySwatch: Colors.amber,
        ),
        home: MyHomePage());
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  var _index = 0;
  var _pages = [
    Page1(),
    Page2(),
    Page3(),
  ];
  @override
  Widget build(BuildContext context) {
    //BottomNavigationBar : Scaffold 가 갖고 있는 속성 중 하나.
    //Material 이 가진 속성 중 상단 App bar 를 설정하는 속성이 있다면 하단의 메뉴를 구성하는 속성을 이 객체가 갖고 있음.
    //아이콘등르 이용해서 구성.
    //각 아이콘 별로 선택된 선택된 상황은 steState() 을 통해서 선택된 index(IconId)을 binding 처리.
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.deepOrange,
        title: Text("layout 구성"),
        actions: <Widget>[
          IconButton(
              onPressed: () {},
              icon: Icon(
                Icons.add,
                color: Colors.black,
              ))
        ],
        centerTitle: true,
      ),
      body: _pages[_index],
      // Center(
      //   child: Text(
      //     '$_index 페이지',
      //     style: TextStyle(color: Colors.black, fontSize: 60),
      //   ),
      // ),
      bottomNavigationBar: BottomNavigationBar(
        onTap: (index) {
          setState(() {
            _index = index;
          });
        },
        currentIndex: _index,
        items: <BottomNavigationBarItem>[
          BottomNavigationBarItem(icon: Icon(Icons.home), label: "home"),
          BottomNavigationBarItem(
              icon: Icon(Icons.favorite), label: "favorite"),
          BottomNavigationBarItem(icon: Icon(Icons.face), label: "face")
        ],
      ),
    );
  }
}

class Page1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        _buildTop(),
        _buildMiddle(),
        _buildBottom(),
      ],
    );
  }

  Widget _buildTop() {
    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Column(
                children: [
                  Icon(
                    Icons.local_airport,
                    size: 50,
                  ),
                  Text('공항')
                ],
              ),
              Column(
                children: [
                  Icon(
                    Icons.local_airport,
                    size: 50,
                  ),
                  Text('공항')
                ],
              ),
              Column(
                children: [
                  Icon(
                    Icons.local_airport,
                    size: 50,
                  ),
                  Text('공항')
                ],
              ),
              Column(
                children: [
                  Icon(
                    Icons.local_airport,
                    size: 50,
                  ),
                  Text('공항')
                ],
              ),
            ],
          ),
          SizedBox(
            height: 80,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Column(
                children: [
                  Icon(
                    Icons.local_airport,
                    size: 50,
                  ),
                  Text('공항')
                ],
              ),
              Column(
                children: [
                  Icon(
                    Icons.local_airport,
                    size: 50,
                  ),
                  Text('공항')
                ],
              ),
              GestureDetector(
                onTap: () => print("clicked"),
                child: Column(
                  children: [
                    Icon(
                      Icons.local_airport,
                      size: 50,
                    ),
                    Text('공항')
                  ],
                ),
              ),
              Opacity(
                opacity: 0.5,
                child: Column(
                  children: [
                    Icon(
                      Icons.local_airport,
                      size: 50,
                    ),
                    Text('공항')
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildMiddle() {
    return CarouselSlider(
      items: dummyImgs.map((url) {
        return Builder(builder: (BuildContext context) {
          return Container(
            width: MediaQuery.of(context).size.width,
            margin: EdgeInsets.symmetric(horizontal: 5.0),
            decoration: BoxDecoration(color: Colors.amber),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(3.0),
              child: Image.network(
                url,
                fit: BoxFit.cover,
              ),
            ),
          );
        });
      }).toList(),
      options: CarouselOptions(height: 500, autoPlay: true),
    );
  }

  Widget _buildBottom() {
    final items = List.generate(10, (i) {
      return ListTile(
        leading: Icon(Icons.notification_add),
        title: Text('additional announcement'),
      );
    });
    return ListView(
      physics: NeverScrollableScrollPhysics(),
      shrinkWrap: true,
      children: items,
    );
  }
}

class Page2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _buildTop(),
        _buildMiddle(),
        _buildBottom(),
      ],
    );
  }

  Widget _buildTop() {
    return Text('top');
  }

  Widget _buildMiddle() {
    return Text('middle');
  }

  Widget _buildBottom() {
    return Text('bottom');
  }
}

class Page3 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _buildTop(),
        _buildMiddle(),
        _buildBottom(),
      ],
    );
  }

  Widget _buildTop() {
    return Text('top');
  }

  Widget _buildMiddle() {
    return CarouselSlider(
      items: [1, 2, 3, 4, 5].map((i) {
        return Builder(builder: (BuildContext context) {
          return Container(
            width: MediaQuery.of(context).size.width,
            margin: EdgeInsets.symmetric(horizontal: 5.0),
            decoration: BoxDecoration(color: Colors.amber),
            child: Text(
              'text $i',
              style: TextStyle(fontSize: 20),
            ),
          );
        });
      }).toList(),
      options: CarouselOptions(height: 500),
    );
  }

  Widget _buildBottom() {
    return Text('bottom');
  }
}

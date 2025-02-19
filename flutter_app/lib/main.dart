import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_app/usePostRepo.dart';

void main() async {
  runApp(MyWidget());
}

class MyWidget extends StatelessWidget {
  const MyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "http 통신",
      home: MyHttpApp(),
    );
  }
}

class MyHttpApp extends StatelessWidget {
  const MyHttpApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("서버통신"),
      ),
      body: Column(
        children: [
          FutureBuilder(
              //future: Usepostrepo().FindById(1),
              future: UsePostRepo().FindByIdMap(100),
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  JsonParser jsonParser = snapshot.data!;
                  return Center(
                    child: Text(
                      '${jsonParser.title}',
                      style: TextStyle(fontSize: 30),
                    ),
                  );
                } else {
                  // return Text("응 없어~");
                  return CircularProgressIndicator();
                }
              }),
          Expanded(
              child: FutureBuilder(
                  future: UsePostRepo().FindAll(),
                  builder: (context, snapshot) {
                    if (snapshot.hasData) {
                      List<JsonParser> parsingList = snapshot.data!;

                      return ListView.separated(
                        itemCount: parsingList.length,
                        separatorBuilder: (context, index) {
                          return Divider(
                            color: Colors.blue,
                            height: 10,
                            thickness: 1,
                          );
                        },
                        itemBuilder: (context, index) {
                          return ListTile(
                            leading: Icon(Icons.ac_unit_outlined),
                            title: Text('${parsingList[index].title}'),
                            subtitle: Text('${parsingList[index].body}'),
                          );
                        },
                      );
                    } else {
                      return CircularProgressIndicator();
                    }
                  }))
        ],
      ),
    );
  }
}

//통신 모듈의 메소드를 호출해서 테스트하도록 정의

Future<void> findById_test() async {
  int id = 1;

  UsePostRepo usePostRepo = UsePostRepo();
  await usePostRepo.FindById(id);
}

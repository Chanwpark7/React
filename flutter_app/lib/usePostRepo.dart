//서버에 요청을 전달하는 기능을 정의함.
import 'package:dio/dio.dart';

//싱글톤을 이용한 JSON 파서 클래스 정의
//방식은 생성자의 콜백 함수로 정의하는 방법 ex)생성자.fromJSON(){} 을 가장 많이 사용함.

class JsonParser {
  final int userId;
  final int id;
  final String title;
  final String body;

  JsonParser(
      {required this.userId,
      required this.id,
      required this.title,
      required this.body});

  //싱글톤 정의. 이 메서드는 JSON으로 온 데이터를 파싱해서 value를 리턴하도록 정의
  factory JsonParser.fromJson(Map<String, dynamic> json) => JsonParser(
      userId: json['userId'],
      id: json['id'],
      title: json['title'],
      body: json['body']);

  //이번엔 json 객체로 생성하는 메서드 정의
  Map<String, dynamic> toJson() => {
        "userId": userId,
        "id": id,
        "title": title,
        "body": body,
      };
}

//사용방법은 매우 간단.
//Dio 객체 생성 --> 인스턴스를 이용한 http 메소드 이용

class UsePostRepo {
  final dio = Dio();

  Future<JsonParser> FindById(int id) async {
    Response res =
        await dio.get('https://jsonplaceholder.typicode.com/posts/$id');
    //print(res.data);
    Map<String, dynamic> mapRes = res.data;

    JsonParser jsonParser = JsonParser.fromJson(mapRes);
    return jsonParser;
  }

  Future<JsonParser> FindByIdMap(int id) async {
    Response res =
        await dio.get('https://jsonplaceholder.typicode.com/posts/$id');
    Map<String, dynamic> mapResp = res.data;

    //JSON 파서를 통한 JSON 파싱
    JsonParser parser = JsonParser.fromJson(mapResp);
    //print(parser.toString());
    return parser;
  }

  Future<List<JsonParser>> FindAll() async {
    Response res = await dio.get('https://jsonplaceholder.typicode.com/posts');
    //print(res.data);
    List<dynamic> resBody = res.data;

    List<JsonParser> parserList =
        resBody.map((element) => JsonParser.fromJson(element)).toList();
    return parserList;
  }
}

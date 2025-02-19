//JSON 데이터를 정의한 데이터 파일.
//이 파일은 main 에서 가져와 파싱 후 랜더링 하는 앱을 구성합니다.

import 'dart:convert';

class Document {
  final Map<String, Object?> _json; //private 으로 선언
  //생성자를 통해 변수 초기화
  Document() : _json = jsonDecode(documentJson);

  //JSON 의 메타 정보 getter 정의
  (String, {DateTime modified}) getMetadata() {
    // var title = "My document";
    // var now = DateTime.now();

    // return (title, modified: now); //레코드 구성
    //레코드는 괄호로 묶여있고 각 타입은 ","로 구분
    //필드 각각은 다른 타입이 될 수 있으며, 여러 유형을 정의 가능함.
    //함수에서 주고 받을 때 레코드 타입도 파라미터 타입이 될 수 있으며
    //네임드 필드와 위치가 지정된 필드를 모두 포함 가능함.
    //레코드를 리턴하는 함수(메소드)는 반드시 레코드로 받아야함.

    //dart 를 이용한 JSON 파싱 구현
    //   if (_json.containsKey('metadata')) {
    //     var metadataJson = _json['metadata'];

    //     //print(metadataJson is Map);
    //     if (metadataJson is Map) {
    //       var title = metadataJson['title'];
    //       var localModified = DateTime.parse(metadataJson['modified'] as String);

    //       return (title, modified: localModified);
    //     }
    //   }
    //   throw const FormatException('JSON parsing error');
    // }

    if (_json
        case {
          'metadata': {'title': String title, 'modified': String localModified}
        }) {
      return (title, modified: DateTime.parse(localModified));
    } else {
      throw const FormatException('JSON parsing error');
    }
  } //end of metadata

  //json body(block) 리턴 메소드 정의
  List<Block> getBlocks() {
    if (_json case {'blocks': List blockJson}) {
      return <Block>[
        for (var blockJson in blockJson) Block.fromJson(blockJson)
      ];
    } else {
      throw const FormatException('JSON parsing error');
    }
  }
}

//Block의 내용을 파싱하는 클래스 정의
class Block {
  final String type;
  final String text;

  Block(this.type, this.text);

  //Dart 의 싱글톤 패턴을 적용시키는 키워드 factory.
  factory Block.fromJson(Map<String, dynamic> json) {
    if (json case {'type': var type, 'text': var text}) {
      return Block(type, text);
    } else {
      throw const FormatException('JSON parsing error');
    }
  }
}

const documentJson = '''
{
  "metadata":{
    "title":"My Document",
    "modified":"2025-02-12"
  },
  "blocks":[
    {
      "type":"hi",
      "text":"Hello There"
    },
    {
      "type":"p",
      "text":"Loram ipsum"
    },
    {
      "type":"checkbox",
      "checked":false,
      "text":"This is Flutter Power"
    }
  ]
}
''';

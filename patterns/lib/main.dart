import 'package:flutter/material.dart';
import 'package:patterns/data.dart';

void main() {
  runApp(const DocumentApp());
}

class DocumentApp extends StatelessWidget {
  const DocumentApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(useMaterial3: true),
      home: DocumentScreen(document: Document()),
    );
  }
}

class DocumentScreen extends StatelessWidget {
  final Document document;

  const DocumentScreen({
    required this.document,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    var (title, :modified) = document.getMetadata();
    var blocks = document.getBlocks();
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: Column(
        children: [
          Text('Last Modified : $modified'),
          Expanded(
              child: ListView.builder(
            itemCount: blocks.length,
            itemBuilder: (context, index) {
              return BlockWidget(block: blocks[index]);
            },
          ))
        ],
      ),
    );
  }
}

//JSON 의 BLOCK 내용을 랜더링하는 위젯 구현
class BlockWidget extends StatelessWidget {
  final Block block;

  const BlockWidget({required this.block, super.key});

  @override
  Widget build(BuildContext context) {
    TextStyle? textStyle;

    switch (block.type) {
      case 'h1':
        textStyle = Theme.of(context).textTheme.displayMedium;
        break;
      case 'p' || 'checkbox':
        textStyle = Theme.of(context).textTheme.bodyMedium;
      case _:
        textStyle = Theme.of(context).textTheme.bodySmall;
    }

    return Container(
      margin: const EdgeInsets.all(20),
      child: Text(
        block.text,
        style: textStyle,
      ),
    );
  }
}

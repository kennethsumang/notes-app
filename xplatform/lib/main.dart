import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:xplatform/pages/homepage.dart';

void main() {
  runApp(const MyApp());
}

final _router = GoRouter(routes: [
  GoRoute(path: "/", builder: (context, state) => const Homepage(title: 'Home'))
]);

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      routerConfig: _router,
    );
  }
}

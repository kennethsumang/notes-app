import 'dart:io';

import 'package:dio/dio.dart';
import 'package:xplatform/network/auth/models/auth.dart';

class AuthRepository {
  final dio = Dio();

  Future<AuthResponse> login(String email, String password) async {
    Response response = await dio.post('',
        data: {email: email, password: password},
        options:
            Options(headers: {Headers.contentTypeHeader: ContentType.json}));
    return AuthResponse(
        accessToken: response.data.accessToken, user: response.data.user);
  }
}

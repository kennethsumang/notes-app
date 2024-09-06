import 'package:xplatform/network/auth/models/user.dart';

class AuthResponse {
  String accessToken = '';
  User? user;

  AuthResponse({
    required this.accessToken,
    this.user,
  });

  AuthResponse.fromMap(Map<String, dynamic> json) {
    accessToken = json['accessToken'];
    user = json['user'];
  }
}

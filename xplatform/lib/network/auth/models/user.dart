class User {
  String id = '';
  String name = '';
  String email = '';
  String emailVerifiedAt = '';

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.emailVerifiedAt,
  });

  User.fromMap(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
    email = json['email'];
    emailVerifiedAt = json['email_verified_at']
        ? json['email_verified_at']
        : json['emailVerifiedAt'];
  }
}

class Note {
  String id = '';
  int userId = 0;
  String title = '';
  String content = '';
  String? parent;
  DateTime createdAt = DateTime.now();
  DateTime? updatedAt;

  Note(
      {required this.id,
      required this.userId,
      required this.title,
      required this.content,
      this.parent,
      required this.createdAt,
      this.updatedAt});

  Note.fromMap(Map<String, dynamic> json) {
    id = json['id'];
    userId = json['userId'];
    title = json['title'];
    content = json['content'];
    parent = json['parent'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
  }
}

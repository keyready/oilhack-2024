import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:file_picker/file_picker.dart';

class FileUploadController extends GetxController {
  var response = ''.obs;
  var uploadedFile = ''.obs;
  var isLoading = false.obs;

  Future<void> uploadFile() async {
    try {
      FilePickerResult? result = await FilePicker.platform.pickFiles();

      if (result != null) {
        PlatformFile file = result.files.first;
        uploadedFile.value = file.name;
        isLoading.value = true;

        var request = http.MultipartRequest(
            'POST', Uri.parse('http://localhost:5000/api/calculate'));
        request.files
            .add(await http.MultipartFile.fromPath('file', file.path!));
        var response = await request.send();

        if (response.statusCode == 200) {
          this.response.value = await response.stream.bytesToString();
        } else {
          Get.snackbar('Error', 'Failed to upload file',
              snackPosition: SnackPosition.TOP,
              borderColor: Colors.red,
              borderWidth: 2);
        }
      } else {
        Get.snackbar('Error', 'No file selected',
            snackPosition: SnackPosition.TOP,
            borderColor: Colors.red,
            borderWidth: 2);
      }
    } catch (e) {
      Get.snackbar('Error', e.toString(),
          snackPosition: SnackPosition.TOP,
          borderColor: Colors.red,
          borderWidth: 2);
      response.value = 'тут ошибочка а должна быть ссылочка';
    }
    isLoading.value = false;
  }
}

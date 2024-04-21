import 'dart:convert';
import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:file_picker/file_picker.dart';
import 'package:path_provider/path_provider.dart';

class FileUploadController extends GetxController {
  var response = ''.obs;
  var uploadedFile = ''.obs;
  var isLoading = false.obs;
  var fileId = ''.obs;

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
        var streamedResponse = await request.send();

        if (streamedResponse.statusCode == 200) {
          final responseBody = await http.Response.fromStream(streamedResponse);
          final responseData = responseBody;

          fileId.value = responseData.toString();

          this.response.value = responseData.toString();
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

  Future<void> downloadFile() async {
    try {
      isLoading.value = true;
      var response = await Dio().get(
        'http://localhost:5000/api/confirm?fileId=$fileId',
        options: Options(responseType: ResponseType.bytes),
      );

      if (response.statusCode == 200) {
        final directory = await getApplicationDocumentsDirectory();
        final filePath = '${directory.path}/downloaded_file.csv';
        final file = File(filePath);
        await file.writeAsBytes(response.data);
        print('File downloaded to $filePath');
      } else {
        Get.snackbar('Error', 'Failed to download file',
            snackPosition: SnackPosition.TOP,
            borderColor: Colors.red,
            borderWidth: 2);
      }
    } catch (e) {
      Get.snackbar('Error', e.toString(),
          snackPosition: SnackPosition.TOP,
          borderColor: Colors.red,
          borderWidth: 2);
    }
    isLoading.value = false;
  }
}

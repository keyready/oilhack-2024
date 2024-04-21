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
            'POST', Uri.parse('http://176.109.101.172:5000/api/calculate'));
        request.files
            .add(await http.MultipartFile.fromPath('file', file.path!));
        var streamedResponse = await request.send();

        if (streamedResponse.statusCode == 200) {
          final responseBody = await http.Response.fromStream(streamedResponse);
          final responseData = responseBody.body;
          print(responseData);
          print(responseData.toString());

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
        'http://176.109.101.172:5000/api/confirm?fileId=$fileId',
        options: Options(responseType: ResponseType.bytes),
      );

      if (response.statusCode == 200) {
        // Получаем путь к папке "Загрузки"
        final directory = await getDownloadsDirectory();
        if (directory == null) {
          // Обработка случая, когда папка "Загрузки" недоступна
          Get.snackbar('Error', 'Cannot access downloads directory',
              snackPosition: SnackPosition.TOP,
              borderColor: Colors.red,
              borderWidth: 2);
          return;
        }
        final filePath = "${directory.path}/downloaded_file$fileId.csv";
        final file = await File(filePath).create();

        // Проверяем, существует ли файл, и создаем его, если нет
        if (!await file.exists()) {
          await file.create();
        }

        // Записываем данные в файл
        await file.writeAsBytes(response.data);
        print('File downloaded to $filePath');
        Get.snackbar('Success', 'файл сохранен в загрузки',
            snackPosition: SnackPosition.TOP,
            borderColor: Colors.green,
            borderWidth: 2);
      } else {
        // Обработка ошибки скачивания файла
        Get.snackbar('Error', 'Failed to download file',
            snackPosition: SnackPosition.TOP,
            borderColor: Colors.red,
            borderWidth: 2);
        print(response.statusCode);
      }
    } catch (e) {
      // Обработка исключений
      Get.snackbar('Error', e.toString(),
          snackPosition: SnackPosition.TOP,
          borderColor: Colors.red,
          borderWidth: 2);
    } finally {
      isLoading.value = false;
    }
  }
}

import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:mobile/app/modules/home/controllers/home_controller.dart';
import 'package:url_launcher/url_launcher.dart';

import '../controllers/file_upload_controller.dart';

class HomeView extends GetView<HomeController> {
  HomeView({Key? key}) : super(key: key);

  final fileUpController = Get.put(FileUploadController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(
      //   title: const Text('HomeView'),
      //   centerTitle: true,
      // ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Stack(children: [
          Positioned.fill(
            child: SvgPicture.asset(
              'assets/images/bgImg.svg',
              fit: BoxFit
                  .cover, // Используйте BoxFit.cover для масштабирования изображения
            ),
          ),
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SvgPicture.asset(
                  'assets/images/mainLogo.svg',
                  width: 200,
                  height: 200,
                ),
                SizedBox(
                  height: 20,
                ),
                Container(
                  child: ElevatedButton(
                    onPressed: fileUpController.uploadFile,
                    child: Text(
                      'Загрузить файл',
                      style: TextStyle(color: Colors.black),
                    ),
                    style: OutlinedButton.styleFrom(
                      // Цвет текста
                      side: BorderSide(
                          color: Colors.blue,
                          width: 2), // Цвет и ширина контура
                      shape: RoundedRectangleBorder(
                          borderRadius:
                              BorderRadius.circular(10)), // Скругление углов
                      padding: EdgeInsets.symmetric(
                          horizontal: 20, vertical: 10), // Внутренний отступ
                    ),
                  ),
                ),
                Obx(() => fileUpController.uploadedFile.value.isNotEmpty
                    ? Column(
                        children: [
                          SizedBox(
                            height: 20,
                          ),
                          Center(
                            child: Container(
                              padding: EdgeInsets.all(10),
                              child: Text(
                                'Uploaded file: ${fileUpController.uploadedFile.value}',
                                style: TextStyle(fontSize: 18),
                              ),
                              decoration: BoxDecoration(
                                color: Colors.white,
                                border: Border.all(color: Colors.blue),
                                borderRadius: BorderRadius.circular(10),
                              ),
                            ),
                          ),
                          SizedBox(
                            height: 20,
                          ),
                          fileUpController.isLoading.value
                              ? Container(
                                  padding: EdgeInsets.all(2),
                                  child: LoadingAnimationWidget.dotsTriangle(
                                      color: Colors.blue, size: 40),
                                )
                              : fileUpController.response.value.isNotEmpty
                                  ? Center(
                                      child: InkWell(
                                        onTap: () {
                                          fileUpController.downloadFile();
                                        },
                                        child: Container(
                                          decoration: BoxDecoration(
                                            color: Colors.white,
                                            border:
                                                Border.all(color: Colors.blue),
                                            borderRadius:
                                                BorderRadius.circular(10),
                                          ),
                                          padding: EdgeInsets.all(4),
                                          child: Text(
                                            "Скачать файл: ${fileUpController.response.value}.csv",
                                            style: TextStyle(
                                                fontSize: 18,
                                                color: Colors.blue),
                                          ),
                                        ),
                                      ),
                                    )
                                  : Container()
                        ],
                      )
                    : Container()),
              ],
            ),
          ),
        ]),
      ),
    );
  }
}

import 'package:flutter/material.dart';

import 'package:get/get.dart';

import '../controllers/home_controller.dart';

class HomeView extends GetView<HomeController> {
  const HomeView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('HomeView'),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              decoration: InputDecoration(
                labelText: 'Введите формулу',
                border: OutlineInputBorder(),
              ),
              onChanged: (value) {},
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                Get.snackbar('Расчет', 'Результат расчета');
              },
              child: Text('Расчитать'),
            ),
          ],
        ),
      ),
    );
  }
}

import 'package:get/get.dart';
import 'package:oil_app/app/routes/app_pages.dart';

class SplashController extends GetxController {
  @override
  void onInit() {
    super.onInit();
  }

  @override
  void onReady() {
    super.onReady();
    goToHomePage();
  }

  @override
  void onClose() {
    super.onClose();
  }

  void goToHomePage() {
    Future.delayed(
      const Duration(seconds: 3),
      () => Get.offNamed(
        Routes.HOME,
      ),
    );
  }
}

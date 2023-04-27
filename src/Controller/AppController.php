<?php

namespace App\Controller;

use App\Service\ObjectManager\ObjectManager;
use App\Service\GlobalSettingsManager\GlobalSettingsManager;
use App\Service\Weather\WeatherManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    #[Route('/', name: 'app_index')]
    public function index(): Response
    {
        return $this->render('test.html.twig', [
            'test' => 'test'
        ]);
    }

    #[Route('/app', name: 'app_show_all', priority: 10)]
    public function showAll(): Response
    {
        return $this->render('app/index.html.twig', [
            'reactApp' => true
        ]);
    }

    #[Route('/test', name: 'app_test', priority: 10)]
    public function test(ObjectManager $objectManager): Response
    {
        $test = $objectManager->getAllObjectsData(false);
        dd($test);
    }

    #[Route('/api/objects', name: 'app_api_objects', priority: 5)]
    public function apiObjects(ObjectManager $objectManager, GlobalSettingsManager $globalSettingsManager, Request $request): Response
    {
        $data = array();
        if ($request->isMethod('get')) {
            $data['facility'] = $objectManager->getAllObjectsData(true);
            $data['time'] = $globalSettingsManager->getTime();
            $data['global'] = $globalSettingsManager->getGlobalSettings();
        }
        else {
            $data = false;
        }

        return new JsonResponse($data);
    }

    #[Route('/api/objects/{object_number<\d+>}', name: 'app_api_object_number', priority: 5)]
    public function apiObjectNumber(ObjectManager $objectManager, Request $request, $object_number): Response
    {
        if ($request->isMethod('put')) {
            $external_request = json_decode($request->getContent(), true);
            $data = $objectManager->updateByArray($external_request, $object_number);
        } else {
            $data = false;
        }

        return new JsonResponse($data);
    }

    #[Route('/api/weather', name: 'app_api_weather', priority: 5)]
    public function apiWeather(WeatherManager $weatherManager): Response
    {
        $data = $weatherManager->getWeatherData();
        return new JsonResponse($data);
    }

    #[Route('/api/objects/global', name: 'app_api_global', priority: 10)]
    public function apiGlobal(Request $request, GlobalSettingsManager $globalSettingsManager): Response
    {
        if ($request->isMethod('put')) {
            $external_request = json_decode($request->getContent(), true);
            $data = $globalSettingsManager->updateByArray($external_request);
        } else {
            $data = false;
        }

        return new JsonResponse($data);
    }
}
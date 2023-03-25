<?php

namespace App\Controller;

use App\Entity\Objects;
use App\Service\ObjectManager\ObjectManager;
use App\Service\Weather\WeatherManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    #[Route('/', name: 'app_index')]
    public function index(WeatherManager $weatherManager): Response
    {
        $weather = $weatherManager->getWeatherData();
        return $this->render('test.html.twig', [
            'show_all' => false
        ]);
    }

    #[Route('/app/{objects<\d+>}', name: 'app_show_one', priority: 1)]
    public function showOne(Objects $objects): Response
    {
        return $this->render('app/index.html.twig', [
            'show_all' => false,
            'data' => $objects
        ]);
    }

    #[Route('/app', name: 'app_show_all', priority: 10)]
    public function showAll(ObjectManager $objectManager): Response
    {
        $facility = $objectManager->prepareAllObjectsDataForCarousel();
//        dd($facility);
        return $this->render('app/index.html.twig', [
            'show_all' => true,
            'custom_carousel' => true,
            'facility' => $facility['facility'],
            'carousel' => $facility['carousel'],
            'object' => $facility['facility'][3]
        ]);
    }

    #[Route('/api/objects', name: 'app_api_objects', priority: 10)]
    public function apiObjects(ObjectManager $objectManager): Response
    {
        $data = $objectManager->getAllObjectsData(true);
//        dd($data);
        return new JsonResponse($data);
    }

    #[Route('/api/weather', name: 'app_api_weather', priority: 10)]
    public function apiWeather(WeatherManager $weatherManager): Response
    {
        $data = $weatherManager->getWeatherData();
        return new JsonResponse($data);
    }
}
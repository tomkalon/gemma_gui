<?php

namespace App\Controller;

use App\Entity\Objects;
use App\Repository\WeatherRepository;
use App\Service\ObjectManager\ObjectManager;
use App\Service\Weather\WeatherManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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
            'facility' => $facility['facility'],
            'carousel' => $facility['carousel'],

        ]);
    }

    #[Route('/app/api', name: 'app_api', priority: 10)]
    public function appApi(Request $request): Response
    {
        if ($request->isXMLHttpRequest()) {
            return new JsonResponse(array());
        } else {
            return new Response('This is not ajax!', 400);
        }

    }

    #[Route('/app/api/weather', name: 'app_api_weather', priority: 10)]
    public function appApiWeather(Request $request, WeatherManager $weatherManager): Response
    {
        $data = $weatherManager->getWeatherData();

//        dd($data);
        return new JsonResponse($data);
    }
}
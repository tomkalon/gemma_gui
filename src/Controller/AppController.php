<?php

namespace App\Controller;

use App\Entity\Objects;
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
    public function index(): Response
    {
        return $this->render('test.html.twig', [
        ]);
    }

    #[Route('/app/{objects<\d+>}', name: 'app_show_one', priority: 1)]
    public function showOne(Objects $objects): Response
    {
        return $this->render('app/index.html.twig', [
            'reactApp' => false,
            'data' => $objects
        ]);
    }

    #[Route('/app', name: 'app_show_all', priority: 10)]
    public function showAll(ObjectManager $objectManager): Response
    {
        return $this->render('app/index.html.twig', [
            'reactApp' => true
        ]);
    }

    #[Route('/api/objects', name: 'app_api_objects', priority: 10)]
    public function apiObjects(ObjectManager $objectManager, Request $request): Response
    {
        if ($request->isMethod('post')) {
            $js_request = json_decode($request->getContent(), true);
            $data['facility'] = $objectManager->getAllObjectsData(true);
            $data['time'] = $objectManager->getTime();
            $data['global'] = $objectManager->getGlobalSettings();
        }
        return new JsonResponse($data);
    }

    #[Route('/api/weather', name: 'app_api_weather', priority: 10)]
    public function apiWeather(WeatherManager $weatherManager): Response
    {
        $data = $weatherManager->getWeatherData();
//        dd($data);
        return new JsonResponse($data);
    }
}
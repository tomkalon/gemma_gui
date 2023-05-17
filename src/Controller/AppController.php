<?php

namespace App\Controller;

use App\Service\AlertsManager\AlertsManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
            'selectedObject' => false
        ]);
    }

    #[Route('/app/{object_number<\d+>}', name: 'app_show_selected', priority: 5)]
    public function showSelectedObject($object_number): Response
    {
        return $this->render('app/index.html.twig', [
            'selectedObject' => $object_number
        ]);
    }

    #[Route('/app/{object_number<\d+>}/setup', name: 'app_show_selected_setup', priority: 5)]
    public function showSelectedObjectSetup(AlertsManager $alertsManager, int $object_number): Response
    {
        $limit = 15;
        $alerts = $alertsManager->getAlerts($object_number, 0, 0, $limit);
        return $this->render('app/setup.html.twig', [
            'selectedObject' => $object_number,
            'alerts' => $alerts['alerts'],
            'numberOfAlerts' => $alerts['numberOfAlerts'],
            'numberOfPages' => $alerts['numberOfPages']
        ]);
    }
}
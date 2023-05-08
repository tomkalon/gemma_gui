<?php

namespace App\Controller;

use App\Service\ObjectManager\ObjectManager;
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
            'reactApp' => true,
            'selectedObject' => false
        ]);
    }

    #[Route('/app/{object_number<\d+>}', name: 'app_show_selected', priority: 5)]
    public function showSelectedObject($object_number): Response
    {
        return $this->render('app/index.html.twig', [
            'reactApp' => true,
            'selectedObject' => $object_number
        ]);
    }

    #[Route('/test', name: 'app_test', priority: 10)]
    public function test(ObjectManager $objectManager): Response
    {
        $test = $objectManager->getAllObjectsData(false);
        dd($test);
    }
}
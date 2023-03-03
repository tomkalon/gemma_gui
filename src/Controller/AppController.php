<?php

namespace App\Controller;

use App\Entity\Objects;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    #[Route('/', name: 'app_index')]
    public function index(): Response
    {
        return $this->render('app/index.html.twig', [
            'controller_name' => 'AppController',
        ]);
    }

    #[Route('/object/{object<\d+>}', name: 'app_object_show')]
    public function showObject(Objects $object): Response
    {
        return $this->render('app/object/show.html.twig', [
            'controller_name' => 'Tomy',
        ]);
    }
}
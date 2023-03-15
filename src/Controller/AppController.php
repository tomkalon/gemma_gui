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
        ]);
    }

    #[Route('/app', name: 'app_show_all')]
    public function showAll(): Response
    {
        return $this->render('app/index.html.twig', [

        ]);
    }

    #[Route('/app/{object<\d+>}', name: 'app_show_one')]
    public function showOne(Objects $object): Response
    {
        return $this->render('app/index.html.twig', [
        ]);
    }
}
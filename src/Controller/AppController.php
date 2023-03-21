<?php

namespace App\Controller;

use App\Entity\Objects;
use App\Service\ObjectManager\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{

    public object $object_manager;

    public function __construct(ObjectManager $object_manager)
    {
        $this->object_manager = $object_manager;
    }

    #[Route('/', name: 'app_index')]
    public function index(): Response
    {
        return $this->render('app/index.html.twig', [
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
    public function showAll(): Response
    {
        $objects = $this->object_manager->prepareAllObjectsToDisplay();
        return $this->render('app/index.html.twig', [
            'show_all' => true,
            'facility' => $objects['facility'],
            'carousel' => $objects['carousel'],

        ]);
    }

    #[Route('/var', name: 'app_show_vars', priority: 10)]
    public function showVarDump(): Response
    {
        $objects = $this->object_manager->prepareAllObjectsToDisplay();
        dd($objects);
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
}